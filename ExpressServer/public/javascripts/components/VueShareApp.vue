<template>
    <div class="shareApp">
        <div v-if="!isLoaded" ref="mask" class="shareMask">加载中</div>
        <div class="shareHeader">
            <div>
                <div style="text-align: center;">
                <img />    
                <input data-action="queryShare" @input="eventHander($event)" />
                <span style="float: right;margin-right: 5%;">取消</span>
                </div>
                <ul v-if="isQuerying">
                    <li v-bind:key="item._id" v-for="item in queryShareData" class="list-group-item">
                        <div style="flex:5;padding: 8px;">{{item.code +"---"+ item.name}}</div>
                        <div data-action="favShare" @click="eventHander($event,item)" class='btn-default' 
                        style="display:flex;flex-direction: column;flex:1;text-align: center;">
                        关注
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <ul class="shareBody list-group">
            <li style="display:flex;" v-bind:key="item._id" v-for="item in shareData" class="list-group-item">
                <span style="flex:1">{{ item.name }}</span>
                <span style="flex:1">{{ item.price }}</span>
                <div style="display:flex;flex:3">
                <span style="flex:1">{{ item.percentCL }}</span>
                <span style="flex:1">{{ item.priceCL }}</span>
                <span style="flex:1">{{ (item.totalWorth/100000000).toFixed(2) + "亿" }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<style>
body{
    background-color:#ECF0F1;
}
.shareApp{
    position: absolute;
    top:0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    flex-direction: column;
}
.shareMask{
    position: absolute;
    top:0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index:1;
    text-align: center;
    margin-top: 300px;
}
.shareHeader{
    flex:1;
    background-color:#ECF0F1;
    overflow: auto;
}
.shareHeader ul{
    padding: 0px;
    height: 200px;
    z-index: 1;
    position: absolute;
    width: 100%;
    background: #ECF0F1;
}
.shareHeader ul li{
    display:flex;
    margin: 0px;
    padding: 0px;
    background: #95A5A6;
}
.shareBody{
    flex:15;
}
.btn-default:before {
    content: "";
    flex: 1;
}
.btn-default:after {
    content: "";
    flex: 1;
}
</style>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    shareData() {
      return this.$store.state.todayShareCodes;
    },
    queryShareData(){
      return this.$store.state.queryShareCodes;
    },
    isLoaded(){
        var share = this.$store.state.todayShareCodes[0];
        return share && share.name;
    },
    isQuerying(){
        var share = this.$store.state.queryShareCodes;
        return share.length>0;
    }
  },
  methods: {
    eventHander(ev,data) {
        ev.bindedData =data;
            this.$store.commit("actionController", ev);
        
    }
  },
  created: function () {
  },
beforeUpdate: function () {

   }
};
</script>