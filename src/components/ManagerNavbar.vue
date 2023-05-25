<template lang="">
  <div class="w-full top-0 z-50 h-16 navbar bg-gray-200 rounded-b-xl shadow-xl">
    <div class="flex-1 mx-5">
      <router-link :to="{ name: 'productdata' }">
        <img
          class="h-12"
          src="../assets/thisballLogo_preview_rev_1.png"
          alt=""
        />
      </router-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <router-link class="btn btn-ghost" :to="{ name: 'productdata' }"
            >產品管理</router-link
          >
        </li>
        <li>
          <router-link class="btn btn-ghost" :to="{ name: 'articledata' }"
            >文章管理</router-link
          >
        </li>
        <li>
          <router-link class="btn btn-ghost" :to="{ name: 'coupondata' }"
            >優惠券</router-link
          >
        </li>
        <li>
          <router-link class="btn btn-ghost" :to="{ name: 'orderlist' }"
            >訂單</router-link
          >
        </li>
        <li>
          <router-link class="btn btn-ghost" :to="{ name: 'homeview' }"
            >前台頁面</router-link
          >
        </li>
        <li><a @click="logout" class="btn btn-ghost">登出</a></li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const api = `${import.meta.env.VITE_API}logout`;
const logout = () => {
  axios.post(api).then((res) => {
    if (res.data.success) {
      router.push({ name: 'loginmanage' });
    }
  });
};
</script>

<style lang=""></style>
