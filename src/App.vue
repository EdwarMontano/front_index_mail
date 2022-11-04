<template> 
  <a-layout class="layout">

    <a-layout-header v-if="!userStore.loadingSession">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item key="home" v-if="userStore.userData">
          <template #icon>
            <home-outlined />
          </template>
          <router-link to="/">Inicio</router-link> 
        </a-menu-item>
        <a-menu-item key="register" v-if="!userStore.userData">
          <template #icon>
            <user-add-outlined />
          </template>
          <router-link to="/register" >Registrase</router-link>
        </a-menu-item>
        <a-menu-item key="login" v-if="!userStore.userData">
          <template #icon>
            <login-outlined />
          </template>
          <router-link to="/login" >Ingresar</router-link>
        </a-menu-item >
        <a-menu-item key="logout" @click="userStore.logoutUser" v-if="userStore.userData">
          <template #icon>
            <logout-outlined />
          </template>
          Salir
        </a-menu-item>


      </a-menu>
    </a-layout-header>
    <div v-else>
      Cargando user...
    </div>      

    
      <!-- <a-button type="primary" @click="userStore.logoutUser" v-if="userStore.userData">Logout</a-button> -->
      <!-- <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button> -->
   
    <a-layout-content style="padding: 0 50px">
      <h1>Fast IndexMail</h1> 
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">       
        <router-view></router-view>
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Chocoplot ©2022 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
    import { ref, watch } from "vue-demi"
  import {useUserStore} from "./stores/user"
  import {useRoute} from "vue-router"
  import { HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons-vue';


  const userStore= useUserStore()
  const route = useRoute()
  const selectedKeys=ref([])
  watch (()=>route.name,()=>{selectedKeys.value =[route.name]})
</script>

<style>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>