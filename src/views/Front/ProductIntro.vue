<template lang="">
  <loading-overlay :active="isLoading"></loading-overlay>
  <div class="container mx-auto py-10 px-36 flex flex-row">
    <div class="basis-3/6">
      <img :src="product.imageUrl" :alt="product.title" />
    </div>
    <div class="basis-1/12"></div>
    <div class="basis-3/6">
      <div class="text-sm breadcrumbs mb-3">
        <ul>
          <li><a @click="goProducts">商品列表</a></li>
          <li>
            <a>{{ product.title }}</a>
          </li>
        </ul>
      </div>
      <h1 class="text-3xl text-gray-600">{{ product.title }}</h1>
      <div class="divider"></div>
      <h3 class="pb-3">{{ product.description }}</h3>
      <h3 class="py-3">售價 : {{ product.price }}</h3>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserProductsStores } from '../../stores/UserProductsStores';
const userProductsStroes = useUserProductsStores();
const { getProduct } = userProductsStroes;
const { product, isLoading } = storeToRefs(userProductsStroes);

const route = useRoute();
const router = useRouter();
const goProducts = () => {
  router.push({ name: 'productlist' });
};
const productId = route.params.id;
getProduct(productId);
</script>
<style lang=""></style>
