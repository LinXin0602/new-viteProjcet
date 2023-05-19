<template lang="">
  <div>
    <input type="checkbox" id="CouponModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <div
          class="h-14 bg-gray-200 text-slate-500 flex justify-center text-2xl items-center"
        >
          <h3 v-if="isAdd">新增優惠券</h3>
          <h3 v-else>編輯優惠券</h3>
        </div>
        <div class="divider"></div>
        <div class="flex flex-row">
          <div class="w-full">
            <div class="mb-3">
              <label for="title" class="">標題</label>
              <div class="m-2">
                <input
                  type="text"
                  v-model="tempCoupon.title"
                  class="input input-bordered w-full max-w-xxl"
                  id="title"
                  placeholder="請輸入標題"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="coupon_code" class="">優惠碼</label>
              <div class="m-2">
                <input
                  v-model="tempCoupon.code"
                  type="text"
                  class="input input-bordered w-full max-w-xxl"
                  id="coupon_code"
                  placeholder="請輸入優惠碼"
                />
              </div>
            </div>
            <div class="flex flex-row m-2">
              <div class="basis-1/2 mr-2">
                <label for="due_date">到期日</label>
                <div>
                  <input
                    v-model="due_date"
                    type="date"
                    class="input input-bordered w-full max-w-xl"
                    id="due_date"
                  />
                </div>
              </div>
              <div class="basis-1/2">
                <label for="percent" class="">折扣後百分比</label>
                <div>
                  <input
                    v-model.number="tempCoupon.percent"
                    type="text"
                    class="input input-bordered w-full max-w-xl"
                    id="percent"
                    placeholder="請輸入折扣百分比"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="m-2">
          <input
            v-model="tempCoupon.is_enabled"
            class="checkbox"
            type="checkbox"
            :true-value="1"
            :false-value="0"
            id="is_enabled"
          />
          <label for="is_enabled" class="text-xl"> 是否啟用 </label>
        </div>

        <div class="modal-action">
          <label @click="updateCoupon" for="CouponModal" class="btn"
            >確定</label
          >
          <label for="CouponModal" @click="tempCoupon = {}" class="btn"
            >取消</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCouponStores } from '../stores/CouponStores.js';

const couponStores = useCouponStores();
const { updateCoupon } = couponStores;
const { tempCoupon, due_date, isAdd } = storeToRefs(couponStores);

//轉換日期格式
watch(due_date, (newData) => {
  tempCoupon.value.due_date = Math.floor(new Date(newData) / 1000);
});
</script>
<style lang=""></style>
