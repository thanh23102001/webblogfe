import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/blogList",
      name: "blogList",
      component: () => import("./components/BlogsList")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddBlog")
    },
    {
    path: '/blog/:id',
    alias: '/edit-blog',
    name: 'edit-blog',
    component: () => import('./components/EditBlog'),
}
  ]
});