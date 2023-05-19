<template lang="">
  <div class="h-20 flex justify-end items-center mx-6">
    <label for="articleModal" @click="isAdd = true" class="btn">新增文章</label>
  </div>
  <div>
    <table class="table w-full">
      <thead>
        <tr>
          <th class="w-10">日期</th>
          <th class="max-w-lg truncate">標題</th>
          <th>圖片</th>
          <th>作者</th>
          <th>是否公開</th>
          <th class="w-10">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articleList" :key="item.id">
          <td>{{ date(item.create_at) }}</td>
          <td class="truncate max-w-xs">{{ item.title }}</td>
          <td>
            <img class="w-28" :src="item.image" alt="" />
          </td>
          <td>{{ item.author }}</td>
          <td>
            <span class="text-success text-xl" v-if="item.isPublic">公開</span>
            <span class="text-gray-400" v-else> 未公開</span>
          </td>
          <td>
            <label
              for="articleModal"
              @click="getItem(item), (isAdd = false)"
              class="btn btn-sm btn-outline btn-primary mx-2"
            >
              編輯
            </label>
            <label
              for="deleteModal"
              @click="getItem(item)"
              class="btn btn-sm btn-outline btn-error"
            >
              刪除
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ArticleModal />
  <DeleteModal />
</template>
<script setup>
import { date } from '../../composables/useDateChange';
import { storeToRefs } from 'pinia';
import ArticleModal from '../../components/ArticleModal.vue';
import { useArticleStores } from '../../stores/ArticleStores';
import DeleteModal from '../../components/DeleteModal.vue';
const articleStores = useArticleStores();
const { articleList, isAdd } = storeToRefs(articleStores);
const { getArticleList, getItem } = articleStores;
getArticleList();
</script>
<style lang=""></style>
