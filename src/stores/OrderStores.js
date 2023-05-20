import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrderStores = defineStore('OrderStores', () => {
  const orders = ref({});
  const tempOrder = ref({});
  const pagination = ref({});
  const isLoading = ref(false);
  //獲取訂單列表
  const getOrder = (page = 1) => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/orders?page=${page}`;
    axios.get(api).then((res) => {
      console.log(res);
      isLoading.value = false;
      orders.value = res.data.orders;
      pagination.value = res.data.pagination;
    });
  };
  //刪除訂單
  const deleteOrder = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/order/${tempOrder.value.id}`;
    axios.delete(api).then((res) => {
      console.log(res);
      if (res.data.success) {
        getOrder();
      }
    });
  };

  const getItem = (item) => {
    tempOrder.value = { ...item };
  };

  return {
    orders,
    tempOrder,
    getOrder,
    getItem,
    deleteOrder,
    isLoading,
  };
});
