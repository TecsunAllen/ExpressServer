<style>

</style>
<template>
    <div>
<table class="table">
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
    <tr>
        <td>001</td>
        <td>Rammohan </td>
        <td>Reddy</td>
        <td>A+</td>
        <td>Rammohan </td>
        <td>Reddy</td>
        <td>A+</td>
    </tr>   
    </tbody>
</table>
    </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
        year:(new Date()).getFullYear(),
        month:(new Date()).getMonth(),
        day:(new Date()).getDate(),
        week:(new Date()).getDay(),
        today:new Date()

    };
  },
  computed:{
      dateList(){
      }
  },
  methods: {
    submitUser() {}
  }
};
</script>

