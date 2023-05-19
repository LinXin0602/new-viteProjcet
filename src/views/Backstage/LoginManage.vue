<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-20 w-auto"
        src="@/assets/thisballLogo.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        後台登入系統
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="signIn">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >管理者帳號</label
          >
          <div class="mt-2">
            <input
              autofocus
              v-model="user.username"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="請輸入您的帳號"
              class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >管理者密碼</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="user.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="請輸入您的密碼"
              class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            登入
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const user = ref({
  username: '',
  password: '',
});
const api = `${import.meta.env.VITE_API}admin/signin`;
const signIn = () => {
  axios.post(api, user.value).then((res) => {
    if (res.data.success) {
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
      router.push({ name: 'productdata' });
    } else {
      console.log(res);
    }
  });
};
</script>
<style lang=""></style>
