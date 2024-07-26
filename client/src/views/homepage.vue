<template>
    <div class="container">
        <div class="nav">
            <div @click="homePage">首页</div>
            <div>
                <n-popselect @update:value="searchByCategory" v-model:value="selectedCategory" :options="categortyOptions" trigger="click">
                    <div>分类<span>{{ categoryName }}</span></div>
                </n-popselect>
            </div>
            <div @click="dashboard">后台</div>
            <div @click="ownerinfo">作者</div>
        </div>
        <n-divider />
        
        <!-- Carousel Section -->
        <div class="carousel-container">
            <n-carousel :autoplay="true" interval="3000" style="height: 300px; margin-bottom: 20px;">
                <img src="./circulateBanner/banner1.jpg" alt="Image 1" style="width: 100%; height: 100%; object-fit: cover;">
                <img src="./circulateBanner/banner2.jpg" alt="Image 2" style="width: 100%; height: 100%; object-fit: cover;">
                <img src="./circulateBanner/banner3.jpg" alt="Image 3" style="width: 100%; height: 100%; object-fit: cover;">
            </n-carousel>
            <div class="carousel-title">
                网页标题
                <div class="carousel-subtitle">桃李不言，下自成蹊</div>
            </div>
        </div>

        <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{ width: '500px' }" placeholder="请输入关键字" />
            <n-button type="primary" ghost @click="loadBlogs(0)"> 搜索 </n-button>
        </n-space>

        <div v-for="(blog, index) in blogListInfo" style="margin-bottom:15px;cursor: pointer;">
            <n-card :title="blog.title" @click="toDetail(blog)">
                {{ blog.previewContent }}

                <template #footer>
                    <n-space align="center">
                        <div>发布时间：{{ blog.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>

        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

        <n-divider />
        <div class="footer">
            <div>Copyright 2024 Devil__Zero</div>
            <div>幻ICP备114514号-⑨</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NPopselect, NDivider, NSpace, NInput, NButton, NCard, NPagination, NCarousel } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")
const selectedCategory = ref(0)
const categortyOptions = ref([])
const blogListInfo = ref([])

// 查询和分页数据
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: "",
    categoryId:0,
})

onMounted(() => {
    loadCategorys();
    loadBlogs()
})
const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page;
    }
    let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
    let temp_rows = res.data.data.rows;
    for (let row of temp_rows) {
        row.previewContent = row.content.replace(/<[^>]+>/g, '') + "..."
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    blogListInfo.value = temp_rows;
    pageInfo.count = res.data.data.count;
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
    console.log(res)
}

const categoryName = computed(() => {
    let selectedOption = categortyOptions.value.find((option) => { return option.value == selectedCategory.value })
    return selectedOption ? selectedOption.label : ""
})

const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categortyOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
    // 添加“查看全部文章”选项
    categortyOptions.value.unshift({ label: "All", value: 0 })
    console.log(categortyOptions.value)
}

const searchByCategory = (categoryId)=>{
    pageInfo.categoryId = categoryId;
    loadBlogs()
}

const toDetail = (blog)=>{
    router.push({path:"/detail",query:{id:blog.id}})
}

const homePage = () => {
    router.push("/homepage")
}

const dashboard = () => {
    router.push("/login")
}

const ownerinfo = () => {
    router.push("/ownerinfo")
}

</script>

<style lang="scss" scoped>

.search{
    margin-bottom: 15px;
}
.container {
    width: 1200px;
    margin: 0 auto;
}

.nav {
    display: flex;
    font-size: 20px;
    padding-top: 20px;
    color: #64676a;

    div {
        cursor: pointer;
        margin-right: 15px;

        &:hover {
            color: rgb(0, 166, 255);
        }

        span {
            font-size: 12px;
        }
    }
}

.carousel-container {
    position: relative;
}

.carousel-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 60px;
    font-weight: lighter;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    .carousel-subtitle {
        font-size: 30px;
        font-weight: lighter;
        margin-top: 0px;
    }
}

.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>