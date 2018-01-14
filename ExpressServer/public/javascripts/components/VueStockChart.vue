<style>

</style>
<template>
<div class="stockChartContainer">
    <div class="stockChartTitle">
        <div>分时</div>
        <div>五日</div>
        <div>日K</div>
        <div>周K</div>
        <div>月K</div>
    </div>
    <div class="stockChartBody">
        <div class="chartLines">
          <svg ref="svgArea" v-bind:width="svgWidth" v-bind:height="svgHeight" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <polyline v-bind:points="polylinePoints.svgPointsString"
              style="fill:transparent;stroke:blue;stroke-width:1"/>
          <line x1="0" y1="0" x2="0" y2="1000"
              style="stroke:rgb(0,0,0);stroke-width:2"/>   
          <text x="1" y="11" fill="red">{{polylinePoints.max.toFixed(2)}}</text>
          <text x="1" y="300" fill="red">{{polylinePoints.min.toFixed(2)}}</text>     
          </svg>
        </div>
    </div>  
</div>
</template>
<style>
.stockChartTitle {
  display: -webkit-box;
}
.stockChartTitle > div {
  -webkit-box-flex: 1;
  text-align: center;
  border-width: 1px;
  border-style: solid;
}
.stockChartBody {
  display: -webkit-box;
  padding-top: 5%;
}
.chartLines {
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-flex: 1;
  -webkit-box-orient: horizontal;
}
.chartLines > div {
  -webkit-box-flex: 1;
  background-color: blue;
}
</style>
<script>
export default {
  props: {
    waveData: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.svgWidth = this.$refs.svgArea.parentElement.offsetWidth;
    this.svgHeight = 300;
  },
  data() {
    return {
      svgWidth: 100,
      svgHeight: 100
    };
  },
  computed: {
      polylinePoints(){
        var waveData = this.waveData;
        var max = eval("Math.max("+waveData.join()+")");
        var min = eval("Math.min("+waveData.join()+")");
        var amplitude = max-min;
        var windowHeight = this.svgHeight;
        var windowWidth = this.svgWidth;
        var widthPer = windowWidth/waveData.length;
        var svgPointsString = "";
        waveData.forEach((element,index) => {
            var x = widthPer * index;
            var y =windowHeight - ((element-min)*windowHeight/amplitude) + 1;
            svgPointsString+=(x+","+y+" ");
        });
        return {
          max,min,
          svgPointsString};
      }
  },
  methods: {}
};
</script>

