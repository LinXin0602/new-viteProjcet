import { useToast } from 'vue-toastification';
const toast = useToast();
export function cartToast(res, title, msg) {
  if (res.data.success) {
    if (title) {
      toast.success(`${title}${msg}`);
    }
    return;
  } else {
    const content = res.data.message;
    toast.error(`${title}失敗 , ${content}`);
  }
  return {
    cartToast,
  };
}
