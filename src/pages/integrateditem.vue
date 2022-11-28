<template>
  <div :class="'integrated-item ' + position" @click="click">
    <img :src="imgSrc" />
    <p class="p-title">{{ title }}</p>
    <p class="p-intro">{{ intro }}</p>
  </div>
</template>
<script>
export default {
  props: {
    click: {
      type: Function,
      default: () => {},
    },
    title: String,
    intro: String,
    imgSrc: String,
    position: String,
  },
}
</script>
