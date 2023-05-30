<template lang="">
  <div class="lg:h-52 mt-20 h-24 md:h-36 flex justify-center items-center">
    <ul class="steps">
      <li class="step">填寫訂單</li>
      <li class="step">確認資料及付款</li>
      <li class="step step-primary">訂單完成</li>
    </ul>
  </div>
  <div class="divider"></div>
  <div class="">
    <h2 class="text-3xl my-10 text-center">感謝您的購買</h2>

    <ul class="text-2xl text-center">
      <li>結帳結束後現場會立即製作訂單，請您留意手機</li>
      <li>本訂單會現場製作，若有任何問題歡迎來電詢問</li>
      <li>訂單完成時將會與您聯絡，屆時請保持手機暢通</li>
      <li>歡迎到本店內用，若您有空閒時間可以坐來下慢慢享用</li>
      <button class="btn btn-wide btn-info mt-3">
        <router-link :to="{ name: 'homeview' }">回到首頁</router-link>
      </button>
    </ul>
    <div class="p-4 bg-gray-50 mt-10 flex flex-col">
      <h2 class="text-3xl md:mx-6 m-6">我們在這</h2>
      <div class="md:w-4/5 w-5/6 mx-auto flex flex-wrap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.613088854264!2d120.29658977502949!3d22.630919079450255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e05ceea01149f%3A0xf451550e9f85d6db!2zVGhpc0JBTEzmiYvnh5LprIbppIXnkIPvvZzkuI3pmZDmmYLlkpbllaHlu7PvvZznqbrplpPnp5_lgJ8!5e0!3m2!1szh-TW!2stw!4v1685285101427!5m2!1szh-TW!2stw"
          height="350"
          allowfullscreen=""
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
              <td>手燒鬆餅球｜咖啡｜空間</td>
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
  </div>
</template>
<script setup></script>
<style lang=""></style>
