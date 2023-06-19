<template>
  <footer
    class="footer footer-center p-5 mt-8 bg-gray-200 text-base-content rounded gap-5"
  >
    <div>
      <div class="grid grid-flow-col gap-4">
        <a href="https://github.com/LinXin0602/new-viteProjcet">
          <font-awesome-icon class="text-2xl" :icon="['fab', 'github']"
        /></a>
        <a href="https://www.instagram.com/thisball._____/">
          <font-awesome-icon class="text-2xl" :icon="['fab', 'instagram']" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100064166376110">
          <font-awesome-icon class="text-2xl" :icon="['fab', 'facebook']" />
        </a>
        <router-link class="text-xl font-bold" :to="{ name: 'loginmanage' }"
          >後台管理</router-link
        >
      </div>
    </div>

    <div>
      <p>Copyright © 2023 - Lin YuXin 此網站為個人練習使用，無任何商業行為</p>
    </div>
  </footer>
</template>

<script setup></script>

<style></style>
