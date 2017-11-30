<style>

</style>
<template id="template-home">
  <form ref='form' role="form" enctype="multipart/form-data">
    <textarea name="text" ref='text' />
    <input name='photos' accept="image/*" ref="files" multiple type="file" />
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
      recordManager.setUserId('123');
      recordManager.setUserName('qwe');
      recordManager.saveRecordAsync({
        form:this.$refs.form
      });
    }
  }
};
</script>

