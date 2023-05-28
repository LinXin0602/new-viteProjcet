import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export const useMyFavoriteStores = defineStore('myFavoriteStores', () => {
  const toast = useToast();

  //加入到我的最愛
  const favoriteItems = ref([]);
  const addFavorite = (item) => {
    if (favoriteItems.value.includes(item.id)) {
      favoriteItems.value.splice(favoriteItems.value.indexOf(item.id), 1);
      console.log(item);
      toast.warning(`成功將【${item.title}】移除最愛`);
    } else {
      favoriteItems.value.push(item.id);
      toast.success(`成功將【${item.title}】加入最愛`);
    }
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems.value));
  };

  //獲得LocalStorage
  const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('favoriteItems'));
  };

  return {
    addFavorite,
    getLocalStorage,
    favoriteItems,
  };
});
