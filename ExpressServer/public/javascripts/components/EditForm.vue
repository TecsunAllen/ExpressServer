<style>

</style>
<template id="template-home">
  <form ref='form' role="form">
    <textarea ref='text' />
    <input name='photos' accept="image/*" ref="files" type="file" />
    <button type="button" v-on:click="submitForm" class="btn btn-default">上传</button>
  </form>
</template>
<script>
import recordManager from '../RecordManager.js';
export default {
  name: "hello",
  data() {
    return {
      msg: "欢迎！"
    };
  },
  methods: {
    submitForm(ev) {
      recordManager.saveRecordAsync({
        files:[],
        text:this.$refs.text.value
      });
    }
  }
};
</script>

