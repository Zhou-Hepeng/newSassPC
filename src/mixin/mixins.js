import axios from 'axios'
import qs from 'qs'

const HTTP_DEV = true
const HTTPS = HTTP_DEV ? '/dl' : ''

export default {
  data() {
    return {
      dl: '/dl',
      getUrl: 'https://saasm.360che.com.cn'
    }
  },
  methods: {
    getLevel() {
      let dealerInfo = this.getStorage('dealerInfo')
      if (dealerInfo) {
        return dealerInfo.usercategory
      }
    },
    // 域名
    ajaxUrl() {
      // let devUrl = 'http://dealersaasapi.360che.com'
      // 正式
      // 测试
      // return 'https://test-saasm.360che.com.cn'
      // return 'https://saasm.360che.com.cn'
      return '/dl'
    },
    // 请求 带session
    ajax(url, success, error) {
      axios({ method: 'get', url: `${this.ajaxUrl()}${url}&sessionid=${this.getStorage('sessionId')}` })
        .then(success)
        .catch(error)
    },
    // 不带session请求
    getData(url, success, error) {
      axios({ method: 'get', url: `${this.ajaxUrl()}${url}` })
        .then(success)
        .catch(error)
    },
    postData(url, data, success, error) {
      axios({ method: 'post', url: `${this.ajaxUrl()}${url}&sessionid=${this.getStorage('sessionId')}`, data: qs.stringify(data) })
        .then(success)
        .catch(error)
    },
    // get请求
    get(url, params) {
      params.sessionid = this.newGetStorage('sessionId')
      return axios.get(`${HTTPS}${url}`, { params: params })
    },
    // post请求
    post(url, params) {
      params.sessionid = this.newGetStorage('sessionId')
      return axios.post(`${HTTPS}${url}`, qs.stringify(params))
    },
    // 批量储存缓存
    newSetStorage(...params) {
      let [oJson, val] = params
      if (typeof oJson === 'string') {
        window.localStorage.setItem(oJson, val)
      } else {
        for (const [key, val] of Object.entries(oJson)) {
          window.localStorage.setItem(key, JSON.stringify(val))
        }
      }
    },
    // 批量获取缓
    newGetStorage(key) {
      if (typeof key === 'string') {
        let val = window.localStorage.getItem(key)
        try {
          val = JSON.parse(val)
        } catch (err) {}
        return val
      } else {
        let arr = []
        for (let item of key) {
          arr.push(window.localStorage.getItem(item))
        }
        arr = arr.map(x => {
          try {
            x = JSON.parse(x)
          } catch (err) {}
          return x
        })
        return arr
      }
    },
    // 读取缓存
    getStorage(name) {
      let obj = localStorage.getItem(name)
      try {
        if (JSON.parse(obj)) {
          obj = JSON.parse(obj)
        }
      } catch (err) {}
      return obj
    },
    // 设置缓存
    setStorage(name, data) {
      let obj = data
      if (typeof data === 'object') {
        obj = JSON.stringify(data)
      }
      localStorage.setItem(name, obj)
    },
    // 删除缓存
    removeStorage(name) {
      localStorage.removeItem(name)
    },
    // 清除账号信息
    clearInfo(clear) {
      this.removeStorage('sessionId')
      this.removeStorage('newClueData')
      this.removeStorage('notFollowData')
      this.removeStorage('revisitData')
      this.removeStorage('followIngData')
      this.removeStorage('allClueData')
      this.removeStorage('cluePool')
      if (!clear) {
        alert('账号已在其他地方登录')
      }
      this.$router.replace('/login')
      alert(2)
    }
  }
}
