<template lang="">
  <div
    class="mt-16 h-[60vh] bg-gray-50 p-5 px-10 lg:px-16 flex flex-col justify-around"
  >
    <h3 class="text-3xl md:mx-6 m-6">你可能也會喜歡</h3>
    <Swiper
      class="h-72 w-full"
      :modules="modules"
      :slides-per-view="1"
      :breakpoints="{
        560: {
          slidesPerView: 2,
          spaceBetween: 80,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 60,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 60,
        },
      }"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
    >
      <swiper-slide v-for="item in productsShow" :key="item.id">
        <a
          @click="goProduct(item.id)"
          :key="item.id"
          class="group hover:scale-105 duration-200 cursor-pointer"
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
          </div>
        </a>
      </swiper-slide>
    </Swiper>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserProductsStores } from '@/stores/UserProductsStores';
import { useRouter, useRoute } from 'vue-router';
const modules = [Pagination, Autoplay];
//取得當前商品頁面的ID
const route = useRoute();
const productId = route.params.id;
//跳轉商品頁面
const router = useRouter();
const goProduct = (id) => {
  product.value = [];
  router.push({ name: 'productintro', params: { id: id } });
  getProduct(id);
  productsShow.value = [];
  randomHandle();
};

const userProductsStroes = useUserProductsStores();
const { products, product } = storeToRefs(userProductsStroes);
const { getProducts, getProduct } = userProductsStroes;

//先獲取總商品列表，再隨機push8樣不同的商品
getProducts();
const productsShow = ref([]);
const randomHandle = () => {
  while (productsShow.value.length < 8) {
    const randomProduct = products.value[Math.floor(Math.random() * 25)];
    if (
      !productsShow.value.includes(randomProduct) &&
      randomProduct.id !== productId
    ) {
      productsShow.value.push(randomProduct);
    }
  }
  return productsShow.value;
};
//解決重新整理時productsShow造成的while loop無限迴圈
watch(products, () => {
  productsShow.value = [];
  randomHandle();
});
</script>
<style lang=""></style>
