<template>
    <div class="page-container">
      <div class="author-info">
        <n-card>
          <template #header>
            <div class="author-header">
              <n-avatar
                :style="{ width: '100px', height: '100px' }"
                src="https://avatars.githubusercontent.com/u/70092689?v=4"
              />
              <div class="author-name">{{ author.name }}</div>
            </div>
          </template>
          <div class="author-details">
            <p><strong>简介:</strong> {{ author.bio }}</p>
            <p><strong>电子邮箱:</strong> {{ author.contact }}</p>
            <p><strong>社交媒体:</strong></p>
            <n-space>
              <n-button v-for="link in author.socialLinks" :key="link.platform" :type="link.type" @click="openLink(link.url)">
                {{ link.platform }}
              </n-button>
            </n-space>
          </div>
          <n-button class="return-button" type="warning" @click="returnHome">返回主页</n-button>
        </n-card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { NCard, NAvatar, NSpace, NButton } from 'naive-ui'
  import { useRouter, useRoute} from 'vue-router';
  
  const router = useRouter();
  const author = ref({
    name: 'Devil__Zero',
    avatar: 'circulateBanner/avatar.jpg',
    bio: '这里是作者的简介。',
    contact: 'devilzerotop@gmail.com',
    socialLinks: [
      { platform: 'Bilibili', url: 'https://space.bilibili.com/93869077', type: 'error' },
      { platform: 'Weibo', url: 'https://weibo.com/u/7593025227', type: 'info' },
      { platform: 'GitHub', url: 'https://github.com/mingxian233', type: 'success' }
    ]
  })
  
  const openLink = (url) => {
    window.open(url, '_blank')
  }
  
  const returnHome = () => {
    router.push('/')
  }
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('circulateBanner/wallpaper.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .author-info {
    width: 1000px;
    height: 324px; 
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    overflow-y: auto;
  }
  
  .author-header {
    display: flex;
    align-items: center;
  }
  
  .author-name {
    margin-left: 20px;
    font-size: 28px;
    font-weight: bold;
  }
  
  .author-details {
    margin-top: 20px;
  }
  
  .return-button {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  </style>
  