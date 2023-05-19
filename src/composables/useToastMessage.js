import { useToast } from 'vue-toastification';
const toast = useToast();
export function toastMessage(res, title) {
  if (res.data.success) {
    if (title) {
      toast.success(`${title}完成`);
    }
    return;
  } else {
    const content = res.data.message;
    toast.error(`${title}失敗 , ${content}`);
  }
  return {
    toastMessage,
  };
}
