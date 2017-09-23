<template>
  <div class="hello">
    <h1>地址：{{address}}</h1>
    <h1>经度：{{ lat }}</h1>
	<h1>纬度：{{ lng }}</h1>
  </div>
</template>
<script>
  export default {
  data (){
  return {
  address:0,
  lat:0,
  lng:0
  }
  },
  mounted: function() {
  this.$http.post("http://cjhch.com/AjaxTest.ashx",{type:"getjson",'url':'https://apis.map.qq.com/ws/geocoder/v1/?address=广东省佛山市顺德区广东工业设计城&key=YSGBZ-3IT6U-5CDVT-2LDLF-GGHWK-GFB7L'},{emulateJSON:true}).then(
  function (res) {
  console.log(JSON.parse(res.bodyText))
  var loca = JSON.parse(res.bodyText)
  this.address = loca.result.address_components.province + loca.result.address_components.city + loca.result.address_components.district
  this.lat = loca.result.location.lat
  this.lng = loca.result.location.lng
  },function (res) {
  console.log('链接失败')
  }
  );
  }
  }

</script>