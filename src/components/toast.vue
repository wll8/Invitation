<template>
  <transition name="com_toast">
    <div class="com_toast" v-show="show">
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

<style lang="less">
.com_toast {
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

.com_toast-enter-active,
.com_toast-leave-active {
  transition: 0.3s ease-out;
}

.com_toast-enter {
  opacity: 0;
  transform: scale(1.2);
}

.com_toast-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
