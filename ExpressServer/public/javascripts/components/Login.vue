<style>

</style>
<template id="template-home">
    <div>
        <input />
        <button type="button" v-on:click="submitUser" class="btn btn-default">确定</button>
    </div>
</template>
<script>
export default {
  props: ['isValidated'],
  data() {
    return {};
  },
  methods: {
    submitUser() {}
  }
};
</script>

