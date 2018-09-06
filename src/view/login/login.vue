<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password, saveLogin }) {
      this.handleLogin({ userName, password, saveLogin }).then(res => {
        this.getUserInfo({saveLogin}).then(res => {
          this.$router.push({
            name: 'home'
          })
        })
      })
    },
    showAccount () {
      this.$Notice.info({
        title: '体验账号密码',
        desc:
          '账号1：test 密码：123456 <br>账号2：test2 密码：123456 已开放注册！',
        duration: 10
      })
    },
    showMessage () {
      this.$Notice.success({
        title: '已升级至iView3.0',
        desc: '完善多项功能，包括部门管理、定时任务、前端模版等 修复已知BUG',
        duration: 5
      })
    }
  },
  mounted () {
    this.showAccount()
    this.showMessage()
  }

}
</script>

<style>

</style>
