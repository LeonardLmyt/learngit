<template>
  <div class="hello">
    <h1>id:{{ $route.params.id }}</h1>
    News World!{{msg}}
  </div>
</template>
<script>
  export default {
  data (){
  return {
  msg:this.$route.params.id
  }
  },
  watch: {
    '$route' (to, from) {
      this.msg = this.$route.params.id
    }
  }
  }
</script>