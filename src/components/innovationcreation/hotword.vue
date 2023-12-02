<template>
    <div class="hotterms-box">
        <div class="hotterms-content-view">
            <div class="hotterms-content-tool background-image-box" :style="{backgroundImage:'url('+ getImage('echart-t-bg.png') +')'}">
                <div class="hotterms-content-tool-title title-font">{{ title }}</div>
            </div>
            <section class="cloud-bed">
                <div class="cloud-box">
                    <div v-for="(item, index) in dataList" :key="index" @click="getDataInfo(item)" @mouseleave="tagMouseleave($event)" :style="getStyle(item)">
                        {{ item.name }}&ensp;{{ item.value }}
                    </div>
                </div>
            </section>
        </div>
        <div class="hotterms-info-box" v-show="showInfo">
            <div ref="hotClose" id="hotColseBtn" v-show="showInfo" style="text-align: right;margin-right: 4px;position: absolute; right: 12px; top: 102px;z-index: 99999999;cursor: pointer;"><el-icon @click="showInfo=false" style="cursor: pointer;" :size="20"><Close /></el-icon></div>
            <Info style="flex: 1;padding: 0 20px 20px; box-sizing: border-box;" :leftCom="leftCom"></Info>
        </div>
    </div>
</template>

<script>
    import { GetPublicSource } from './../../SystemCom/GetImages'
    import Info from '@/components/innovationcreation/center-top-info.vue'
    import * as HTTPAPI from '../../api/innovationcreation/api'
    export default {
        components: { Info },
        props: {
            title: {
                type: String,
                default: "",
            },
            wordArr: {
                type: Array,
                default: [],
            },
        },  
        name: "word-cloud",
        data() {
            return {
                timer: 50, // 转动速率
                radius: 500, // 词云面积大小
                dtr: Math.PI/180, //鼠标滑过球体转动速度
                active: false, // 默认加载是否开启转动
                lasta: 0, // 上下转动
                lastb: 0.5, // 左右转动
                distr: true,
                tspeed: 0, // 鼠标移动上去时球体转动
                mouseX: 0,
                mouseY: 0,
                tagAttrList: [],
                tagContent: null,
                cloudContent: null,
                sinA: '',
                cosA: '',
                sinB: '',
                cosB: '',
                sinC: '',
                cosC: '',
                dataList: [],
                interval: null,
                showInfo: false,
                leftCom: { comname: 'Scrolltable', data: [], title:``, columns: [
                    { field: 'stitle', title: '专利名称' },
                    { field: 'sproposer', title: '权利人'}
                ]},
                showInfoCount: 0,
            }
        },
        mounted () {
            const body = document.querySelector(".wrapper");
            if (body.append) {
                body.append(this.$refs["hotClose"]);
            } else {
                body.appendChild(this.$refs["hotClose"]);
            }
            this.dataList = this.wordArr;
            this.$nextTick(() => {
               
            }).then(()=>{
                let _this = this;
                setTimeout(() => {
                    let cloudWidth = document.querySelector('.cloud-box')?.offsetWidth || 500;
                    _this.radius = cloudWidth / 2
                    _this.initWordCloud()
                }, 500);
            })
        },
        unmounted(){
            document.getElementById("hotColseBtn").remove();
            clearInterval(this.timer)
        }, 
        methods:{
            getStyle(item){
                let index = 2;
                let fontSize = 'var(--small-font-size)';
                if(item.value > 20) {
                    index = 0;
                    fontSize =  'var(--font18-size)';
                } else if (item.value > 10) {
                    fontSize = 'var(--medium-font-size)';
                    index = 1;
                }
                return { color: "#fff", fontSize: `${fontSize}`, backgroundImage: 'url('+ this.getImage(`cyk${index}.png`) +')', zIndex: 1 }
            },  
            getImage(url) {
                return GetPublicSource(url)
            },  
            // 获取点击文本信息
            getDataInfo (item) {
                this.showInfo = true;
                this.leftCom.data = [];
                this.leftCom.title = "";
                HTTPAPI.keywordsPtList(item.name).then(res => {
                    this.leftCom.data = res.data.list;
                    this.leftCom.title = `${item.name}(${res.data.total})`;
                })
            },
            tagMouseleave(item){
            },
            initWordCloud () {
                this.cloudContent = document?.querySelector?.('.cloud-box');
                if(this?.cloudContent) {
                    this.tagContent = this.cloudContent?.getElementsByTagName?.('div') || [];
                    for (let i = 0; i < this.tagContent.length; i++) {
                        let tagObj = {};
                        tagObj.offsetWidth = this.tagContent[i].offsetWidth;
                        tagObj.offsetHeight = this.tagContent[i].offsetHeight;
                        this.tagAttrList.push(tagObj);
                    }
                    
                    this.sineCosine(0, 0, 0);
                    this.positionAll();
                    this.cloudContent.onmouseover = (e) => {
                        clearInterval(this.interval)
                    };
                    this.cloudContent.onmouseout = () => {
                        this.interval = setInterval(this.update, this.timer);
                    };
                    this.cloudContent.onmousemove = (ev) => {
                        let oEvent = window.event || ev;
                        this.mouseX = oEvent.clientX - (this.cloudContent.offsetLeft + this.cloudContent.offsetWidth/2);
                        this.mouseY = oEvent.clientY - (this.cloudContent.offsetTop + this.cloudContent.offsetHeight/2);
                        this.mouseX/= 5;
                        this.mouseY/= 5;
                    };
                    this.interval = setInterval(this.update, this.timer);
                }
                
            },
            positionAll () {
                let phi = 0;
                let theta = 0;
                let max = this.tagAttrList.length;
                let aTmp = [];
                let oFragment = document.createDocumentFragment();
                this.cloudContent = document.querySelector('.cloud-box');
                //随机排序
                for (let i=0; i < this.tagContent.length; i++) {
                    aTmp.push(this.tagContent[i]);
                }
                aTmp.sort(() => {
                    return Math.random() < 0.5 ? 1 : -1;
                });
                for (let i = 0; i < aTmp.length; i++) {
                    oFragment?.appendChild?.(aTmp[i]);
                }
                this.cloudContent?.appendChild?.(oFragment);
                for(let i = 1; i < max + 1; i++){
                    if (this.distr) {
                        phi = Math.acos(-1 + (2 * i - 1) / max);
                        theta = Math.sqrt(max * Math.PI) * phi;
                    } else {
                        phi = Math.random() * (Math.PI);
                        theta = Math.random() * (2 * Math.PI);
                    }
                    //坐标变换
                    this.tagAttrList[i-1].cx = this.radius * Math.cos(theta) * Math.sin(phi);
                    this.tagAttrList[i-1].cy = this.radius * Math.sin(theta) * Math.sin(phi);
                    this.tagAttrList[i-1].cz = this.radius * Math.cos(phi);
                    this.tagContent[i-1].style.left = this.tagAttrList[i-1].cx + this.cloudContent.offsetWidth / 2 - this.tagAttrList[i-1].offsetWidth + 'px';
                    let top = Math.floor(Math.random() * (this.cloudContent.offsetHeight - 30));
                    this.tagContent[i-1].style.top = top + 'px';
                }
            },
            update () {
                let angleBasicA;
                let angleBasicB;
                if (this.active) {
                    angleBasicA = (-Math.min(Math.max(-this.mouseY, -200 ), 200) / this.radius) * this.tspeed;
                    angleBasicB = (Math.min(Math.max(-this.mouseX, -200 ), 200) / this.radius) * this.tspeed;
                } else {
                    angleBasicA = this.lasta * 0.98;
                    angleBasicB = this.lastb * 0.98;
                }
                this.sineCosine(angleBasicA, angleBasicB, 0);
                for(let j = 0; j < this.tagAttrList.length; j++) {
                    let rx1 = this.tagAttrList[j].cx;
                    let ry1 = this.tagAttrList[j].cy * this.cosA + this.tagAttrList[j].cz * (-this.sinA);
                    let rz1 = this.tagAttrList[j].cy * this.sinA + this.tagAttrList[j].cz * this.cosA;

                    let rx2 = rx1 * this.cosB + rz1 * this.sinB;
                    let ry2 = ry1;
                    let rz2 = rx1 * (-this.sinB) + rz1 * this.cosB;

                    let rx3 = rx2 * this.cosC + ry2 * (-this.sinC);
                    let ry3 = rx2 * this.sinC + ry2 * this.cosC;
                    let rz3 = rz2;
                    this.tagAttrList[j].cx = rx3;
                    this.tagAttrList[j].cy = ry3;
                    this.tagAttrList[j].cz = rz3;

                    let per = 350 / (350 + rz3);

                    this.tagAttrList[j].x = rx3 * per - 2;
                    this.tagAttrList[j].y = ry3 * per;
                    this.tagAttrList[j].scale = per;
                    this.tagAttrList[j].alpha = per;

                    //this.tagAttrList[j].alpha = (this.tagAttrList[j].alpha - 0.6) * (10/6);
                }
                this.doPosition();
                //this.depthSort();
            },
            doPosition() {
                let len = this.cloudContent.offsetWidth/2;
                let height = this.cloudContent.offsetHeight/2;
                for (let i=0;i < this.tagAttrList.length;i++) {
                    this.tagContent[i].style.left = this.tagAttrList[i].cx + len - this.tagAttrList[i].offsetWidth/2 + 'px';
                    //this.tagContent[i].style.opacity = this.tagAttrList[i].alpha;
                    if(this.tagAttrList[i].alpha > 1.5) {
                        this.tagContent[i].classList.remove("hide")
                        this.tagContent[i].classList.add("show");
                        this.tagContent[i].style.zIndex = 3;
                    } else {
                        this.tagContent[i].classList.remove("show")
                        this.tagContent[i].classList.add("hide")
                        this.tagContent[i].style.zIndex = 1;
                    }
                }
            },
            depthSort(){
                let aTmp = [];
                for (let i = 0; i < this.tagContent.length; i++) {
                    aTmp.push(this.tagContent[i]);
                }
                aTmp.sort((item1, item2) => item2.cz - item1.cz);
                for (let i = 0; i < aTmp.length; i++) {
                    aTmp[i].style.zIndex=i;
                }
            },
            sineCosine (a, b, c) {
                this.sinA = Math.sin(a * this.dtr);
                this.cosA = Math.cos(a * this.dtr);
                this.sinB = Math.sin(b * this.dtr);
                this.cosB = Math.cos(b * this.dtr);
                this.sinC = Math.sin(c * this.dtr);
                this.cosC = Math.cos(c * this.dtr);
            }
        }
    };
