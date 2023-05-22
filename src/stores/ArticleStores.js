import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { toastMessage } from '../composables/useToastMessage';
export const useArticleStores = defineStore('ArticleStores', () => {
  const article = ref({
    title: '',
    create_at: Math.floor(Date.now() / 1000),
    author: '',
    isPublic: true,
    content: '',
    image: '',
  });
  //管理者單筆文章
  const tempArticle = ref({
    create_at: Math.floor(Date.now() / 1000),
    isPublic: true,
  });
  //user端單筆文章
  const userTempArticle = ref({});
  const articleList = ref({}); //管理者文章列表
  const UserArticleList = ref({}); //user端文章列表
  const isAdd = ref(false); //新增OR編輯

  //新增或編輯文章
  const addArticle = (item) => {
    console.log(item.id);
    if (item.id) {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/article/${item.id}`;
      axios.put(api, { data: { ...item } }).then((res) => {
        console.log(res);
        getArticleList();
      });
    } else {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/article`;
      axios.post(api, { data: { ...tempArticle.value } }).then((res) => {
        console.log(res);
        getArticleList();
      });
    }
  };
  //獲取文章列表
  const getArticleList = (page = 1) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/articles?page=${page}`;
    axios.get(api).then((res) => {
      console.log(res);
      articleList.value = res.data.articles;
    });
  };
  //取得User端文章列表
  const getUserArticleList = (page = 1) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/articles?page=${page}`;
    axios.get(api).then((res) => {
      console.log(res);
      UserArticleList.value = res.data.articles;
    });
  };
  //獲取單筆文章
  const getArticle = (id) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/article/${id}`;
    axios.get(api).then((res) => {
      tempArticle.value.content = res.data.article.content;
      console.log(res);
    });
  };
  //獲取Uesr端單筆文章
  const getUserArticle = (id) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/article/${id}`;
    axios.get(api).then((res) => {
      userTempArticle.value = res.data.article;
      console.log(res);
    });
  };
  //刪除文章
  const deleteArticle = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/article/${tempArticle.value.id}`;
    axios.delete(api).then((res) => {
      toastMessage(res, `文章【${tempArticle.value.title}】刪除成功`, '');
      console.log(res);
      getArticleList();
    });
  };
  const getItem = (item) => {
    tempArticle.value = { ...item };
    getArticle(item.id);
  };
  return {
    article,
    addArticle,
    getArticleList,
    articleList,
    tempArticle,
    getItem,
    isAdd,
    getArticle,
    deleteArticle,
    getUserArticleList,
    UserArticleList,
    getUserArticle,
    userTempArticle,
  };
});
