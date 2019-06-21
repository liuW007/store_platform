<template>
<div class="shop-manage">
  <Table :columns="columns" :data="datas"></Table>
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
        },
        columns: [
          {
            title: '名字',
            key: 'name'
          },
          {
            title: '类别',
            key: 'remark'
          }
        ],
        datas: [],
      }
    },
    methods: {
      //查询门店
      query () {
        api.company.query().then(res=>{
          console.log(res);
          this.datas = res;
        }).catch(err=>{})
      },
    },
    mounted() {
      this.query();
    },
}
</script>