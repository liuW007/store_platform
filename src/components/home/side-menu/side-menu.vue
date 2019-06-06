<template>
  <div class="side-menu">
    <Menu ref="menu" v-show="!collapsed"  mode="vertical" width="auto" theme="dark" :accordion="true" @on-select="handleSelect" :active-name="activeName" :open-names="openedNames">
      <h2 class="menu-title"></h2>
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item,true)" :key="`menu-${item.children[0].name}`">
            <span>{{showTitle(item.children[0])}}</span>
          </menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div v-show="collapsed">
    </div>
  </div>
</template>

<script>
import SideMenuItem from './side-menu-item.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'
export default {
    name: 'SideMenu',
    mixins: [ mixin ],
    data() {
      return {
        openedNames: []
      }
    },
    components: {
      SideMenuItem,
    },
    props: {
      collapsed: {
        type: Boolean
      },
      menuList:{
        type: Array,
        default(){
          return []
        }
      },
      accordion: Boolean,
      activeName: {
        type: String,
        default: ''
      },
      openNames: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      handleSelect(name){
        // console.log(name)
        this.$emit('on-select', name)
      },
      getOpenedNamesByActiveName (name) {
        return this.$route.matched.map(item => item.name).filter(item => item !== name)
      },
      updateOpenName (name) {
        if (name === this.$config.homeName) this.openedNames = []
        else this.openedNames = this.getOpenedNamesByActiveName(name)
      }
    },
    watch: {
      activeName (name) {
        if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
        else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
      },
      openNames (newNames) {
        this.openedNames = newNames
      },
      openedNames () {
        this.$nextTick(() => {
          this.$refs.menu.updateOpened()
        })
      }
    },
    mounted () {
      this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    }
}
</script>

<style lang="less" scoped>
.side-menu{
    max-height: 100vh;
    overflow: auto;
  
    .menu-title{
    height: 51px;
    color: #fff;
    padding: 10px 0;
    text-align: center;
    }
}
</style>