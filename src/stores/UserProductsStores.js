import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { cartToast } from '../composables/useCartToast.js';
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
      console.log(res);
      product.value = res.data.product;
    });
  };
  //取得商品列表
  const products = ref({});
  const getProducts = () => {
    isLoading.value = true;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/products/all`;
    axios.get(api).then((res) => {
      isLoading.value = false;
      products.value = res.data.products;
    });
  };
  //加入購物車
  const addShopingCart = (item) => {
    status.value.loadingItem = item.id;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/cart`;
    axios.post(api, { data: { product_id: item.id, qty: 1 } }).then((res) => {
      cartToast(res, `【${item.title}】`, '成功加入購物車');
      status.value.loadingItem = '';
      getShopingCart();
    });
  };
  //獲得購物車資訊
  const shopingCart = ref({});
  const getShopingCart = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/cart`;
    axios.get(api).then((res) => {
      shopingCart.value = res.data.data;
      console.log(shopingCart.value);
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
      getShopingCart();
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
        .then((res) => {
          console.log(res);
          isLoading.value = false;
          getShopingCart();
        });
    } else {
      item.qty = 1;
      axios
        .put(api, { data: { product_id: item.id, qty: item.qty } })
        .then((res) => {
          console.log(res);
          isLoading.value = false;
          getShopingCart();
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
      cartToast(res, ` ${msg}`, '');
      shopingCart.value.final_total = res.data.data.final_total;
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
        shopingCart.value = { length: 0 };
      } else {
        cartToast(res, ` ${res.data.message}`, '');
      }
    });
  };

  //取得單筆訂單
  const getOrder = (id) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/order/${id}`;
    axios.get(api).then((res) => {
      console.log(res);
      singleOrder.value = res.data.order;
    });
  };

  //結帳
  const paying = (id) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/pay/${id}`;
    axios.post(api).then((res) => {
      console.log(res);
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
    shopingCart,
    addShopingCart,
    status,
    getShopingCart,
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
  };
});
