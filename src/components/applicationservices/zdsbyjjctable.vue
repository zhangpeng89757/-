<template>
    <div class="zdsbyjjc-box">
        <div class="zdsbyjjc-box-title background-image-box" :style="{backgroundImage:'url('+ GetPublicSource('echart-t-bg.png') +')'}">
            <div class="zdsbyjjc-box-box-title-box">重点商标预警监测</div><div style="font-size: var(--medium-font-size);">{{'截至商标公告：' + viewObject.pdvl + '期'}}</div>
        </div>
        <el-carousel style="flex:1;overflow: hidden; margin-top: 1%;" :interval="5000" arrow="always" indicator-position="none" height="100%">
            <el-carousel-item v-for="items in viewObject.carouselData" :key="items">
                <div class="zdsbyjjc-item-box">
                    <div class="zdsbyjjc-item" v-for="item in items" :key="item">
                        <div class="zdsbyjjc-item-top">
                            <div class="zdsbyjjc-box-img-box">
                                <!-- <el-image :src="item.imgUrl" fit="contain" /> -->
                                <el-image :src="global.getAssetsFile(item.imgPath)" fit="contain" />
                            </div>
                            <div class="zdsbyjjc-box-title-box">{{ '权利人：'+ item.ap }}</div>
                        </div>
                        <div class="zdsbyjjc-item-bottom" style="margin-top: 4px;">
                            <el-table :data="item.data" class="hbbt-table" width="255">
                                <el-table-column label="名称相同" align="center">
                                    <el-table-column  width="64" prop="tmsbzs" label="初审" align="center"/>
                                    <el-table-column  width="64" prop="tmsbyx" label="注册" align="center"/>
                                </el-table-column>
                                <el-table-column label="名称近似" align="center">
                                    <el-table-column  width="64" prop="gjssbzs" label="初审" align="center"/>
                                    <el-table-column  width="64" prop="gjssbyx" label="注册" align="center"/>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue'
import { GetPublicSource } from './../../SystemCom/GetImages'
import { getPdvlData, getTmMonitorData } from '@/api/applicationServices'
const global = inject('global');
const viewObject = reactive({
    pdvl: 1841,
    tableData: [],
    carouselData: [],
})
const TestData = () => {
    // 获取监测更新期号
    getPdvlData().then(res => {
        let resData = res.data;
        viewObject.pdvl = resData;
    });
    viewObject.carouselData = getTmMonitorData();
}
onMounted(()=>{
    TestData();
})
</script>
<style>
.zdsbyjjc-box {
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(to bottom, rgba(21, 20, 92, 1), rgba(21, 20, 92, 0));
    padding:0 0.5vw;
}
.zdsbyjjc-box-title { display: flex; align-items: center; }
.zdsbyjjc-box-title.background-image-box { background-size: 100% auto; background-position: bottom; padding-left: 4px; }
.zdsbyjjc-box-title .zdsbyjjc-box-box-title-box {  flex: 1; font-size: var(--defalut-font-size);  line-height: 2; padding-left: 14px;}
.zdsbyjjc-box-content { display: flex; margin-top: 1%; overflow: hidden; flex: 1; }

.zdsbyjjc-item-box {display: grid; grid-template-columns: repeat(2,1fr); height: 100%; overflow: hidden; gap: 0 20px; }
.zdsbyjjc-item { display: flex; flex-direction: column; overflow: hidden;}
.zdsbyjjc-item-top,.zdsbyjjc-item-bottom { flex: 1; overflow: hidden; display: flex; flex-direction: column; width: 100%;} 
.zdsbyjjc-item-top { display: flex; flex-direction: column; overflow: hidden; align-items: center; background-color: rgba(28, 111, 172, 1);}
.zdsbyjjc-box-img-box { flex: 1; overflow: hidden; padding: 10px 0; }
.zdsbyjjc-box-img-box .el-image { width: 100%; height: 100%; }
.zdsbyjjc-box-title-box { color: #FFFFFF; font-size: var(--small-font-size); line-height: 2; }


.hbbt-table {
    --el-table-border-color: 0;
    --el-table-border: 0;
    flex: 1;
    overflow: hidden;
    width: 100%;
}
.hbbt-table.el-table { 
    background-image: linear-gradient(to bottom, rgba(21, 20, 92, 0.5), rgba(21, 20, 92, 0));
    flex: 1;
    overflow: hidden;
}
.hbbt-table.el-table .is-group .cell { font-weight: 500; }
.hbbt-table.el-table .is-group tr:nth-child(1) th:nth-child(1){ border-right: 1px solid rgba(28, 111, 172, 1);}
.hbbt-table.el-table .is-group tr:nth-child(2) th:nth-child(2){ border-right: 1px solid rgba(28, 111, 172, 1);}
.hbbt-table.el-table .el-table__body .el-table__row td:nth-child(2) { border-right: 1px solid rgba(28, 111, 172, 1);}
.hbbt-table.el-table tr{ background: unset; }
.hbbt-table.el-table tbody tr { background-image: linear-gradient(to right, rgba(36, 152, 214, 1), rgba(36, 152, 214, 0.0001)); }
.hbbt-table.el-table thead { color: #FFFFFF; }
.hbbt-table.el-table.el-table th.el-table__cell { background-color: rgba(13, 48, 99, 0.5); }
.hbbt-table.el-table--striped .el-table__body tr.el-table__row { background-image: linear-gradient(to right, rgba(36, 152, 214, 1), rgba(36, 152, 214, 0.0001)); }
.hbbt-table.el-table--striped .el-table__body tr.el-table__row td.el-table__cell {  background-color: unset;  }
.hbbt-table.el-table th.el-table__cell.is-leaf { border-bottom: 0; }
.hbbt-table.el-table td.el-table__cell, .hbbt-table.el-table th.el-table__cell.is-leaf { border-bottom: 0; }
.hbbt-table.el-table .el-table__cell { padding: 2px 0; font-size: var(--small-font-size) }
.hbbt-table.el-table th.el-table__cell.is-leaf .cell { font-size: var(--small-font-size) }
.zdsbyjjc-item-box .cell { height: 26px; line-height: 26px !important; }
</style>