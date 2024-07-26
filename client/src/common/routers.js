import { createRouter, createWebHashHistory }   from "vue-router";

let routes = [
    {path:"/test", component:()=>import("../views/test.vue")},
    {path:"/login", component:()=>import("../views/login.vue")},
    {path:"/", component:()=>import("../views/homepage.vue")},
    {path:"/detail", component:()=>import("../views/detail.vue")},
    {path:"/ownerinfo", component:()=>import("../views/ownerinfo.vue")},
    {path:"/dashboard", component:()=>import("../views/dashboard/Dashboard.vue") ,children: [
         {path: "/dashboard/category", component:()=>import("../views/dashboard/Category.vue")},
         {path: "/dashboard/article", component:()=>import("../views/dashboard/Article.vue")},
    ]},
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export {router, routes};