<template lang="">
  <loading-overlay :active="isLoading"></loading-overlay>
  <div class="container mx-auto my-20 py-10 px-36 flex flex-row">
    <div class="basis-3/6">
      <div class="text-md breadcrumbs mb-3">
        <ul>
          <li><a @click="goProducts">商品列表</a></li>
          <li>
            <a>{{ product.title }}</a>
          </li>
        </ul>
      </div>
      <img :src="product.imageUrl" :alt="product.title" />
    </div>
    <div class="basis-1/12"></div>
    <div class="basis-3/6">
      <h1 class="text-3xl text-gray-600">
        {{ product.title }}
      </h1>
      <div class="divider"></div>
      <h3 class="whitespace-pre-line text-md my-3">
        {{ product.description }}
      </h3>
      <h3 class="whitespace-pre-line text-md">{{ product.content }}</h3>
      <div class="divider my-1"></div>

      <div class="flex justify-between">
        <form class="my-4">
          <input
            class="input input-sm input-bordered w-2/5 text-center"
            type="number"
            value="1"
            min="1"
          />
          <button class="btn btn-sm mx-0.5 align-top">加入購物車</button>
        </form>
        <button>
          <font-awesome-icon
            v-if="favoriteItems.includes(product.id)"
            @click="addFavorite(product)"
            class="text-3xl text-red-400"
            :icon="['fass', 'heart']"
          /><font-awesome-icon
            v-else
            @click="addFavorite(product)"
            class="text-3xl text-gray-400"
            :icon="['far', 'heart']"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserProductsStores } from '../../stores/UserProductsStores';
import { useMyFavoriteStores } from '@/stores/MyFavoriteStores';
//我的最愛
const myFavoriteStores = useMyFavoriteStores();
const { addFavorite, getLocalStorage } = myFavoriteStores;
const { favoriteItems } = storeToRefs(myFavoriteStores);
favoriteItems.value = getLocalStorage() || [];
//獲得product資料
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
