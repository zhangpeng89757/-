let demoModule = [
    {
        path: '/innovationcreation',
        meta: {
            module: "innovationcreation", //模块名称
            name: "创新创造"
        },
        components: {
            mainRouter:  () => import('./index.vue')
        }
    }
]
export default demoModule;