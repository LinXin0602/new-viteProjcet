<template>
  <loading-overlay :active="isLoading">
    <div class="loadingio-spinner-ball-l30nz6iyhu9">
      <div class="ldio-hnk0xi4nyc8">
        <div></div>
      </div></div
  ></loading-overlay>
  <div class="text-end">
    <label for="my-modal" @click="isAdd = true" class="btn m-3">新增商品</label>
  </div>

  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th width="30">分類</th>
          <th class="text-center" width="150">圖片</th>
          <th class="text-center" width="150">產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th class="w-3">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id" class="hover">
          <th>{{ item.category }}</th>
          <th><img class="pr-10" :src="item.imageUrl" :alt="item.title" /></th>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-red-500" v-else> 未啟用</span>
          </td>
          <td>
            <label
              for="my-modal"
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
  <ProductModal />
  <DeleteModal />
  <DataPage />
</template>

<script setup>
import DeleteModal from '@/components/DeleteModal.vue';
import DataPage from '@/components/DataPage.vue';
import ProductModal from '@/components/ProductModal.vue';
//從pinia取得product資料
import { storeToRefs } from 'pinia';
import { useProductsStores } from '@/stores/ProductsStores.js';
const productsStores = useProductsStores();
const { products, tempProduct, isLoading, isAdd } = storeToRefs(productsStores);
const { getProduct } = productsStores;
getProduct();
const getItem = (item) => {
  tempProduct.value = { ...item };
};
</script>

<style></style>
