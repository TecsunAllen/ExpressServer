<style>

</style>
<template id="template-home">
  <form ref='form' role="form">
    <textarea />
    <input name='photos' accept="image/*" ref="files" type="file" />
    <button type="button" v-on:click="submitForm" class="btn btn-default">上传</button>
  </form>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "欢迎！"
    };
  },
  methods: {
    submitForm(ev) {
      var data = new FormData(this.$refs.form);
      $.ajax({
        url: "/saveRecord",
        type: "POST",
        cache: false,
        data: data,
        processData: false,
        contentType: false
      })
        .done(function(res) {})
        .fail(function(res) {});

      /*var oReq = new XMLHttpRequest();
      oReq.open("POST", "/asda", true);
      oReq.onload = function(oEvent) {};
      oReq.send(oData);*/
    }
  }
};
</script>

