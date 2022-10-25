<template>
    <div class="home-main">
        <div id="subapp-viewport" class="subapp-viewport flex-grow-1">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
// import { apps as microApps } from '@/micro-app'
export default {
  name: 'HomeIndex',
  components: { },
  data () {
    return {
    }
  },
  watch: {
    $route: {
      handler: function (v) {
        const { path } = v
        this.routerChange(path)
      },
      deep: true
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
