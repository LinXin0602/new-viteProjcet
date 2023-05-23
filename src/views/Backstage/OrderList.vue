<template lang="">
  <loading-overlay :active="isLoading">
    <div class="loadingio-spinner-ball-l30nz6iyhu9">
      <div class="ldio-hnk0xi4nyc8">
        <div></div>
      </div></div
  ></loading-overlay>
  <div class="overflow-x-auto">
    <table class="table w-full mt-5">
      <!-- head -->
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th width="120">訂購人</th>
          <th width="120">Email</th>
          <th width="120">購買款項</th>
          <th width="100">應付金額</th>
          <th class="w-3">是否付款</th>
          <th class="w-3">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ TimeDate(item.create_at) }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul>
              <li v-for="(product, i) in item.products" :key="i">
                【 {{ product.product.title }}】： {{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>NT $ {{ Math.round(item.total) }}</td>
          <td>
            <input
              :id="`paidSwitch${item.id}`"
              v-model="item.is_paid"
              type="checkbox"
              class="checkbox"
              disabled
              checked
            />
            <label class="align-top mx-1" :for="`paidSwitch${item.id}`">
              <span v-if="item.is_paid" class="text-success font-semibold"
                >已付款</span
              >
              <span v-else class="text-red-400 font-semibold">未付款</span>
            </label>
          </td>

          <td>
            <label
              @click="getItem(item)"
              for="order-modal"
              class="btn btn-sm btn-outline btn-primary mx-2"
            >
              檢視
            </label>
            <label
              @click="getItem(item)"
              for="deleteModal"
              class="btn btn-sm btn-outline btn-error"
            >
              刪除
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <OrderModal />
  <DeleteModal />
</template>
<script setup>
import { changeDate } from '@/composables/useDateChange.js';
import OrderModal from '@/components/OrderModal.vue';
import DeleteModal from '../../components/DeleteModal.vue';
import { useOrderStores } from '@/stores/OrderStores.js';
import { storeToRefs } from 'pinia';
const { TimeDate } = changeDate();
const orderStores = useOrderStores();
const { getOrder, getItem } = orderStores;
const { orders, isLoading } = storeToRefs(orderStores);
getOrder();
</script>
<style lang=""></style>
