import axios from 'axios'

export default ({
  getUrl: 'https://saasm.360che.com.cn',
  methods: {
    // 请求 带session
    ajax(url, success, error) {
      axios({ method: 'get', url: `${this.getUrl}${url}&sessionid=${this.getStorage('sessionId')}` })
        .then(success)
        .catch(error)
    }
  }
})
