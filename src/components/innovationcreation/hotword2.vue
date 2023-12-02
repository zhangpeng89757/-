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
  </div>
</template>

<script>
  import { GetPublicSource } from './../../SystemCom/GetImages'
  export default {
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
              displayIndex: 0,
              maxWdith: 0
          }
      },
      mounted () {
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
      beforeDestroy () {
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
          },
          tagMouseleave(item){
          },
          initWordCloud () {
              this.cloudContent = document?.querySelector?.('.cloud-box');
              if(this?.cloudContent) {
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
            this.cloudContent = document.querySelector('.cloud-box');
            this.tagContent = this.cloudContent?.getElementsByTagName?.('div') || [];
            let oFragment = document.createDocumentFragment();
            let aTmp = [];
            this.cloudContent?.appendChild?.(oFragment);
            let maxH = this.cloudContent.offsetHeight;
            let indexLevel = 0;
            let nextY = 10;
            let margin = 15;
            let nextX = 0;
            let maxWdith = 0;
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
            for(let i = 0; i < aTmp.length; i++){
              let level = document.createAttribute("level");
              nextX = nextX + parseInt(Math.random() * 10);
              nextY = nextY + parseInt(Math.random() * 5);
              level.nodeValue = indexLevel;
              let element = this.tagContent[i];
              element.attributes.setNamedItem(level)
              element.style.left = `${nextX}px`;
              element.style.top = `${nextY}px`;
              nextY += element.offsetHeight + margin;
              if(element.offsetWidth > maxWdith) {
                maxWdith = element.offsetWidth;
              }
              if(nextY + 20 > maxH - 10) {
                nextY = 10;
                this.maxWdith = nextX + 10;
                nextX = nextX + maxWdith;
                maxWdith = 0;
              }
            }
           
          },
          update () {
              this.doPosition();
          },
          doPosition() {
              let len = this.cloudContent.offsetWidth/2;
              let maxX =  this.cloudContent.offsetWidth;
              let moveX = 10;
              for (let i=0;i < this.tagContent.length;i++) {
                let element = this.tagContent[i];
                let level = element.getAttribute("level");
                let oldLeft = parseInt(element.style.left);
                if(level == 0) {
                  element.classList.remove("hide");
                  element.classList.add("show");
                  element.style.left = `${oldLeft - moveX}px`;
                  if(oldLeft < -element.offsetWidth) {
                    element.setAttribute("level", 1);
                  }
                } else {
                  element.style.left = `${oldLeft + moveX}px`;
                  element.classList.remove("show");
                  element.classList.add("hide");
                  if(oldLeft > this.maxWdith - maxX - element.offsetWidth) {
                    element.setAttribute("level", 0);
                  }
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
          },
          positionOne(isPositionArray, dom){
            
          },
          elementsOverlap(el1, el2) {
            const domRect1 = el1.getBoundingClientRect();
            const domRect2 = el2.getBoundingClientRect();

            return !(
              domRect1.top > domRect2.bottom ||
              domRect1.right < domRect2.left ||
              domRect1.bottom < domRect2.top ||
              domRect1.left > domRect2.right
            );
          }
      }
  };
</script>


<style scoped>
.hotterms-box { display: block; background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0)); padding: 10px; padding-top: 4px; }
.hotterms-content-view {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}
.hotterms-content-tool { display: flex; color: #FFFFFF; }
.hotterms-content-tool.background-image-box { background-size: 100% auto; background-position: bottom; padding-left: var(--default-font-size); }
.hotterms-content-tool .hotterms-content-tool-title {  font-size: var(--default-font-size);  line-height: 2; flex: 1; }
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
.cloud-box div:hover { z-index: 999999 !important; }
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
