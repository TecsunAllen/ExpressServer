<style>

</style>
<template>
    <div>
        <ul id="example-1">
            <li v-bind:key="item" v-for="item in recordList">
                {{ item }}
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
  methods: {
    submitUser() {}
  }
};
</script>

