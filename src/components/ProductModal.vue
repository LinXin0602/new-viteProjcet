<template lang="">
  <div>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <div class="bg-gray-200">
          <h1 v-if="isAdd" class="text-center text-2xl text-slate-400">
            新增商品
          </h1>
          <h1 v-else class="text-center text-2xl text-slate-400">編輯商品</h1>
        </div>
        <div class="divider"></div>
        <div class="flex flex-row">
          <div class="basis-2/5">
            <div class="mb-3">
              <label for="image" class="">輸入圖片網址</label>
              <div>
                <input
                  v-model="tempProduct.imageUrl"
                  type="text"
                  class="input input-bordered w-full max-w-xs my-3"
                  id="image"
                  placeholder="請輸入圖片連結"
                />
              </div>
            </div>
            <div class="mb-5">
              <label for="customFile" class="">或 上傳圖片 </label>
              <div class="my-3">
                <input
                  @change="uploadFile"
                  type="file"
                  id="customFile"
                  class="file-input input-bordered w-full max-w-xs"
                  ref="fileInput"
                />
              </div>
            </div>
            <div class="">
              <input
                v-model="tempProduct.is_enabled"
                class="checkbox"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                id="is_enabled"
              />
              <label for="is_enabled" class="text-xl"> 是否啟用 </label>
            </div>
          </div>
          <div class="basis-3/5">
            <div class="mb-3">
              <label for="title" class="">標題</label>
              <div class="m-2">
                <input
                  v-model="tempProduct.title"
                  type="text"
                  class="input input-bordered w-full max-w-xl"
                  id="title"
                  placeholder="請輸入標題"
                />
              </div>
            </div>
            <div class="flex flex-row">
              <div class="mb-3 basis-1/2 mx-2">
                <label for="category" class="">分類</label>
                <div class="mb-3">
                  <input
                    v-model="tempProduct.category"
                    type="text"
                    class="input input-bordered w-full max-w-xl"
                    id="category"
                    placeholder="請輸入分類"
                  />
                </div>
              </div>
              <div class="mb-3 basis-1/2">
                <label for="unit" class="">單位</label>
                <div class="mb-3">
                  <input
                    v-model="tempProduct.unit"
                    type="text"
                    class="input input-bordered w-full max-w-xl"
                    id="unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="basis-1/2 mx-2">
                <label for="origin_price" class="">原價</label>
                <div>
                  <input
                    v-model.number="tempProduct.origin_price"
                    type="text"
                    class="input input-bordered w-full max-w-xl"
                    id="origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
              </div>
              <div class="basis-1/2">
                <label for="price" class="">售價</label>
                <div>
                  <input
                    v-model.number="tempProduct.price"
                    type="text"
                    class="input input-bordered w-full max-w-xl"
                    id="price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="description">產品描述</label>
          <div>
            <textarea
              v-model="tempProduct.description"
              type="text"
              class="textarea textarea-bordered w-full max-w-5xl"
              id="description"
              placeholder="請輸入產品描述"
            ></textarea>
          </div>
        </div>
        <div class="mb-3">
          <label for="content">說明內容</label>
          <div>
            <textarea
              v-model="tempProduct.content"
              type="text"
              class="textarea textarea-bordered w-full max-w-5xl"
              id="content"
              placeholder="請輸入產品說明內容"
            ></textarea>
          </div>
        </div>
        <div class="modal-action">
          <label for="my-modal" class="btn" @click="updateItem">確定</label>
          <label for="my-modal" @click="tempProduct = {}" class="btn"
            >取消</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useProductsStroes } from '@/stores/ProductsStores.js';
import { ref } from 'vue';
import axios from 'axios';
const productsStroe = useProductsStroes();
const { tempProduct, isAdd } = storeToRefs(productsStroe);
const { updateItem } = productsStroe;

const fileInput = ref(null);
const uploadFile = () => {
  const uploadFile = fileInput.value.files[0];
  const formData = new FormData();
  formData.append('file-to-upload', uploadFile);
  const API = `${import.meta.env.VITE_API}api/${
    import.meta.env.VITE_PATH
  }/admin/upload`;
  axios.post(API, formData).then((res) => {
    if (res.data.success) {
      tempProduct.value.imageUrl = res.data.imageUrl;
    }
  });
};
</script>
<style lang=""></style>
