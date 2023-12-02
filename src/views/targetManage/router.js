let demoModule = [
    {
        path: '/targetManage',
        meta: {
            module: "targetManage", //模块名称
            name: "目标管理"
        },
        components: {
            mainRouter:  () => import('./index.vue')
        }
    }
]
export default demoModule;