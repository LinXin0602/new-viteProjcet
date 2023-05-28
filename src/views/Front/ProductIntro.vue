<template lang="">
  <loading-overlay :active="isLoading"></loading-overlay>
  <div
    class="container mx-auto my-20 w-4/5 flex flex-col lg:flex-row flex-wrap"
  >
    <div class="basis-1/3 flex-grow">
      <div class="text-md breadcrumbs mb-3">
        <ul>
          <li><a @click="goProducts">商品列表</a></li>
          <li>
            <p>{{ product.title }}</p>
          </li>
        </ul>
      </div>
      <img :src="product.imageUrl" :alt="product.title" />
    </div>
    <div class="mt-10 lg:mt-0 lg:ml-10 basis-1/3 flex-grow">
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
        <form
          class="my-4"
          @submit.prevent="addShopingCart(product, productQty)"
        >
          <input
            class="input input-sm input-bordered w-2/5 text-center"
            type="number"
            v-model="productQty"
            min="1"
          />
          <button
            v-if="status.loadingItem === product.id"
            :disabled="status.loadingItem === product.id"
            class="btn btn-sm mx-0.5 align-top loading"
          >
            加入購物車
          </button>
          <button v-else class="btn btn-sm mx-0.5 align-top">加入購物車</button>
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

  <ProductsRecommended />
</template>
<script setup>
import ProductsRecommended from '@/components/ProductsRecommended.vue';
import { ref } from 'vue';
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
const { getProduct, addShopingCart } = userProductsStroes;
const { product, isLoading, status } = storeToRefs(userProductsStroes);

const route = useRoute();
const router = useRouter();
const goProducts = () => {
  router.push({ name: 'productlist' });
};
const productId = route.params.id;
getProduct(productId);

const productQty = ref(1);
</script>
<style lang=""></style>
