<style>

</style>
<template>
<table ref="calendarTable" class="table vue-lds-calendar">
    <thead>
    <tr>
        <th colspan="5">{{year}}年{{month}}月</th>
        <th>◄</th>
        <th>►</th>
    </tr>
    <tr>
        <th>日</th>
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
    </tr>
    </thead>
    <tbody>
    <tr v-bind:key="weekList.id" v-for="weekList in dateList">
        <td v-bind:key="day.id" v-for="day in weekList.dayList">
            <div>
                <div>{{day.date.getDate()}}</div>
            </div>
        </td>
    </tr>      
    </tbody>
</table>
</template>
<style>
.vue-lds-calendar{
    background-color: aliceblue;
    height: -webkit-fill-available;
}
td{
        background-color: aliceblue;
}
</style>
<script>
export default {
  props: {},
  mounted(){
      //var containerHeight = this.$refs.calendarTable.parentElement.offsetHeight;
      //this.$refs.calendarTable.style.height = containerHeight +"px";
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      week: new Date().getDay(),
      today: new Date()
    };
  },
  computed: {
    tableHeight(){
        this.$refs.calendarTable
    },  
    dateList() {
      var dateList = [];
      var firstDayOfMonth = new Date(
        this.today.getTime() - (this.day - 1) * 1000 * 60 * 60 * 24
      );
      var firstDayOfPage = new Date(
        firstDayOfMonth.getTime() -
          firstDayOfMonth.getDay() * 1000 * 60 * 60 * 24
      );
      for (var i = 0; i < 6; i++) {
        var dayList = [];
        dateList.push({id:i,dayList});
        for (var j = 0; j < 7; j++) {
            var date = new Date(
              firstDayOfPage.getTime() + (i * 7 + j) * 1000 * 60 * 60 * 24
            );
          dayList.push({
            id: i + "-" + j,
            date: date
          });
        }
      }
      return dateList;
    }
  },
  methods: {
    submitUser() {}
  }
};
</script>

