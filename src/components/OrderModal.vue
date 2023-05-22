<template lang="">
  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="order-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <div class="flex flex-row">
        <div class="basis-2/5">
          <h3 class="font-bold text-2xl mb-3">用戶資料</h3>
          <table class="table table-compact">
            <tbody>
              <tr>
                <th>姓名</th>
                <td>{{ tempOrder.user?.name }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ tempOrder.user?.email }}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>{{ tempOrder.user?.tel }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ tempOrder.user?.address }}</td>
              </tr>
            </tbody>
          </table>
          <h3 class="font-bold text-2xl my-3">訂單資訊</h3>
          <table class="table table-compact">
            <tbody>
              <tr>
                <th>訂單編號</th>
                <td>{{ tempOrder?.id }}</td>
              </tr>
              <tr>
                <th>下單時間</th>
                <td>{{ TimeDate(tempOrder?.create_at) }}</td>
              </tr>

              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="tempOrder.is_paid" class="text-emerald-600">
                    已付款</span
                  >
                  <span v-else class="text-red-500"> 尚未付款</span>
                </td>
              </tr>
              <tr v-if="tempOrder.paid_date">
                <th>付款時間</th>
                <td>
                  <span> {{ TimeDate(tempOrder?.paid_date) }}</span>
                </td>
              </tr>
              <tr>
                <th>總金額</th>
                <td>NT$ {{ Math.round(tempOrder?.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="basis-3/5 overflow-auto">
          <h3 class="font-bold text-2xl mb-3">選購商品</h3>
          <table class="table w-full">
            <tr v-for="item in tempOrder.products" :key="item.id">
              <th>{{ item.product.title }}</th>
              <td>
                {{ item.qty }} {{ item.product.unit }} / {{ item.total }}元
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="modal-action">
        <label for="order-modal" class="btn">關閉</label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { changeDate } from '../composables/useDateChange';
import { storeToRefs } from 'pinia';
import { useOrderStores } from '@/stores/OrderStores';
const { TimeDate } = changeDate();
const orderStores = useOrderStores();
const { tempOrder } = storeToRefs(orderStores);
</script>
<style lang=""></style>
