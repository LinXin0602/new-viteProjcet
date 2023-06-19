import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toastMessage } from '@/composables/useToastMessage.js';

import { useRouter } from 'vue-router';
export const useUserProductsStores = defineStore('userProductsStores', () => {
  const router = useRouter();
  const status = ref({
    loadingItem: '',
  });
  const isLoading = ref(false);
  const couponCode = ref('');
  const order = ref({
    name: '',
    email: '',
    tel: '',
    address: '',
    message: '',
    paying: '',
  });
  const singleOrder = ref({});

  //取得單一商品
  const product = ref({});
  const getProduct = (id) => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/product/${id}`;
    axios.get(api).then((res) => {
      isLoading.value = false;
      product.value = res.data.product;
    });
  };
  //取得商品列表
  const productStyle = ref('');
  const filteredProducts = ref([]);
  const products = ref([]);
  const getProducts = () => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/products/all`;
    axios.get(api).then((res) => {
      isLoading.value = false;
      products.value = res.data.products;
      filteredProducts.value = [];
      products.value.forEach((item) => {
        if (item.category === productStyle.value) {
          filteredProducts.value.push(item);
        } else if (productStyle.value === '') {
          filteredProducts.value.push(item);
        }
      });
    });
  };
  //加入購物車
  const addShoppingCart = (item, qty = 1) => {
    status.value.loadingItem = item.id;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/cart`;
    axios.post(api, { data: { product_id: item.id, qty: qty } }).then((res) => {
      toastMessage(res, `【${item.title}】`, '成功加入購物車');
      status.value.loadingItem = '';
      getShoppingCart();
    });
  };
  //獲得購物車資訊
  const shoppingCart = ref({});
  const getShoppingCart = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/cart`;
    axios.get(api).then((res) => {
      shoppingCart.value = res.data.data;
    });
  };
  //刪除購物車內容
  const deleteCart = (id) => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/cart/${id}`;
    axios.delete(api).then(() => {
      isLoading.value = false;
      getShoppingCart();
    });
  };
  //變更商品數量
  const checkQty = (item) => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/cart/${item.id}`;
    if (item.qty > 0) {
      axios
        .put(api, { data: { product_id: item.id, qty: item.qty } })
        .then(() => {
          isLoading.value = false;
          getShoppingCart();
        });
    } else {
      item.qty = 1;
      axios
        .put(api, { data: { product_id: item.id, qty: item.qty } })
        .then(() => {
          isLoading.value = false;
          getShoppingCart();
        });

      return;
    }
  };
  //使用優惠券
  const useCoupon = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/coupon`;
    axios.post(api, { data: { code: couponCode.value } }).then((res) => {
      const msg = res.data.message.replace(':', ' ');
      toastMessage(res, ` ${msg}`, '');
      shoppingCart.value.final_total = res.data.data.final_total;
      couponCode.value = '';
    });
  };
  //新增訂單
  const addOrder = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/order`;
    const user = order.value;
    axios.post(api, { data: { user } }).then((res) => {
      const orderid = res.data.orderId;
      if (res.data.success) {
        router.push({ name: 'checkandpaying', params: { id: orderid } });
        order.value = {};
        shoppingCart.value = { length: 0 };
      } else {
        toastMessage(res, ` ${res.data.message}`, '');
      }
    });
  };

  //取得單筆訂單
  const getOrder = (id) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/order/${id}`;
    axios.get(api).then((res) => {
      singleOrder.value = res.data.order;
    });
  };

  //結帳
  const paying = (id) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/pay/${id}`;
    axios.post(api).then((res) => {
      if (res.data.success) {
        router.push({ name: 'checkoutfinish' });
      }
    });
  };
  return {
    products,
    getProducts,
    product,
    getProduct,
    shoppingCart,
    addShoppingCart,
    status,
    getShoppingCart,
    isLoading,
    deleteCart,
    checkQty,
    couponCode,
    useCoupon,
    order,
    addOrder,
    getOrder,
    singleOrder,
    paying,
    filteredProducts,
    productStyle,
  };
});
