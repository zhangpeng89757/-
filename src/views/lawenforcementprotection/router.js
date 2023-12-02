let demoModule = [
    {
        path: '/lawenforcementprotection',
        meta: {
            module: "lawenforcementprotection", //模块名称
            name: "执法保护"
        },
        components: {
            mainRouter:  () => import('./index.vue')
        }
    }
]
export default demoModule;