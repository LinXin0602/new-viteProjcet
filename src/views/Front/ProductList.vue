<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <div class="bg-white">
    <div class="tabs flex justify-center h-24">
      <ul>
        <li
          :class="{ 'tab-bordered tab-active': productStyle === '' }"
          class="px-5 tab hover:tab-bordered"
          @click="(productStyle = ''), getProducts()"
        >
          全部商品
        </li>
        <li
          :class="{
            'tab-bordered tab-active': productStyle === '招牌純牛乳鬆餅球',
          }"
          class="px-5 tab hover:tab-bordered"
          @click="(productStyle = '招牌純牛乳鬆餅球'), getProducts()"
        >
          鬆餅球
        </li>
        <li
          :class="{ 'tab-bordered tab-active': productStyle === '咖啡' }"
          class="px-5 tab hover:tab-bordered"
          @click="(productStyle = '咖啡'), getProducts()"
        >
          咖啡
        </li>
        <li
          :class="{ 'tab-bordered tab-active': productStyle === '飲品' }"
          class="px-5 tab hover:tab-bordered"
          @click="(productStyle = '飲品'), getProducts()"
        >
          飲品
        </li>
      </ul>
    </div>
    <div class="divider my-1"></div>
    <div class="mx-auto max-w-2xl px-4 sm:px-6 py-6 lg:max-w-7xl lg:px-8">
      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <a
          @click="goProduct(item.id)"
          v-for="item in filteredProducts"
          :key="item.id"
          class="group hover:scale-105 duration-200 cursor-pointer hover:shadow-md"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
          >
            <img
              :src="item.imageUrl"
              :alt="item.imageAlt"
              class="h-full w-full object-cover object-center group-hover:opacity-75 cursor-pointer"
            />
          </div>
          <h3 class="mt-4 mx-2 text-2xl text-gray-700">{{ item.title }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900 mx-2">
            售價 : NT${{ item.price }}
          </p>
          <button @click="goProduct(item.id)" class="btn w-full my-3">
            查看更多
          </button>
          <button
            v-if="status.loadingItem === item.id"
            :disabled="status.loadingItem === item.id"
            class="btn w-full loading"
          >
            加入購物車
          </button>
          <button v-else class="btn w-full" @click.stop="addShopingCart(item)">
            加入購物車
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserProductsStores } from '../../stores/UserProductsStores.js';
const userProductsStroes = useUserProductsStores();
const { getProducts, addShopingCart, getShopingCart } = userProductsStroes;
const { status, isLoading, product, filteredProducts, productStyle } =
  storeToRefs(userProductsStroes);
import { useRouter } from 'vue-router';
const router = useRouter();
getProducts();
getShopingCart();
const goProduct = (id) => {
  product.value = {};
  router.push({ name: 'productintro', params: { id: id } });
};
</script>
