let demoModule = [
    {
        path: '/overalloverview',
        meta: {
            module: "overalloverview", //模块名称
            name: "全部概况"
        },
        components: {
            mainRouter:  () => import('./index.vue')
        }
    }
]
export default demoModule;