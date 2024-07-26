<template>
    <div class="wrapper">
        <div class="login-panel">
            <n-card>
                <template #header>
                    <div class="title-card">
                        后台登录
                    </div>
                </template>
                <n-card title="登录">
                    <n-form :rules="rules" :model="admin">
                        <n-form-item path="account" label="用户名">
                            <n-input v-model:value="admin.account" placeholder="请输入用户名" />
                        </n-form-item>
                        <n-form-item path="password" label="密码">
                            <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" />
                        </n-form-item>
                    </n-form>
                    <template #footer>
                        <div class="footer-content">
                            <n-checkbox v-model:checked="admin.rember" label="记住我" />
                            <n-button type="success" @click="login">登录</n-button>
                            <n-button type="default" @click="goHome">返回首页</n-button>
                        </div>
                    </template>
                </n-card>
            </n-card>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { AdminStore } from '../stores/AdminStore'

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const axios = inject("axios")
const message = inject("message")
const adminStore = AdminStore()

let rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
    ],
};

const admin = reactive({
    account: localStorage.getItem("account") || "",
    password: localStorage.getItem("password") || "",
    rember: localStorage.getItem("rember") == 1 || false
})

const login = async () => {
    let result = await axios.post("/admin/login", {
        account: admin.account,
        password: admin.password
    });
    if (result.data.code == 200) {
        adminStore.token = result.data.data.token;
        adminStore.account = result.data.data.account;
        adminStore.id = result.data.data.id;
        if (admin.rember) {
            localStorage.setItem("account", admin.account);
            localStorage.setItem("password", admin.password);
            localStorage.setItem("rember", admin.rember ? 1 : 0);
        }
        router.push("/dashboard");
        message.info("登录成功！");
    } else {
        message.error("登录失败！")
    }
}

const goHome = () => {
    router.push("/");
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100vw;
    height: 100vh;
    background: url('../../image/bg-login.png') no-repeat center center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../image/bg-login.png') no-repeat center center;
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
}

.login-panel {
    width: 540px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-panel .n-card {
    background-color: transparent;
}

.title-card {
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-content n-button {
    margin-left: auto;
}
</style>
