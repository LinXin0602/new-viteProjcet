<template lang="">
  <div class="h-48 font-semibold flex justify-center items-center text-3xl">
    <h2>關於那些事</h2>
  </div>
  <div class="divider my-2 mb-14"></div>
  <div
    data-aos="fade-right"
    data-aos-offset="100"
    data-aos-easing="ease-in-sine"
    class="mx-auto justify-center w-4/5 lg:w-3/5"
    v-for="item in UserArticleList"
    :key="item.id"
  >
    <div class="card md:card-side bg-gray-100 shadow-xl md:h-72 md:flex-row">
      <img
        @click="goArticle(item.id)"
        class="h-[55vh] md:h-full md:w-2/6 max-w-full object-cover object-center cursor-pointer md:basis-1/3"
        :src="item.image"
        :alt="item.image"
      />
      <div class="card-body min-w-0 p-5 md:basis-2/3">
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
