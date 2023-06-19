import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

import { toastMessage } from '@/composables/useToastMessage.js';
export const useProductsStores = defineStore('productsStores', () => {
  const products = ref({}); //產品資訊
  const tempProduct = ref({}); //單筆產品資訊
  const isLoading = ref(false); //讀取動畫
  const pagination = ref({}); //分頁資訊
  const isAdd = ref(false); //新增or編輯 title顯示

  //獲得產品資訊
  const getProduct = (page) => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/products?page=${page}`;
    axios.get(api).then((res) => {
      products.value = res.data.products;
      pagination.value = res.data.pagination;
      isLoading.value = false;
    });
  };
  //新增或編輯產品
  const updateItem = () => {
    let api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/product`;
    if (tempProduct.value.id) {
      api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/product/${tempProduct.value.id}`;
      axios.put(api, { data: tempProduct.value }).then((res) => {
        toastMessage(res, `產品【${tempProduct.value.title}】更新成功`, '');
        tempProduct.value = {};
        getProduct();
      });
    } else {
      axios.post(api, { data: tempProduct.value }).then((res) => {
        toastMessage(res, '產品新增成功', '');
        tempProduct.value = {};
        getProduct();
      });
    }
  };
  //刪除對應ID產品資訊
  const dealeteItem = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/product/${tempProduct.value.id}`;

    axios.delete(api).then((res) => {
      toastMessage(res, `產品【${tempProduct.value.title}】刪除`, '完成');
      tempProduct.value = {};
      getProduct();
    });
  };
  return {
    products,
    getProduct,
    tempProduct,
    updateItem,
    dealeteItem,
    isLoading,
    pagination,
    isAdd,
  };
});
