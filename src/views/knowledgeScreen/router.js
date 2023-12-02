let demoModule = [
    {
        path: '/knowledgeScreen',
        meta: {
            module: "knowledgeScreen", //模块名称
            name: "知识大屏"
        },
        components: {
            mainRouter:  () => import('./index.vue')
        }
    }
]
export default demoModule;