<template lang="">
  <input type="checkbox" id="articleModal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <header
        class="h-16 bg-gray-200 flex justify-center text-3xl items-center"
      >
        新增文章
      </header>
      <div class="divider"></div>
      <div class="form-control flex">
        <label class="text-2xl flex justify-between" for="title"
          ><span>標題</span>
          <span class="text-end text-sm">{{
            date(tempArticle.create_at)
          }}</span>
        </label>
      </div>
      <div>
        <input
          id="title"
          class="input input-bordered w-full my-3"
          type="text"
          v-model="tempArticle.title"
          placeholder="請輸入文章標題"
        />
      </div>
      <div class="grid gap-4 grid-cols-3">
        <div class="col-span-1">
          <div class="mb-3">
            <label for="image" class="">輸入圖片網址</label>
            <div>
              <input
                v-model="tempArticle.image"
                type="text"
                class="input input-bordered w-full max-w-xs my-3"
                id="image"
                placeholder="請輸入圖片連結"
              />
            </div>
          </div>
          <div class="mb-3">
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
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
              <label for="author">作者</label>
              <div>
                <input
                  id="author"
                  v-model="tempArticle.author"
                  type="text"
                  class="input input-bordered w-full max-w-xs mt-1"
                  placeholder="文章作者"
                />
              </div>
            </div>
            <div class="flex col-span-1 gap-2 items-center justify-center">
              <input
                v-model="tempArticle.isPublic"
                class="checkbox"
                type="checkbox"
                :true-value="true"
                :false-value="false"
                id="isPublic"
              /><label for="isPublic" class="text-lg"> 是否公開 </label>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <textarea
            v-model="tempArticle.content"
            id="content"
            class="textarea textarea-bordered mt-2 w-full h-full"
            placeholder="請輸入文章內容"
          ></textarea>
        </div>
      </div>

      <div class="modal-action">
        <label for="articleModal" @click="addArticle" class="btn">確定</label>
        <label for="articleModal" @click="tempArticle = {}" class="btn"
          >取消</label
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { date } from '../composables/useDateChange';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useArticleStores } from '../stores/ArticleStores.js';
const ArticleStores = useArticleStores();
const { tempArticle } = storeToRefs(ArticleStores);
const { addArticle } = ArticleStores;
const fileInput = ref(null);
//上傳圖片並轉API為網址
const uploadFile = () => {
  console.log(fileInput.value.files[0]);
  const uploadFile = fileInput.value.files[0];
  const formData = new FormData();
  formData.append('ile-to-upload', uploadFile);
  const api = `${import.meta.env.VITE_API}api/${
    import.meta.env.VITE_PATH
  }/admin/upload`;
  axios.post(api, formData).then((res) => {
    console.log(res);
    if (res.data.success) {
      tempArticle.value.image = res.data.imageUrl;
    }
  });
};
</script>
<style lang=""></style>
