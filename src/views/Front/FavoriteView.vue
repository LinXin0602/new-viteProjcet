<template lang="">
  <div class="h-48 font-semibold flex justify-center items-center text-3xl">
    <h2>那些最愛</h2>
  </div>
  <div class="divider my-2 mb-14"></div>

  <div
    v-if="favoriteItems.length < 1"
    class="h-80 w-3/4 mx-auto bg-gray-100 mt-12 flex flex-col items-center justify-center p-10"
  >
    <h2 class="text-3xl">
      這麼多好吃的竟然沒有最愛，那你一定還沒逛我們的商品！！
    </h2>
    <button class="btn bg-gray-300 rounded-md text-2xl mt-10">
      <router-link :to="{ name: 'productlist' }">趕快去看看</router-link>
    </button>
  </div>
  <div v-else class="mx-auto max-w-2xl px-4 sm:px-6 py-6 lg:max-w-7xl lg:px-8">
    <div
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      <a
        @click="goProduct(item.id)"
        v-for="item in favoriteList"
        :key="item.id"
        class="group hover:scale-105 duration-200 cursor-pointer hover:shadow-2xl shadow-lg border-2 border-gray-300/50 rounded-lg p-2"
      >
        <div
          class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative"
        >
          <img
            :src="item.imageUrl"
            :alt="item.imageAlt"
            class="h-full w-full object-cover object-center group-hover:opacity-75 cursor-pointer"
          />
        </div>
        <h3 class="mt-4 mx-2 text-2xl text-gray-700">
          {{ item.title }}
        </h3>
        <div class="flex justify-between">
          <p class="my-1 text-lg font-medium text-gray-900 mx-2">
            NT${{ item.price }}
          </p>
          <button>
            <font-awesome-icon
              v-if="favoriteItems.includes(item.id)"
              @click.stop="addFavorite(item), getFavoriteList()"
              class="text-3xl text-red-400 hover:scale-125 duration-200"
              :icon="['fass', 'heart']"
            /><font-awesome-icon
              v-else
              @click.stop="addFavorite(item), getFavoriteList()"
              class="text-3xl text-gray-400 hover:scale-125 duration-200"
              :icon="['far', 'heart']"
            />
          </button>
        </div>

        <div class="mt-3">
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
        </div>
      </a>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMyFavoriteStores } from '@/stores/MyFavoriteStores';
// import axios from 'axios';
import { useUserProductsStores } from '../../stores/UserProductsStores.js';
import { useRouter } from 'vue-router';

const userProductsStroes = useUserProductsStores();
const { addShopingCart } = userProductsStroes;
const { status, product } = storeToRefs(userProductsStroes);

const router = useRouter();
const goProduct = (id) => {
  product.value = {};
  router.push({ name: 'productintro', params: { id: id } });
};

const myFavoriteStores = useMyFavoriteStores();
const { getLocalStorage, addFavorite } = myFavoriteStores;
const { favoriteItems } = storeToRefs(myFavoriteStores);
favoriteItems.value = getLocalStorage() || [];

//獲取所有商品
const products = ref([]);
const getProducts = () => {
  const api = `${import.meta.env.VITE_API}api/${
    import.meta.env.VITE_PATH
  }/products/all`;
  axios.get(api).then((res) => {
    products.value = res.data.products;
    getFavoriteList();
  });
};
//獲取各筆最愛的產品
const favoriteList = ref([]);
const getFavoriteList = () => {
  favoriteList.value = [];
  favoriteItems.value.forEach((idItem) => {
    product.value = products.value.find((item) => {
      return item.id === idItem;
    });
    favoriteList.value.push(product.value);
  });
};

getProducts();
</script>
<style lang=""></style>
