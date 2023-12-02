let demoModule = [
    {
        path: '/',
        meta: {
            module: "achievementOverview", //模块名称
            name: "成果概览"
        },
        components: {
            mainRouter:  () => import('./index.vue')
        }
    }
]
export default demoModule;