<template>
  <input type="checkbox" id="deleteModal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        確定要刪除
        <span v-if="tempProduct?.id" class="text-red-400">{{
          tempProduct.title
        }}</span>
        <span v-else-if="tempCoupon?.id" class="text-red-400">{{
          tempCoupon.title
        }}</span>
        <span v-else-if="tempOrder.id" class="text-2xl"
          >{{ tempOrder.user?.name }} <span class="text-lg">的訂單</span>
        </span>
        <span v-else-if="tempArticle.id" class="text-2xl"
          >{{ tempArticle.title }} <span class="text-lg"></span>
        </span>
        ?
      </h3>

      <div class="modal-action">
        <label
          v-if="tempCoupon.id"
          for="deleteModal"
          class="btn"
          @click="dealeteCoupon"
          >確定</label
        >
        <label
          v-else-if="tempProduct.id"
          for="deleteModal"
          class="btn"
          @click="dealeteItem"
          >確定</label
        >
        <label
          v-else-if="tempOrder.id"
          for="deleteModal"
          class="btn"
          @click="deleteOrder"
          >確定</label
        >
        <label
          v-else-if="tempArticle.id"
          for="deleteModal"
          class="btn"
          @click="deleteArticle"
          >確定</label
        >
        <label
          for="deleteModal"
          @click="
            (tempProduct = {}),
              (tempCoupon = { is_enabled: 1 }),
              (tempOrder = {}),
              (tempArticle = {
                create_at: Math.floor(Date.now() / 1000),
                isPublic: true,
              })
          "
          class="btn"
          >取消!</label
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
//產品頁面
import { useProductsStores } from '@/stores/ProductsStores.js';
const productsStores = useProductsStores();
const { tempProduct } = storeToRefs(productsStores);
const { dealeteItem } = productsStores;
//優惠券頁面
import { useCouponStores } from '@/stores/CouponStores';
const couponStores = useCouponStores();
const { tempCoupon } = storeToRefs(couponStores);
const { dealeteCoupon } = couponStores;
//訂單頁面
import { useOrderStores } from '@/stores/OrderStores';
const orderStores = useOrderStores();
const { tempOrder } = storeToRefs(orderStores);
const { deleteOrder } = orderStores;
//文章頁面
import { useArticleStores } from '@/stores/ArticleStores';
const ArticleStores = useArticleStores();
const { tempArticle } = storeToRefs(ArticleStores);
const { deleteArticle } = ArticleStores;
</script>

<style></style>
