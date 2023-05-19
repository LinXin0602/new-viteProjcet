<template>
  <div>
    <router-link to="/loginmanage">後台登入</router-link>
    <router-link to="/userboard">使用者介面</router-link>
    <router-view></router-view>
  </div>
  <OpenModal />
</template>
<script setup>
import OpenModal from './Front/OpenModal.vue';
</script>
