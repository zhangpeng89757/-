<template>
    <div class="table-box" :style="{height: `${height}px`}"       
        v-loading="viewObject.loading"
        element-loading-text="加载中" >
        <el-table 
            :show-header="props.showHeader"
            :data="viewObject.data"
            class="scroll-table top"
            stripe>
            <el-table-column :width="tablePaddingLeft"/>
            <el-table-column v-for="(item, index) in columns"
                :key="index + 'i'"
                :label="item.title"
                :prop="item.field"
                :width="item.width"
                :min-width="item.minWidth"
                :align="item.align"/>
                <template #empty></template>
        </el-table>
        <Vue3SeamlessScroll
            ref="refScroll" class="seamless-warp scroll"
            :list="viewObject.data" :limitScrollNum="limitScrollNum" :hover="true" :step="0.3" :style="{height: `${height}px`}"
        >
            <el-table 
                class="scroll-table"
                :data="viewObject.data"
                :show-header="false"
                @row-click="rowClick"
                stripe >
                <el-table-column :width="tablePaddingLeft"/>
                <el-table-column v-for="(item, index) in columns"
                    :key="index + 'body'"
                    :label="item.title"
                    :prop="item.field"
                    :width="item.width"
                    :min-width="item.minWidth"
                    :align="item.align"
                    show-overflow-tooltip/>
                    <template #empty>
                        <div v-show="!viewObject.loading" style="display: flex; justify-content: center; align-items: center; min-height: 150px;"><el-image style="height: 30px; margin-right: 10px;" :src="global.GetImages('nodata.png')" fit="contain"/>暂无数据</div>
                    </template>
            </el-table>
        </Vue3SeamlessScroll>
    </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, inject, reactive, watch, computed } from 'vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const global = inject('global');
const { proxy } = getCurrentInstance();
/**定义父组件传参开始 */
const props = defineProps({
    data: { //API参数对象
        type: Array,
        default: () =>  []
    },
    columns: { //表头
        type: Array,
        default: () =>  []
    },
    height: { //高度
        type: Number,
        default: () =>  300
    },
    showHeader: { //高度
        type: Boolean,
        default: () =>  true
    },
    tablePaddingLeft: { // 表格内容左边空白宽度
        type: Number,
        default: () =>  20
    },
    switchTitle: {
        type: String,
        default: () =>  ''
    },
})
// 用在运用服务-知识产权确权预警 切换标题时重置loading loadNumber viewObject.data
watch(
  () => props.switchTitle,
  (newV, prevCount) => {
    viewObject.loading = true;
    loadNumber = 0
    viewObject.data = []
  }
)
const viewObject = reactive({
    data: [],
    showScroll: false,
    loading: true
})
let loadNumber = 0;
const rowClick = (row, column, event) => {
    proxy.$emit("rowClick",row, column, event)
}


// 根据高度计算 超过limitScrollNum条数据时就开启滚动
const refScroll = ref(null)
let limitScrollNum = 4

const initData = () =>{
    viewObject.showScroll = false;
    if(loadNumber == 0 && viewObject.data?.length > 0) {
        viewObject.loading = false;
    } else if (loadNumber == 1) {
        viewObject.loading = false;
    }
    loadNumber++;
    viewObject.data = props.data;
    setTimeout(() => {
        viewObject.showScroll = true;
    }, 500);

    
    const h = refScroll.value?.$el?.offsetHeight
    const itemH = document.querySelector('.seamless-warp .el-table__row')?.offsetHeight
    if(itemH && h){
        const equ = h%itemH === 0 // 除尽 无余数
        const num = Math.ceil(h/itemH)
        limitScrollNum = equ ? num + 1 : num
    }
}
watch(()=>props, ()=>{
    setTimeout(() => {
        initData();
    }, 500);
},{
    deep:true,
    immediate: true
})


onMounted(()=>{
    proxy.$nextTick(() => {
    }).then(()=>{
        initData();
    })
})
</script>
<style>
.table-box { display: flex; flex-direction: column; overflow: hidden; background-color: #050457; height: 100%;}
.scroll { overflow: hidden; flex: 1; }
.scroll-table {
    --el-table-border-color: 0;
    --el-table-border: 0;
}
.scroll-table.el-table tr{ background: unset; color: #FFFFFF;}
.scroll-table.el-table thead { color: #FFFFFF; }
.scroll-table.el-table.el-table th.el-table__cell { background-color: rgba(13, 48, 99, 0.5); }
.scroll-table.el-table--striped .el-table__body tr.el-table__row--striped { background-image: linear-gradient(to right, rgba(36, 152, 214, 1), rgba(36, 152, 214, 0.0001)); }
.scroll-table.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {  background-color: unset;  }
.scroll-table.el-table th.el-table__cell.is-leaf { border-bottom: 0; }
.scroll-table.el-table td.el-table__cell, .scroll-table.el-table th.el-table__cell.is-leaf { border-bottom: 0; }
.scroll-table.el-table .el-table__cell { padding: 0.1rem 0; font-size: var(--small-font-size); }

.table-box .seamless-warp {
    flex: 1;
    overflow: hidden;
}
.table-box .seamless-warp>div {
    min-height: 100px;
}
.table-box .top .el-table__body-wrapper {
    display: none;
}
.table-box .bottom .el-table__header-wrapper {
    display: none;
    width: 100%;
}
</style>