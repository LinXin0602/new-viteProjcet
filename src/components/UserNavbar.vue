<template lang="">
  <loading-overlay :active="isLoading"></loading-overlay>
  <div
    ref="navbarRef"
    class="w-full fixed top-0 z-50 h-16 navbar bg-gray-300 rounded-b-xl shadow-lg"
  >
    <div class="flex-1 mx-5">
      <router-link :to="{ name: 'userboard' }">
        <img class="h-12" src="../assets/thisballLogo_preview_rev_1.png" alt=""
      /></router-link>
    </div>
    <div>
      <ul class="flex">
        <li>
          <router-link
            :to="{ name: 'productlist' }"
            class="underline-transition mx-5 font-mono font-bold hover:text-lg duration-300 ease-in"
            >我們的那些</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'productlist' }"
            class="underline-transition mx-5 font-mono font-bold hover:text-lg duration-300 ease-in"
            >那些食物</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'productlist' }"
            class="underline-transition mx-5 font-mono font-bold hover:text-lg duration-300 ease-in"
            >那些食物</router-link
          >
        </li>
      </ul>

      <div class="dropdown dropdown-end">
        <label
          tabindex="0"
          class="btn btn-ghost btn-circle drawer-overlay"
          for="sidecart"
        >
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item translate-x-5">{{
              shopingCart.carts?.length
            }}</span>
          </div>
        </label>
        <div
          tabindex="0"
          class="mt-3 card card-compact dropdown-content w-auto shadow"
        >
          <div
            v-if="shopingCart.carts?.length > 0"
            class="card-body bg-slate-50 w-96 lg:w-full"
          >
            <div class="overflow-x-auto max-h-96">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr class="">
                    <th></th>
                    <th>品名</th>
                    <th class="text-center">數量</th>
                    <th>單價</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- row 1 -->
                  <tr v-for="item in shopingCart.carts" :key="item.id">
                    <th>
                      <button
                        @click="deleteCart(item.id)"
                        class="btn btn-square btn-outline btn-xs"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </th>
                    <td>{{ item.product.title }}</td>
                    <td>
                      <div class="">
                        <button
                          :disabled="shopingCart.id === item.id"
                          @click="(item.qty -= 1), checkQty(item)"
                          class="btn btn-xs align-top"
                        >
                          -
                        </button>
                        <input
                          @change="checkQty(item)"
                          v-model="item.qty"
                          type="number"
                          class="input input-bordered input-primary w-14 h-6"
                        /><button
                          @click="(item.qty += 1), checkQty(item)"
                          class="btn btn-xs align-top"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{{ item.product.price }}</td>
                    <td>{{ item.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="divider"></div>
            <h3 class="text-end align-top text-xl">
              總計:{{ shopingCart.total }}
            </h3>
            <div class="card-actions">
              <router-link
                :to="{ name: 'checkout' }"
                class="btn btn-primary btn-block text-xl"
                >前往結帳</router-link
              >
            </div>
          </div>
          <div v-else class="card-body bg-slate-50 h-32 w-40 flex items-center">
            <h2 class="text-lg text-neutral-600">您還未選購商品</h2>
            <router-link :to="{ name: 'productlist' }" class="btn m-3"
              >來去逛逛唄</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserProductsStores } from '../stores/UserProductsStores';
import { storeToRefs } from 'pinia';
const userProductsStroes = useUserProductsStores();
const { shopingCart, isLoading } = storeToRefs(userProductsStroes);
const { getShopingCart, deleteCart, checkQty } = userProductsStroes;
getShopingCart();
const navbarRef = ref(null);
onMounted(() => {
  const navbar = navbarRef.value;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
      navbar.classList.add('scroll-down');
    } else {
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-down-removed');
    }
  });
});
</script>

<style>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.scroll-down {
  transition: all 0.5s ease-in;
  background-color: rgb(243, 244, 246);
  opacity: 0.9;
  position: fixed;
  top: 0;
  z-index: 90;
  /* transform: scale(0.95); */
}
.scroll-down-removed {
  transition: all 0.3s ease-in;
}
.underline-transition {
  position: relative;
  display: inline-block;
}

.underline-transition::after {
  font-size: 20px;
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 2px;
  border-bottom-right-radius: 10px;
  border-bottom: 4px solid #a4a2a2;
  border-radius: 4px;
  /* background-color: #000; */
  transition: width 0.3s ease-in, left 0.3s ease-in;
}

.underline-transition:hover::after {
  width: 100%;
  left: 0;
}
</style>
