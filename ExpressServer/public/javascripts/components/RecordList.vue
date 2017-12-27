<style>

</style>
<template>
    <div>
        <ul id="example-1" class="list-group">
            <li v-bind:key="item._id" v-for="item in recordList" class="list-group-item">
                {{ item.text }} {{(new Date(item.date)).Format('yyyy-MM-dd hh:mm:ss')}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: {
    recordList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed:{
    
  },
  methods: {
    submitUser() {}
  }
};
</script>

