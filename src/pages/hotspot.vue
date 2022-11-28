<template>
  <div :class="['icon', icon]" @click="click">
    <div v-if="num" :class="['num', 'red-point-animate-' + num]">{{ num }}</div>
    <div class="head">{{ head }}</div>
    <div class="body">{{ body }}</div>
    <div class="foot">{{ foot }}</div>
  </div>
</template>
<script>
export default {
  props: {
    click: {
      type: Function,
      default: () => {},
    },
    num: String, // 角标
    icon: String, // icon 图标
    head: String, // 头部文字
    body: String, // 中间文字
    foot: String, // 下部文字
  },
}
</script>
