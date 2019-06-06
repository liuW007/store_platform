<template>
  <div class="home">
    <!-- 侧边菜单栏 -->
    <Layout class="main">
      <Sider :width="collapsed?0:170">
        <side-menu accordion :collapsed="collapsed" ref="sideMenu" :menu-list="menuListSub" @on-select="turnToPage" :active-name="$route.name"></side-menu>
      </Sider>
      <Layout class="right-side">
        <!-- 顶部 -->
        <Header>
            header
          <!-- <header-bar @on-the-collapse="handleCollapse">
            <user></user>
            <full-screen v-model="isFullscreen"></full-screen>
          </header-bar> -->
        </Header>
        <!-- 内容区域 -->
        <Content class="main-content">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import SideMenu from './side-menu/side-menu'
// import HeaderBar from './header-bar/header-bar'
// import FullScreen from './full-screen/full-screen'
// import User from './user/user'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import './home.less'

export default {
    name: 'Home',
    components: {
        SideMenu,
        // HeaderBar,
        // FullScreen,
        // User
    },
    data () {
        return {
            // isFullscreen: false,
            collapsed: false
        }
    },
    computed: {
      ...mapGetters([
        'errorCount',
        'menuList'
      ]),
      menuListSub () {
        return this.menuList
      },
    },
  methods: {
    handleCollapse(){
        this.collapsed =! this.collapsed
    },
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
  }
}
</script>