<template>
  <div class="page_test">
    <section>
      <!-- open为展开菜单，close 为折叠菜单 -->
      <details>
        <summary>路由列表</summary>
        <ul>
          <li v-for="item in $router.options.routes" @click="$router.push(item.path)">{{item.path}} {{item.des}}</li>
        </ul>
      </details>
      <details open>
        <summary>配置</summary>
        <ul>
          <li @click="debug"><a>debug {{isDebug}}</a></li>
        </ul>
      </details>
      <details open>
        <summary>祝福</summary>
        <ul>
          <li @click="deleteItem(item._id)" v-for="item in blessing">{{item.name}}: {{item.blessing}}</li>
        </ul>
      </details>
    </section>
  </div>
</template>

<script>

export default {
  name: 'page_test',
  data() {
    return {
      blessing: [],
      pw: this.$cfg.pw,
      isDebug: !!this.$tool.storage.get('debug'),
    }
  },
  created(){
    // 需要输入口令才能使用此页面， 口令错误跳回首页
    const inputPw = prompt('', '')
    if(inputPw === this.pw) {
      this.getBlessing()
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    getBlessing(){
      this.$fly.get('/love').then(res => this.blessing = res)
    },
    deleteItem(id) {
      confirm('否则删除？') && this.$fly.delete(`/love/${id}`).then(res => {
        this.$msg('已删除')
        this.getBlessing()
      })
    },
    debug() {
      this.isDebug = !+this.$tool.storage.get('debug')
      this.$tool.storage.set('debug', +this.isDebug)
      this.$msg('刷新生效')
    },
  },
}
</script>

<style lang="less">
.page_test {
  overflow: scroll;
  .click {
    cursor: pointer;
    &:hover {
      background: #eee;
    }
    &:active {
      background: #ddd;
    }
  }
  details {
    .del {
      color: #f00;
      font-weight: bold;
      font-size: 16px;
    }
    summary {
      .click;
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
        .click;
        list-style: none;
        text-indent: 25px;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        a {
          display: block;
        }
      }
    }
  }
}
</style>
