<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator2"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="change_pass">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'User',
  // props 传值  实现持久化，主页面刷新，值仍然保留 ？？？？？？？
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      userAvator2: ''
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    handleClick (name) {
      switch (name) {
        case 'change_pass':
          this.$router.push({
            name: 'change_pass'
          })
          break
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          })
          break
      }
    }
  },
  mounted () {
    // 从缓存中获取头像路径
    this.userAvator2 = JSON.parse(Cookies.get('userInfo')).avatar
  }
}
</script>
