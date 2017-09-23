<template  id="news">
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Demo - 03</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6 col-xs-offset-2">
        <div class="list-group">
          <!--使用指令v-link进行导航-->
          <router-link class="list-group-item" :to="{ name: 'newsparame', params: {id: '01'} }">01</router-link>
          <router-link class="list-group-item" to="/Ours/News/NewsParame/02">02</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
  data (){
  return {
  }
  },
  created(){
  this.fetchData();
  },
  methods:{
  fetchData(){
  console.log(this.$children)
  }
  }
  }
</script>