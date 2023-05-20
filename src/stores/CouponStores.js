import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { toastMessage } from '../composables/useToastMessage';
export const useCouponStores = defineStore('CouponStores', () => {
  const coupons = ref({}); //優惠券資料
  const pagination = ref({}); //頁數
  const tempCoupon = ref({
    //單筆資料
    is_enabled: 1,
  });
  const due_date = ref(''); // 時間
  const isAdd = ref(false); //新增OR編輯
  const isLoading = ref(false); //loading動畫

  //獲取優惠券列表
  const getCoupons = (page = 1) => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/coupons?page=${page}`;
    axios.get(api).then((res) => {
      console.log(res);
      coupons.value = res.data.coupons;
      pagination.value = res.data.pagination;
      isLoading.value = false;
    });
  };
  //更新優惠券
  const updateCoupon = () => {
    let api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/coupon`;
    if (tempCoupon.value.id) {
      api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/coupon/${tempCoupon.value.id}`;
      axios.put(api, { data: tempCoupon.value }).then((res) => {
        toastMessage(res, `優惠券【${tempCoupon.value.title}】更新成功`, '');
        tempCoupon.value = { is_enabled: 1 };
        due_date.value = '';
        getCoupons();
      });
    } else {
      axios.post(api, { data: tempCoupon.value }).then((res) => {
        toastMessage(res, '優惠券新增成功', '');
        tempCoupon.value = { is_enabled: 1 };
        due_date.value = '';
        getCoupons();
      });
    }
  };
  const dealeteCoupon = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/coupon/${tempCoupon.value.id}`;
    axios.delete(api).then((res) => {
      toastMessage(res, `優惠券【${tempCoupon.value.title}】刪除成功`, '');
      tempCoupon.value = { is_enabled: 1 };
      getCoupons();
    });
  };
  const getItem = (item) => {
    tempCoupon.value = { ...item };
  };

  return {
    getCoupons,
    tempCoupon,
    coupons,
    updateCoupon,
    dealeteCoupon,
    due_date,
    isAdd,
    isLoading,
    getItem,
  };
});
