<template lang="">
  <div class="h-48 font-semibold flex justify-center items-center text-3xl">
    <h2>關於那些事</h2>
  </div>
  <div class="divider my-2 mb-14"></div>
  <div
    data-aos="fade-right"
    data-aos-offset="300"
    data-aos-easing="ease-in-sine"
    class="container mx-auto w-4/5 justify-center lg:w-3/5"
    v-for="item in UserArticleList"
    :key="item.id"
  >
    <div class="card md:card-side bg-gray-100 shadow-xl lg:h-64">
      <img
        @click="goArticle(item.id)"
        class="md:w-2/6 lg:w-auto bg-cover cursor-pointer"
        :src="item.image"
        :alt="item.image"
      />

      <div class="card-body min-w-0 p-5">
        <h2 class="my-5 card-title">{{ item.title }}</h2>
        <p class="truncate">
          {{ item.description }}
        </p>
        <div class="card-actions justify-end">
          <p>{{ DayDate(item.create_at) }}</p>
          <button @click="goArticle(item.id)" class="btn">查看更多</button>
        </div>
      </div>
    </div>
    <div class="divider my-20"></div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useArticleStores } from '../../stores/ArticleStores';
import { useRouter } from 'vue-router';
import { changeDate } from '../../composables/useDateChange';
const ArticleStores = useArticleStores();
const { getUserArticleList } = ArticleStores;
const { UserArticleList, userTempArticle } = storeToRefs(ArticleStores);
getUserArticleList();
const { DayDate } = changeDate();

const router = useRouter();
const goArticle = (id) => {
  userTempArticle.value = {};
  router.push({ name: 'articleview', params: { id: id } });
};
</script>
<style lang=""></style>
