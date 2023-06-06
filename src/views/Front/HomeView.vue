<template>
  <div class="h-[50vh] md:h-[70vh] relative mx-auto bg-gray-200">
    <div class="w-full absolute h-full bg-transparent/10"></div>
    <img
      class="max-w-full w-full h-full object-cover block object-center"
      src="../../assets/img/封面.jpg"
      alt="封面"
    />
    <div class="relative mx-auto w-full my-8">
      <div @click="toDown" class="arrow cursor-pointer"></div>
    </div>
  </div>

  <div
    class="container h-auto mt-16 mx-auto w-2/3 items-center md:grid md:grid-cols-11"
  >
    <div class="my-5 col-span-4 col-end-5" id="icon">
      <h2 class="text-2xl">This BALL.Afternoon</h2>
      <div class="divider my-5"></div>
      <p class="text-center text-lg">
        秋天 這個午後吹著橘黃色的風 她點上一抹淡妝 挑上衣櫥裡那件碎花洋裝
        安排了一場一個人的約會 「我要一份巧可、 一份生乳酪、 一杯熱拿鐵。」
        鬆餅香、咖啡香 和告五人交織出緩慢的時空 嘴裡咀嚼完鮮奶油和鬆餅球
        她喝了口熱拿鐵 凝望了一會似曾相識淡黃色的圓
      </p>
    </div>
    <img
      src="../../assets/img/封面2.jpg"
      alt="主頁圖片"
      class="col-span-5 col-end-12 opacity-80"
    />
  </div>
  <div
    class="container h-auto lg:-translate-y-6 mx-auto mb-16 w-2/3 items-center md:grid md:grid-cols-11 flex flex-col-reverse"
  >
    <img
      src="../../assets/img/封面3.jpg"
      alt="主頁圖片"
      class="col-span-5 col-end-6 opacity-80"
    />
    <div class="my-5 col-span-4 col-end-12">
      <h2 class="text-2xl text-end">This BALL.Midnight</h2>
      <div class="divider my-5"></div>
      <p class="text-center text-lg">
        時間來到下半場 耳邊響起的是《The Night We Met》 旋律 是緩緩的 是輕輕的
        是柔軟的 腳步 是踟躇著 是交錯著 是糾纏著 不知歸期也漫無目的的旅人
        也許終章依舊是回到埋藏在深處的 熟悉的遠方
      </p>
      <p class="text-center text-lg">
        如果想找我們聊聊天 可以起身往高吧台坐著 我們就會懂你的明白了
      </p>
    </div>
  </div>
  <div
    class="h-[60vh] bg-gray-50 p-5 px-10 lg:px-16 flex flex-col justify-around"
  >
    <h3 class="text-3xl md:mx-6 m-6">關於那些事</h3>
    <Swiper
      class="h-72 w-full"
      :modules="modules"
      :spaceBetween="100"
      :slides-per-view="1"
      :breakpoints="{
        560: {
          slidesPerView: 2,
          spaceBetween: 80,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 60,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 100,
        },
      }"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
    >
      <swiper-slide
        style="display: flex"
        v-for="(item, index) in UserArticleList"
        :key="index"
        class="p-6 border-2 border-gray-500/50 flex flex-col duration-300 touch"
      >
        <h3 class="text-xl basis-1/4 justify-center">
          {{ DayDate(item.create_at) }}
        </h3>
        <router-link
          :to="{ name: 'articleview', params: { id: item.id } }"
          class="text-2xl basis-2/4 link-hover"
          >{{ item.title }} ></router-link
        >
        <p class="w-1/2 text-3xl">→</p>
      </swiper-slide>
    </Swiper>
  </div>

  <div class="flex flex-col h-96 w-2/3 mx-auto mt-10">
    <h3 class="text-3xl basis-1/5">來點Talk吧</h3>
    <p class="text-xl my-5 basis-1/5">
      慶祝This.BALL即將邁入第五周年！！
      不管是開心、難過、或是想跟我們說說話，都可以在下方留言，將會得到意外的小驚喜喔！！
    </p>
    <form
      for="my-modal"
      class="basis-2/5 flex flex-col"
      @submit.prevent="submitMessage"
    >
      <textarea
        v-model="userMessage"
        class="w-full textarea textarea-bordered"
        placeholder="來點Talk吧 , 來跟我們說說話"
        rows="5"
      ></textarea>
      <button class="btn">送出</button>
    </form>
    <input ref="modalRef" type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 v-if="userMessage !== ''" class="font-bold text-lg">
          慶祝This.BALL即將五周年,這裡附上折價券,於結帳頁面時可以使用！！ <br />
          優惠碼:ThisBall 5th Anniversary
          <button @click="copyOrderid">
            <font-awesome-icon
              icon="fa-solid fa-copy"
              class="ml-3 hover:text-gray-400 text-gray-600 text-xl"
            />
          </button>
        </h3>
        <h3 v-else class="font-bold text-lg">
          您尚未給我們任何留言,無法獲得小驚喜喔!
        </h3>
        <div class="modal-action">
          <button @click="submitMessage(), (userMessage = '')" class="btn">
            確定!
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 bg-gray-50 mt-10 flex flex-col">
    <h2 class="text-3xl md:mx-6 m-6">我們在這</h2>
    <div class="md:w-4/5 w-5/6 mx-auto flex flex-wrap">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.613088854264!2d120.29658977502949!3d22.630919079450255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e05ceea01149f%3A0xf451550e9f85d6db!2zVGhpc0JBTEzmiYvnh5LprIbppIXnkIPvvZzkuI3pmZDmmYLlkpbllaHlu7PvvZznqbrplpPnp5_lgJ8!5e0!3m2!1szh-TW!2stw!4v1685285101427!5m2!1szh-TW!2stw"
        height="350"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="w-full lg:basis-1/3 flex-grow lg:mr-10"
      ></iframe>

      <table
        class="table table-compact sm:table md:p-4 w-full lg:basis-1/3 flex-grow mt-6 lg:mt-0"
      >
        <tbody>
          <tr class="hover">
            <th>店名</th>
            <td>This.BALL手燒鬆餅球｜咖啡｜空間</td>
          </tr>
          <tr class="hover">
            <th>地址</th>
            <td>高雄市新興區自立二路72號</td>
          </tr>
          <tr class="hover">
            <th>電話</th>
            <td>07-2851500</td>
          </tr>
          <tr class="hover">
            <th>營業時間</th>
            <td>11:00-19:00 無公休</td>
          </tr>
          <tr class="hover">
            <th>服務內容</th>
            <td>內用 · 外帶 · 外送．Talk</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { useToast } from 'vue-toastification';
