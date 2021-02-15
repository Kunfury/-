<template>
  <div :class="{'has-logo':showLogo}">
    <logo  :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
			<!-- 设置默认打开侧边栏 -->
      <el-menu
				:default-openeds="default_openeds_array"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @open="handleOpen"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data(){
    return{
      default_openeds_array:['/stu','/alert']
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // let singlePaths=['/dashboard','/charts']
      // let fpath='/'+path.split('/')[1]
      // if(this.default_openeds_array.indexOf(fpath)==-1 && singlePaths.indexOf(fpath)==-1){
      //   this.default_openeds_array.push('/'+path.split('/')[1])
      //   }
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
	methods:{
		handleOpen(key){
      if(this.default_openeds_array.indexOf(key)==-1){
        this.default_openeds_array.push(key)
      }
            }
	}
}
</script>
