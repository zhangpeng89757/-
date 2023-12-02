import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

let routes = [];
//读取模块下的所有路由文件
const viewContext = import.meta.globEager('@/views/**/router.js');
console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwww",viewContext)
//将模块下的所有路由添加到主路由器中
for(var item in viewContext) {
  routes = routes.concat(viewContext[item].default);
}

//将所有路由注册
const router = createRouter({
  // history: createWebHistory(),//history模式部署到nginx后还需要改config，建议修改为hash方式
  history: createWebHashHistory(),
  routes
})

//路由全局钩子监听
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('.html') != -1) {
      next()
  } else if (to.matched.length === 0) {
      //如果未匹配到路由的
  } else if (to.meta.authentication && (window.sessionStorage.getItem("token") == undefined || window.sessionStorage.getItem("token") == null || window.sessionStorage.getItem("token") == '')) {
      //验证登录
      router.push("/login");
  } else {
      next()
  }
})

export default router