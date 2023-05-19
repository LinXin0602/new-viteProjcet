<template lang="">
  <ManagerNavbar class="mb-3" />
  <router-view></router-view>
</template>
<script setup>
import axios from 'axios';

import ManagerNavbar from '@/components/ManagerNavbar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
);

axios.defaults.headers.common.Authorization = `${token}`;
const api = `${import.meta.env.VITE_API}api/user/check`;

axios.post(api).then((res) => {
  if (!res.data.success) {
    router.push({ name: 'loginmanage' });
  }
});
</script>
<style lang=""></style>