import { changeDate } from '../../composables/useDateChange';
//輪播components引入
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { useArticleStores } from '../../stores/ArticleStores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const ArticleStores = useArticleStores();
const { UserArticleList } = storeToRefs(ArticleStores);
const { getUserArticleList } = ArticleStores;
getUserArticleList();
const { DayDate } = changeDate();
const toast = useToast();
const modules = [Pagination, Autoplay]; //輪播modules使用
//modal開關
const modalRef = ref(null);
const userMessage = ref('');
const submitMessage = () => {
  const value = modalRef.value;
  value.checked = !value.checked;
};
const toDown = () => {
  window.scrollTo({
    top: 480,
    behavior: 'smooth',
  });
};
//複製訊息
const copyOrderid = () => {
  toast.info(`已複製優惠碼 ThisBall 5th Anniversary`);
  navigator.clipboard.writeText('ThisBall 5th Anniversary');
};
</script>

<style lang="scss" scoped>
div {
  .touch:hover {
    transform: translateY(-1rem);
    color: white;
    background-color: rgb(146, 155, 174);
    p {
      display: none;
    }
  }
}
.arrow.arrow::before {
  position: absolute;
  left: 50%;
}

.arrow {
  position: absolute;
  width: 30px;
  height: 30px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: -20px 0 0 -20px;
  transform: rotate(45deg);
  border-left: none;
  border-top: none;
  border-right: 2px black solid;
  border-bottom: 2px black solid;
}
.arrow::before {
  position: absolute;
  content: '';
  width: 15px;
  height: 15px;
  top: 50%;
  margin: -10px 0 0 -10px;
  border-right: 1px black solid;
  border-bottom: 1px black solid;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: arrow;
}
@keyframes arrow {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(-10px, -10px);
  }
}
</style>
