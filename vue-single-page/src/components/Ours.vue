<template  id="ours">
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Demo - 02</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6 col-xs-offset-2">
        <div class="list-group">
          <!--使用指令v-link进行导航-->
		      <router-link class="list-group-item" to="/Ours/News">News</router-link>
          <router-link class="list-group-item" to="/Ours/Message">Message</router-link>
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
