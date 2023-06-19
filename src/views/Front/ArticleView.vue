<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <div class="h-48 font-semibold flex justify-center items-center text-3xl">
    <h2
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-easing="ease-in-sine"
    >
      {{ userTempArticle.title }}
    </h2>
  </div>
  <div class="flex justify-between min-w-0 px-8">
    <div class="text-sm breadcrumbs">
      <ul>
        <li><router-link :to="{ name: 'homeview' }">首頁</router-link></li>
        <li>
          <router-link :to="{ name: 'articlelistview' }"
            >關於那些事</router-link
          >
        </li>
        <li>{{ userTempArticle.title }}</li>
      </ul>
    </div>
    <p v-if="userTempArticle.create_at" class="hidden sm:block">
      {{ DayDate(userTempArticle.create_at) }}
    </p>
  </div>
  <div class="divider mt-0 md:mb-14"></div>
  <div class="grid grid-cols-1 gap-4 w-full m-auto">
    <div class="w-4/5 lg:w-1/2 mx-auto col-span-1">
      <p
        v-if="userTempArticle.create_at"
        class="text-center block sm:hidden my-5"
      >
        {{ DayDate(userTempArticle.create_at) }}
      </p>
      <img
        :src="userTempArticle.image"
        :alt="userTempArticle.title"
        class="w-full mx-auto"
      />
      <div class="divider"></div>
      <p class="whitespace-pre-line overflow-hidden text-center bg-gray-50 p-4">
        {{ userTempArticle.content }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArticleStores } from '@/stores/ArticleStores';
import { changeDate } from '@/composables/useDateChange';
const { DayDate } = changeDate();
const ArticleStores = useArticleStores();
const { userTempArticle, isLoading } = storeToRefs(ArticleStores);
const { getUserArticle } = ArticleStores;
const route = useRoute();
const articleId = route.params.id;
getUserArticle(articleId);
</script>

<style></style>
