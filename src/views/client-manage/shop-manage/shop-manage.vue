<template>
<div class="shop-manage">
  ShopManage
</div>
</template>

<script>
import './shop-manage.less'
import api from '@/api'
export default {
    name: 'ShopManage',
    data() {
      return {
        query_form: {
          keyword: '',
          areaid: 0,
          page: 1,
        }
      }
    },
    methods: {
      //查询门店
      query () {
        api.company.query().then(res=>{
          console.log(res);
        }).catch(err=>{})
      },
    },
    mounted() {
      this.query();
    },
}
</script>