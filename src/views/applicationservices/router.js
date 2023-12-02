let demoModule = [
    {
        path: '/applicationservices',
        meta: {
            module: "applicationservices", //模块名称
            name: "运用服务"
        },
        components: {
            mainRouter:  () => import('./index.vue')
        }
    }
]
export default demoModule;