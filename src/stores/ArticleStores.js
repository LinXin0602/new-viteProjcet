import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
export const useArticleStores = defineStore('ArticleStores', () => {
  const article = ref({
    title: '',
    create_at: Math.floor(Date.now() / 1000),
    author: '',
    isPublic: true,
    content: '',
    image: '',
  });
  const tempArticle = ref({
    create_at: Math.floor(Date.now() / 1000),
    isPublic: true,
  });
  const articleList = ref({});
  const isAdd = ref(true);

  const addArticle = () => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/article`;
    axios.post(api, { data: { ...tempArticle.value } }).then((res) => {
      console.log(res);
      getArticleList();
    });
  };

  const getArticleList = (page = 1) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/articles?page=${page}`;
    axios.get(api).then((res) => {
      console.log(res);
      articleList.value = res.data.articles;
    });
  };
  const getArticle = (id) => {
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/admin/article/${id}`;
    axios.get(api).then((res) => {
      tempArticle.value.content = res.data.article.content;
      console.log(res);
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
  };
});
