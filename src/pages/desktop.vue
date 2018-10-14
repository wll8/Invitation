<template>
  <div class="page_desktop full-screen oh">
    desktop
  </div>
</template>

<script>

export default {
  name: 'page_desktop',
  data() {
    return {
    };
  },
  computed: {},
  created() {},
  methods: {
    _redirectToTalk() {
      this.$route.push('/talk')
    }
  },
  components: {
  }
};
</script>

<style lang="less" scoped>
  @import "../assets/css/util.less";

  .page_desktop {}
</style>
