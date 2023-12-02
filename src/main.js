import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import XEUtils from 'xe-utils'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import { GetPublicSource, getAssetsFile, getAssets } from './SystemCom/GetImages';
import FlowBox from '@/components/flow-box.vue'
import vue3Barrage from './packages/components/vue3-barrage';

const app = createApp(App)
// 配置全局变量 页面中使用 inject 接收
app.provide('global', {
    GetImages: GetPublicSource,
    getAssetsFile,
    getAssets
})
//注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(ElementPlus, { locale: zhCn }).use(VXETable).component("FlowBox", FlowBox).use(vue3Barrage)
VXETable.use(VXETablePluginElement);
app.mount('#app')
