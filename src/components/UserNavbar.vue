<template lang="">
  <loading-overlay :active="isLoading"></loading-overlay>
  <div ref="navbarRef" class="w-full fixed top-0 z-50 h-20 navbar rounded-b-xl">
    <div class="flex-1 mx-5">
      <router-link :to="{ name: 'homeview' }">
        <img class="h-12" src="../assets/thisballLogo_preview_rev_1.png" alt=""
      /></router-link>
    </div>
    <div>
      <ul class="hidden md:flex">
        <li>
          <router-link
            :to="{ name: 'aboutview' }"
            class="underline-transition mx-5 font-mono font-bold hover:scale-105 duration-300"
            ><div>我們的那些</div>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'articlelistview' }"
            class="underline-transition mx-5 font-mono font-bold hover:scale-105 duration-300"
            >關於那些事</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'productlist' }"
            class="underline-transition mx-5 font-mono font-bold hover:scale-105 duration-300"
            >那些食物</router-link
          >
        </li>
      </ul>
      <!-- 小視窗漢堡 -->
      <div class="md:hidden">
        <transition name="slide-down">
          <div
            v-if="showDropdown"
            class="h-40 fixed w-2/5 sm:w-2/6 right-10 top-20 bg-gray-200 rounded-b-xl duration-200"
          >
            <ul class="flex h-full flex-col justify-around text-lg">
              <li class="">
                <router-link
                  :to="{ name: 'aboutview' }"
                  class="underline-transition mx-5 font-mono font-bold hover:scale-105 duration-300"
                  ><div>我們的那些</div>
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'articlelistview' }"
                  class="underline-transition mx-5 font-mono font-bold hover:scale-105 duration-300"
                  >關於那些事</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'productlist' }"
                  class="underline-transition mx-5 font-mono font-bold hover:scale-105 duration-300"
                  >那些食物</router-link
                >
              </li>
            </ul>
          </div>
        </transition>
        <div>
          <label
            @click="toggleDropdown"
            class="btn btn-circle bg-transparent border-transparent"
          >
            <!-- hamburger icon -->
            <svg
              v-if="showDropdown"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon
                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path
                d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
              />
            </svg>
          </label>
        </div>
      </div>

      <div class="dropdown dropdown-end mx-5">
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
              NT${{ shopingCart.total }}
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
  <transition name="toTop">
    <div
      @click="toTop"
      ref="toTopRef"
      class="h-16 w-16 bg-gray-100 fixed bottom-28 right-0 scale-0 opacity-0 cursor-pointer"
    >
      <svg
        class="h-10 w-10 text-gray-400 absolute right-3 top-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="12" y1="4" x2="12" y2="14" />
        <line x1="12" y1="4" x2="16" y2="8" />
        <line x1="12" y1="4" x2="8" y2="8" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg></div
  ></transition>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserProductsStores } from '../stores/UserProductsStores';
import { storeToRefs } from 'pinia';
const userProductsStroes = useUserProductsStores();
const { shopingCart, isLoading } = storeToRefs(userProductsStroes);
const { getShopingCart, deleteCart, checkQty } = userProductsStroes;
getShopingCart();

//顯示toTop圖標
const toTopRef = ref(null);
onMounted(() => {
  const toTop = toTopRef.value;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 10) {
      toTop.classList.add('toTop-transition');
    } else {
      toTop.classList.remove('toTop-transition');
      toTop.classList.add('toTop-removed');
    }
  });
});
//到頁面最上層點擊事件
const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
//漢堡點擊效果
const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

//navbar效果
const navbarRef = ref(null);
onMounted(() => {
  const navbar = navbarRef.value;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
      navbar.classList.add('scroll-down', 'shadow-lg');
    } else {
      navbar.classList.remove('scroll-down', 'shadow-lg');
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
  transform-origin: top;

  transition: all 0.4s ease-in-out;
  background-color: rgb(209, 213, 219);
  opacity: 0.9;
  position: fixed;
  top: 0;

  z-index: 90;
}
.scroll-down-removed {
  transition: all 0.4s ease-in-out;
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
  transition: width 0.25s ease-in, left 0.25s ease-in;
}

.underline-transition:hover::after {
  width: 100%;
  left: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
}
.toTop-transition {
  transition: all 0.4s ease-in-out;
  transform: translateX(-1rem);
  opacity: 1;
  border: 1px solid transparent;
  border-radius: 50%;
}
.toTop-removed {
  transition: all 0.4s ease-in-out;
}
</style>