</script>


<style scoped>
.hotterms-box { display: block; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0)); padding: 10px; padding-top: 4px; position: relative;}
.hotterms-info-box {  position: absolute; display: flex; flex-direction: column; top: 0px; left: 0; width: 100%; height: 100%; z-index: 100;  background: rgba(5, 5, 76, 0.94); }
.hotterms-content-view {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}
.hotterms-content-tool { display: flex; color: #FFFFFF; }
.hotterms-content-tool.background-image-box { background-size: 100% auto; background-position: bottom; padding-left: var(--default-font-size); }
.hotterms-content-tool .hotterms-content-tool-title {  font-size: 18px;  line-height: 2; flex: 1; }
.cloud-bed { flex: 1; box-sizing: border-box; display: flex;}
.cloud-box{
    position:relative;
    background:	#00000000;
    overflow: hidden;
    flex: 1;
}
.cloud-box div{
    position: absolute;
    padding: 3px 6px;
    top: 0px;
    text-decoration:none;
    left:0px;
    background-clip: text;
    color: transparent;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    word-break: keep-all;
    white-space: nowrap;
    cursor: pointer;
}
.cloud-box div:hover { z-index: 99 !important; }
.cloud-box div.hide {
    animation: hideAnimate 2s linear 1 forwards;
}
.cloud-box div.show {
    animation: showAnimate 2s linear 1 forwards;
}

@keyframes hideAnimate {
    0% {
        opacity: 1
    }
    50%,
    100% {
        opacity: 0.05
    }
}
@keyframes showAnimate {
    0% {
        opacity: 0.05
    }
    50%,
    100% {
        opacity: 1
    }
}
</style>
