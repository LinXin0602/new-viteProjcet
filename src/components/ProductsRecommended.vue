<template>
  <div
    class="mt-16 h-[28rem] bg-gray-50 px-10 lg:px-16 flex flex-col justify-around"
  >
    <h3 class="text-3xl md:mx-6 m-6">你可能也會喜歡</h3>
    <Swiper
      class="w-full h-full"
      :modules="modules"
      :slides-per-view="1"
      :breakpoints="{
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
    >
      <swiper-slide v-for="item in productsShow" :key="item.id" class="">
        <button
          type="button"
          @click="goProduct(item.id)"
          :key="item.id"
          class="group duration-200 cursor-pointer"
        >
          <div
            class="overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
          >
            <img
              :src="item.imageUrl"
              :alt="item.imageAlt"
              class="object-cover object-center group-hover:opacity-75 cursor-pointer"
            />
          </div>
          <h3 class="mt-4 mx-2 text-2xl text-gray-700">
            {{ item.title }}
          </h3>

          <p class="my-0.5 text-lg font-medium text-gray-900 mx-2">
            NT${{ item.price }}
          </p>
        </button>
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

const userProductsStores = useUserProductsStores();
const { products, product } = storeToRefs(userProductsStores);
const { getProducts, getProduct } = userProductsStores;

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

<style lang="css">
.swiper-pagination {
  bottom: -6px;
}
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  text-align: center;
  line-height: 20px;
  font-size: 6px;
  color: #150101;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}
.swiper-pagination-bullet-active {
  color: #fff;
  background: #5878c9;
}
</style>
