<template>
  <div class="page_test">
    <section>
      <!--open为展开菜单，close为折叠菜单-->
      <details class="menu" open>
        <summary>路由列表</summary>
        <ul>
          <li><a href="#/">首页</a></li>
          <li><a href="#/t">测试 t</a></li>
        </ul>
      </details>
      <details class="menu" close>
        <summary>权限操作</summary>
        <ul>
          <li @click="() => {}">添加 token</li>
        </ul>
      </details>
    </section>
  </div>
</template>

<script>

export default {
  name: 'page_test',
  data() {
    return {};
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.page_test {
  .menu {
    summary {
      height: 40px;
      line-height: 40px;
      text-indent: 10px;
      outline: none;
      font-size: 14px;
      font-weight: 700;
      border-bottom: 1px solid #eee;
    }
    ul {
      padding: 10px 0;
      li {
        list-style: none;
        text-indent: 25px;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        &:hover {
          background: #eee;
        }
        &:active {
          background: #ddd;
        }
      }
    }
  }
}
</style>
