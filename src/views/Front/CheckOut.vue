<template lang="" class="h-full">
  <div class="lg:h-52 h-24 md:h-36 flex justify-center items-center">
    <ul class="steps">
      <li class="step step-primary">填寫訂單</li>
      <li class="step">確認資料及付款</li>
      <li class="step">訂單完成</li>
    </ul>
  </div>
  <div class="divider"></div>
  <div
    v-if="shopingCart.carts?.length"
    class="container mx-auto grid grid-cols-1 lg:grid-cols-12"
  >
    <div class="mx-3 col-span-1 lg:col-start-2 lg:col-span-6">
      <table class="table table-compact md:table w-full lg:w-full">
        <thead>
          <tr>
            <th></th>
            <th></th>

            <th>品名</th>
            <th>數量</th>
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
                  class="h-6 lg:w-6"
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
            <td>
              <img
                class="w-0 md:w-1/2 lg:w-full xl:h-24"
                :src="item.product.imageUrl"
                alt=""
              />
            </td>

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
      <div class="divider"></div>
      <div class="grid md:flex justify-between">
        <form @submit.prevent="useCoupon" class="text-xl">
          折價券
          <input
            v-model="couponCode"
            class="text-center input input-bordered md:input-sm input-sm text-lg"
            placeholder="請輸入優惠碼"
            type="text"
          />
          <button class="mx-1 btn btn-sm align-top">套用</button>
        </form>
        <div
          v-if="shopingCart.final_total === shopingCart.total"
          class="text-xl"
        >
          總金額 : {{ shopingCart.total }}
        </div>
        <div
          v-else
          class="flex justify-between text-xl mt-5 md:mt-0 md:grid md:justify-end"
        >
          <span>折扣 : {{ Math.round(discount) }}%</span>
          <span>總計 : NT${{ Math.round(shopingCart.final_total) }}</span>
        </div>
      </div>
    </div>

    <div
      class="mt-10 lg:mt-0 col-span-1 lg:col-span-4 bg-gray-50 p-6 rounded-lg"
    >
      <div class="mt-4 flex justify-center text-3xl">
        <h2>填寫購物資訊</h2>
      </div>
      <div class="divider"></div>
      <Form @submit="addOrder">
        <div>
          <label for="email">Email<span class="text-red-600"> *</span></label>
          <Field
            name="email"
            v-model="order.email"
            class="block input input-md my-2 w-full"
            type="text"
            id="email"
            rules="email|required"
          />
          <ErrorMessage name="email" class="text-red-500"></ErrorMessage>
        </div>
        <div class="my-3">
          <label for="name"
            >Name<span class="text-red-600 my-3"> *</span></label
          >
          <Field
            v-model="order.name"
            name="Name"
            class="block input input-md my-3 w-full"
            type="text"
            id="name"
            rules="required"
          />
          <ErrorMessage name="Name" class="text-red-500"></ErrorMessage>
        </div>
        <div class="my-3">
          <label for="phone">Phone<span class="text-red-600"> *</span></label>
          <Field
            name="Phone"
            v-model="order.tel"
            class="block input input-md my-3 w-full"
            type="text"
            id="phone"
            rules="required"
          /><ErrorMessage name="Phone" class="text-red-500"></ErrorMessage>
        </div>
        <div class="my-3">
          <label for="address"
            >Address<span class="text-red-600"> *</span></label
          >
          <Field
            name="Address"
            v-model="order.address"
            class="block input input-md my-3 w-full"
            type="text"
            id="address"
            rules="required"
          />
          <ErrorMessage name="Address" class="text-red-500"></ErrorMessage>
        </div>
        <div class="my-3">
          <h3>付款方式<span class="text-red-600"> *</span></h3>
          <Field
            id="paying"
            name="付款方式"
            as="select"
            class="select w-full my-3"
            v-model="order.paying"
            rules="required"
          >
            <option value="到店付款">到店付款</option>
            <option value="ApplePay">ApplePay</option>
            <option value="LinePay">LinePay</option>
          </Field>
          <ErrorMessage name="付款方式" class="text-red-500"></ErrorMessage>
        </div>
        <div class="my-3">
          <label for="message">留言</label>
          <textarea
            v-model="order.message"
            id="message"
            class="textarea block w-full my-3 h-32 resize-none"
            placeholder="有什麼要對我們說"
          ></textarea>
        </div>
        <div>
          <button class="mt-3 btn w-full">前往結帳</button>
        </div>
      </Form>
    </div>
  </div>
  <div v-else class="bg-gray-50 h-80 flex flex-col justify-center items-center">
    <div class="">
      <h2 class="m-3 text-3xl">購物車目前尚無商品</h2>
    </div>

    <div class="">
      <button class="btn m-3" @click="goUserProduct">來去逛逛唄</button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserProductsStores } from '../../stores/UserProductsStores';
const userProductsStroes = useUserProductsStores();
const { getShopingCart, checkQty, deleteCart, useCoupon, addOrder } =
  userProductsStroes;
const { shopingCart, couponCode, order } = storeToRefs(userProductsStroes);
const router = useRouter();
const goUserProduct = () => {
  router.push({ name: 'productlist' });
};

getShopingCart();
const discount = computed(() => {
  return (1 - shopingCart.value.final_total / shopingCart.value.total) * 100;
});
</script>
<style lang=""></style>
