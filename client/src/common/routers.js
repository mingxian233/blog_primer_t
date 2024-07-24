import { createRouter, createWebHashHistory }   from "vue-router";

let routes = [
    {path:"/test", component:()=>import("../views/test.vue")},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export {router, routes};