<template>
    <div>
        <ul class="list-group">
            <li style="display:flex;" v-bind:key="item._id" v-for="item in shareData" class="list-group-item">
                <span style="flex:1">{{ item.name }}</span>
                <span style="flex:1">{{ item.price }}</span>
                <div style="display:flex;flex:3">
                <span style="flex:1">{{ item.Chg_percent }}</span>
                <span style="flex:1">{{ item.Chg_price }}</span>
                <span style="flex:1">{{ item.worth }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
        shareData:[
            {_id:0,name:"上证指数",code:"000000",price:"99",Chg_percent:"0%",Chg_price:"0%",worth:"100000000"},
            {_id:1,name:"恒生指数",code:"000000",price:"99",Chg_percent:"0%",Chg_price:"0%",worth:"100000000"},
            {_id:2,name:"湖南黄金",code:"000000",price:"99",Chg_percent:"0%",Chg_price:"0%",worth:"100000000"}
            ]
    };
  },
  computed:{

  },
  methods: {

  }
};
</script>