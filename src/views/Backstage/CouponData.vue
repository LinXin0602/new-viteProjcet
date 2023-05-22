<template lang="">
  <loading-overlay :active="isLoading">
    <div class="loadingio-spinner-ball-l30nz6iyhu9">
      <div class="ldio-hnk0xi4nyc8">
        <div></div>
      </div></div
  ></loading-overlay>
  <div class="text-end">
    <label class="btn m-3" for="CouponModal" @click="isAdd = true"
      >建立新的優惠券</label
    >
  </div>

  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th width="120">名稱</th>
          <th width="120">優惠碼</th>
          <th width="120">折扣後百分比</th>
          <th width="120">到期日</th>
          <th width="100">是否啟用</th>
          <th class="w-3">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <th>{{ item.title }}</th>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ DayDate(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-red-500"> 未啟用</span>
          </td>

          <td>
            <label
              for="CouponModal"
              @click="getItem(item), (isAdd = false)"
              class="btn btn-sm btn-outline btn-primary mx-2"
            >
              編輯
            </label>
            <label
              for="deleteModal"
              @click="getItem(item)"
              class="btn btn-sm btn-outline btn-error"
            >
              刪除
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CouponModal />
  <DeleteModal />
</template>
<script setup>
import DeleteModal from '@/components/DeleteModal.vue';
import CouponModal from '@/components/CouponModal.vue';
import { changeDate } from '@/composables/useDateChange.js';
import { storeToRefs } from 'pinia';
import { useCouponStores } from '@/stores/CouponStores.js';
const { DayDate } = changeDate();
const couponStores = useCouponStores();
const { getCoupons, getItem } = couponStores;
const { coupons, isAdd, isLoading } = storeToRefs(couponStores);
getCoupons();
</script>
<style lang=""></style>
