<template lang="">
  <div class="lg:h-52 h-24 md:h-36 flex justify-center items-center">
    <ul class="steps">
      <li class="step step-primary">填寫訂單</li>
      <li class="step step-primary">確認資料及付款</li>
      <li class="step">訂單完成</li>
    </ul>
  </div>
  <div class="divider"></div>
  <div class="container mx-auto justify-center flex flex-row">
    <div
      class="mx-3 p-6 basis-4/5 lg:basis-2/3 xl:basis-1/2 rounded-lg bg-gray-100"
    >
      <div class="h-12 text-3xl flex justify-center items-center">
        <h2>訂單資訊</h2>
      </div>
      <div class="divider"></div>
      <div class="collapse">
        <input type="checkbox" class="peer" />
        <div
          class="flex justify-center collapse-title text-primary-content peer-checked:bg-gray-300 text-xl border border-gray-500 mb-2"
        >
          訂購商品
        </div>

        <div
          class="collapse-content text-primary-content peer-checked:text-secondary-content peer-checked:bg-gray-200 mb-3"
        >
          <ul v-for="item in singleOrder.products" :key="item.id">
            <li class="mt-3 flex justify-between items-center">
              <img
                class="h-10 sm:h-20 lg:h-28 image-full"
                :src="item.product?.imageUrl"
                alt=""
              />
              <div class="flex flex-col">
                <h5>{{ item.product?.title }} x {{ item.qty }}</h5>
              </div>
              <div>
                <p></p>
                <p>NT$ {{ Math.round(item.final_total) }}</p>
              </div>
            </li>
            <div class="divider"></div>
          </ul>
        </div>
      </div>
      <table class="table w-full table-compact">
        <tbody>
          <tr>
            <th>訂單編號</th>
            <td>
              <div class="flex justify-between text-xs md:text-lg">
                <p>{{ singleOrder.id }}</p>
                <button @click="copyOrderid">
                  <font-awesome-icon
                    icon="fa-solid fa-copy"
                    class="ml-3 hover:text-gray-400 text-gray-600 text-xl"
                  />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th>訂單成立時間</th>
            <td>{{ TimeDate(singleOrder.create_at) }}</td>
          </tr>
          <tr>
            <th>付款方式</th>
            <td>{{ singleOrder.user?.paying }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ singleOrder.user?.name }}</td>
          </tr>
          <tr>
            <th>電話</th>
            <td>{{ singleOrder.user?.tel }}</td>
          </tr>
          <tr>
            <th>信箱</th>
            <td>{{ singleOrder.user?.email }}</td>
          </tr>
          <tr>
            <th>收件地址</th>
            <td>{{ singleOrder.user?.address }}</td>
          </tr>
          <tr>
            <th>備註</th>
            <td>{{ singleOrder.user?.message }}</td>
          </tr>
          <tr>
            <th>訂單金額</th>
            <td>NT$ {{ Math.round(singleOrder?.total) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex mt-4 justify-end">
        <button class="btn text-lg" @click="paying(singleOrder.id)">
          確定付款
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { changeDate } from '../../composables/useDateChange';
import { storeToRefs } from 'pinia';
import { useUserProductsStores } from '../../stores/UserProductsStores';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
const toast = useToast();
const route = useRoute();
const orderId = route.params.id;
const userProductsStroes = useUserProductsStores();
const { singleOrder } = storeToRefs(userProductsStroes);
const { getOrder, paying } = userProductsStroes;
const { TimeDate } = changeDate();
const copyOrderid = () => {
  toast.info(`已複製訂單 ${singleOrder.value.id} `);
  navigator.clipboard.writeText(singleOrder.value.id);
};
getOrder(orderId);
</script>
<style lang=""></style>
