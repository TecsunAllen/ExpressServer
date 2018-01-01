<style>

</style>
<template>
<div  class="timeAxis">
<ul>
    <li v-bind:key="item" v-for="item in test">
        <div style="flex:2;display:flex;margin-right: 1%;">
            <div style="width:100%; background-color: gray;">
                {{item.time}}
            </div>
        </div>
        <div style="flex:8;margin-left: 1%;background-color:#337ab7;">{{item.content}}</div>
    </li>     
</ul>
</div>
</template>
<style>
body {
  background: #333;
}
.timeAxis {
  display: flex;
}
.timeAxis > ul {
  margin-left: 0px;
  padding-left: 0px;
  display: flex;
  flex: 5;
  flex-direction: column;
}
.timeAxis > div {
  flex: 1;
}
.timeAxis:before {
  content: "";
}
.timeAxis > ul > li {
  flex: 1;
  min-height: 100px;
  display: flex;
}
</style>

<script>
export default {
  data() {
    return {
        test:[
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"},
            {time:"2017-5-3",content:"奥术大师大所大所大所大所大所大所多"}
            ]
    };
  },
  methods: {
    submitUser() {}
  }
};
</script>

