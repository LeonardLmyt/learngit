<template>
  <div class="container-fluid">
    <div class="row-fluid">
      <div class="span12">
        <ul>
          <li>
            新闻资讯
          </li>
          <li>
            体育竞技
          </li>
          <li>
            娱乐八卦
          </li>
          <li>
            前沿科技
          </li>
          <li>
            环球财经
          </li>
          <li>
            天气预报
          </li>
          <li>
            房产家居
          </li>
          <li>
            网络游戏
          </li>
        </ul>
      </div>
	  <div>       
	      <Sub></Sub>    
		  <SubTwo></SubTwo>    
	  </div>
    </div>
  </div>
</template>
<script>
    import Sub from './Sub' 
	  import SubTwo from './SubTwo' 
	  export default{
	      components: { Sub ,SubTwo}
	  }
</script>
