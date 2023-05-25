<template>
  <!-- The button to open modal -->
  <label for="my-modal" class="btn">open modal</label>
  <button @click="onClick">獲取dom</button>
  <!-- Put this part before </body> tag -->
  <input ref="opmd" type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ message }}</h3>
      <p class="py-4">
        You've been selected for a chance to get one year of subscription to use
        Wikipedia for free!
      </p>
      <div class="modal-action">
        <label @click="onClick" for="my-modal  " class="btn">Yay!</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const message = ref('');
const opmd = ref(null);
console.log(opmd);
const onClick = (show) => {
  if (show) {
    message.value = '今天天氣真不錯';
  }
  const value = opmd.value;
  value.checked = !value.checked;
  console.log('Input value:', value.checked);
};
</script>
