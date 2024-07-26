<template>
    
    <div class="main-panel">
        <div class="menus">
            <div v-for="(menu,index) in menus" @click="toPage(menu)">
                {{menu.name}}
            </div>
        </div>
        <div style="padding:30px;width:100%">
            <router-view>

            </router-view>
        </div>
    </div>
    <div class="title">
  <n-gradient-text
    gradient="{
      from: 'rgb(20, 20, 20)',
      to: 'rgb(125, 135, 150)',
    }"
  >
    后台管理
  </n-gradient-text>
    </div>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore'
import { ref, reactive, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const message = inject("message")
const axios = inject("axios")

const adminStore = AdminStore()


let menus = [
    { name: "文章管理", href: "/dashboard/article"},
    { name: "分类管理", href: "/dashboard/category"},
    { name: "退出", href: "/logout"}
]

const toPage = (menu) => {
    if(menu.href == '/logout'){
        message.success("退出成功")
        router.push("/login")
    }else{
        router.push(menu.href)
    }
}
</script>

<style lang="scss" scoped>
.main-panel{
    display: flex;
    color: gray;
    max-width: 1500px;
    margin: 0 auto;
}
.menus{
    padding: 20px 0;
    box-sizing: border-box;
    line-height: 60px;
    text-align: center;
    width: 200px;
    height: 100vh;
    border-right: 1px solid gray;

    div {
        cursor: pointer;
        &:hover {
            color: rgb(80, 80, 221);
        }
    }
}

.title {
    .n-gradient-text{
        font-size: 65px;
        font-weight: bold;
        text-align: right;
        position: fixed;
        color: rgba(0, 0, 0, 0.2);
        right: calc((100vw - 1000px) / 2);
        bottom: 20px;
    }
}
</style>