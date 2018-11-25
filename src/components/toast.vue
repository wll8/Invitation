<template>
  <transition name="demo">
    <div class="toast" v-show="show">
      {{msg}}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      msg: ""
    };
  }
};
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: -100px;
  padding: 10px;
  width: 200px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}

.demo-enter-active,
.demo-leave-active {
  transition: 0.3s ease-out;
}

.demo-enter {
  opacity: 0;
  transform: scale(1.2);
}

.demo-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
