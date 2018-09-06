import { login, getUserInfo } from '@/api/index'
import { setToken, getToken, setUserInfo, getUserInfoCache, getAccessCache, parseAccess } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo (state, params) {
      setUserInfo(params)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password, saveLogin}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          username: userName,
          password: password,
          saveLogin: saveLogin
        }).then(res => {
          const data = res.result
          commit('setToken', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // 清空打开的页面等数据
        commit('setToken', '')
        commit('setAccess', [])
        commit('setUserInfo', null)
        localStorage.clear()
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ commit }, { saveLogin }) {
      return new Promise((resolve, reject) => {
        // 如果已经登录，直接从cookie中获取用户信息，不需要从后台获取
        var user = getUserInfoCache()
        if (user) {
          const access = getAccessCache() // 获取权限缓存
          commit('setAvator', user.avatar)
          commit('setUserName', user.username)
          commit('setUserId', user.id)
          commit('setAccess', access) // access 必须为数组，例如：['super_admin', 'admin']
          user.access = access // 设置用户访问权限
          resolve(user)
        } else {
          getUserInfo().then(res => {
            var user = res.result
            commit('setAvator', user.avatar)
            commit('setUserName', user.username)
            commit('setUserId', user.id)
            user.access = parseAccess(user.permissions) // 设置用户访问权限
            commit('setUserInfo', user) // 保存用户信息到cookie，同时保持用户访问权限到localStorage
            commit('setAccess', user.access) // access 必须为数组，例如：['super_admin', 'admin']
            resolve(user)
          }).catch(err => {
            reject(err)
          })
        }
      })
    }
  }
}
