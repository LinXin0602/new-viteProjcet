<template lang="">
  <div class="btn-group flex justify-center my-2">
    <button class="btn btn-sm btn-outline" @click="prePage">«</button>
    <ul
      v-for="page in pagination.total_pages"
      :key="page"
      :class="{ 'btn-active ': page === pagination.current_page }"
    >
      <li @click="getProduct(page)" class="btn btn-sm btn-outline">
        {{ page }}
      </li>
    </ul>

    <button @click="nextPage" class="btn btn-sm btn-outline">»</button>
  </div>
</template>
<script setup>
//從ProductsStores獲取 product data & methodes
import { storeToRefs } from 'pinia';
import { useProductsStroes } from '@/stores/ProductsStores.js';
const productsStroe = useProductsStroes();
const { pagination } = storeToRefs(productsStroe);
const { getProduct } = productsStroe;
//下一頁methods
const nextPage = () => {
  if (pagination.value.has_next) {
    pagination.value.current_page += 1;
    getProduct(pagination.value.current_page);
  }
};
//上一頁methods
const prePage = () => {
  if (pagination.value.has_pre) {
    pagination.value.current_page -= 1;
    getProduct(pagination.value.current_page);
  }
};
</script>
<style lang=""></style>
