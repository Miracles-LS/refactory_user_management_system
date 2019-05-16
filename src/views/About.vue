<template>
  <div class="about container">
    <a v-on:click.prevent="returnBack" class="btn btn-default">返回</a>
    <h1 class="page-header">这是关于我们页面的内容</h1>
  </div>
</template>

<script>
  export default { 
    name: 'about',
    methods: {
      returnBack() {
        this.$router.go(-1)
      }
    }
  }
</script>