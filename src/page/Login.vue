<template>
  <div class="login">
    <!-- 头部 -->
    <div class="title-bar">
      <div class="logo">
        <img src="../assets/logo.png" />
        <span>卡商宝智慧营销系统</span>
      </div>
      <div class="introduce">
        <a href="http://www.360che.com" target="_blank">卡车之家首页</a>
        <a href="#">关于卡商宝</a>
      </div>
    </div>
    <!-- 登陆content -->
    <div class="login-content">
      <div class="login-card">
        <div class="card-title">
          登录卡商宝
        </div>
        <div class="card-content">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="account">
              <div class="card-item">
                <span>账号：</span><i-input v-model="formInline.account" placeholder="请输入帐号/手机号" style="width: 280px;height: 40px;" @keyup.enter.native="handleSubmit('formInline')"></i-input>
              </div>
            </FormItem>
            <FormItem prop="password">
              <div class="card-item">
                <span>密码：</span><i-input v-model="formInline.password" type="password" placeholder="请输入密码" style="width: 280px;height: 40px;" @keyup.enter.native="handleSubmit('formInline')"></i-input>
              </div>
            </FormItem>
            <FormItem prop="code">
              <div class="card-item card-code">
                <span>验证码：</span><i-input v-model="formInline.code" placeholder="请输入验证码" :maxlength="4" style="width: 280px;height: 40px;" @keyup.enter.native="handleSubmit('formInline')">
                  <img class="img" :src="codeImg" slot="append">
                </i-input>
                <em @click="changeCode">换一张</em>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" style="width: 280px;height: 40px;font-size: 16px;font-weight: bold;margin-top: 20px;background: #25A6FF;border: 1px solid #2397E8;margin-left: 56px;" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
          </Form>
          <div class="card-tip">
            <Checkbox v-model="isRecord" @on-change="recordAccount">记住账号和密码</Checkbox>
            <span @click="dealerRegiste">经销商注册</span>
          </div>
        </div>
        <div class="card-tel">
          <span>服务热线：</span>
          <span class="tel">400-613-6188(9:00-18:00)</span>
        </div>
      </div>
    </div>
    <!-- 登陆footer -->
    <div class="login-footer">
      <div class="item">
        <span>关于我们</span>
        <span>联系我们</span>
        <span>工作机会</span>
        <span>网站地图</span>
        <span>广告合作</span>
        <span>手机端</span>
        <span>iPhone客户端</span>
        <span>Android客户端</span>
        <span>意见反馈</span>
      </div>
      <div class="item">
        <span>经营许可证编号：京ICP证080575号 / 京ICP备09080840号 京公网安备11010502026149</span>
      </div>
      <div class="item">
        <span>Copyright © 2009 - 2018 www.360che.com All Rights Reserved.卡车之家 版权所有</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    // fingerprint=
    newFingerprint: [],
    // 登录信息
    formInline: {
      // 账号
      account: '',
      // 密码
      password: '',
      // 验证码
      code: ''
    },
    // 图形验证码
    codeImg: '',
    // 验证
    ruleInline: {
      account: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ],
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ]
    },
    // 是否记住账号密码
    isRecord: false
  }),
  created() {
    let sessionId = this.getStorage('sessionId')
    if (sessionId) {
      // 初始化页面
      this.start()
    } else {
      this.imgCode()
    }
  },
  methods: {
    // 登录
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 本地测试登录
          let url = '/newsaasapi/User/LoginTelAndPwd.aspx'
          // 线上登录
          // let url = '/newsaasapi/WeiXin/BindTelPwd.aspx'
          let json = {
            tel: this.formInline.account,
            pwd: this.formInline.password,
            apptype: 'weixin'
          }
          this.get(`${url}`, json).then(res => {
            let { data, status, msg } = res.data
            if (status === 1) {
              let dealerInfo = {}
              dealerInfo.dealername = data.dealername
              dealerInfo.userid = data.userid
              dealerInfo.tel = data.tel
              dealerInfo.username = data.username
              dealerInfo.realname = data.realname
              dealerInfo.usercategory = data.usercategory

              // 储存sessionId
              this.setStorage('sessionId', data.sessionid)
              this.newSetStorage({ dealerInfo: dealerInfo })
              // 初始化页面
              this.start()
              // 隐藏加载弹窗
            } else if (status === 901) {
              this.clearInfo()
            } else {
              this.$Message.error(msg)
            }
          })
        } else {
          this.$Message.error('登录失败!')
        }
      })
    },
    // 页面初始化
    start() {
      // 显示页面加载
      this.$Spin.show()
      // newFingerprint
      const newFingerprint = this.getStorage('newFingerprint')
      let ajaxUrl = ''
      if (!newFingerprint) {
        ajaxUrl = `/newsaasapi10/Comm/GetAllCategoryDownUrl.aspx?categoryname=all&${+new Date()}`
      } else {
        this.newFingerprint = newFingerprint
        console.log(this.newFingerprint, 'this.newFingerprint11111')
        ajaxUrl = `/newsaasapi10/Comm/GetAllCategoryDownUrl.aspx?categoryname=all&${+new Date()}&fingerprint=${newFingerprint.join(
          '_'
        )}`
      }

      this.ajax(
        ajaxUrl,
        ele => {
          if (ele.data.status === 1) {
            console.log(ele.data, 'ele.data')
            // 循环请求数据
            ele.data.listdata.forEach((item, index) => {
            // 判断是否改变过
              if (item.ischange === 1) {
              // 请求所有列表数据
                this.getData(`/newsaasapi10/${item.url}`, res => {
                  if (res.data.status === 1) {
                  // 存储所有列表数据
                    this.setStorage(`new${item.name}`, res.data)
                    let newFingerprint = this.getStorage('newFingerprint')
                    if (!newFingerprint) {
                      newFingerprint = []
                    }
                    this.$set(newFingerprint, index, item.fingerprint)
                    this.setStorage('newFingerprint', newFingerprint)
                    // 存储指纹
                    if (index === ele.data.listdata.length - 1) {
                      // 取消加载
                      this.$Spin.hide()
                      // 全部存储完成 && 跳转到首页
                      this.$Message.success('登录成功!')
                      this.$router.replace('/homepage')
                    }
                  } else if (res.data.status === 901) {
                    this.clearInfo()
                  }
                })
              } else {
                if (index === ele.data.listdata.length - 1) {
                  // 取消加载
                  this.$Spin.hide()
                  this.setStorage('newFingerprint', this.newFingerprint)
                  // 全部存储完成 && 跳转到首页
                  this.$Message.success('登录成功!')
                  this.$router.replace('/homepage')
                }
              }
            })
          } else if (ele.data.status === 901) {
            // 取消加载
            this.$Spin.hide()
            this.clearInfo()
          } else {
            // 取消加载
            this.$Spin.hide()
            this.clearInfo(true)
          }
        },
        () => {
          // 取消加载
          this.$Spin.hide()
          this.clearInfo(true)
        }
      )
    },
    // 是否记住账号密码
    recordAccount(e) {
      console.log(e)
    },
    // 获取验证码
    imgCode() {
      this.get(`/newsaasapi/Comm/Captcha.aspx?ts=${+new Date()}`, {})
        .then(res => {
          this.codeImg = `${res.config.url}`
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 更换验证码
    changeCode() {
      this.imgCode()
    },
    // 经销商注册
    dealerRegiste() {
      console.log('经销商注册')
    }
  }
}
</script>
<style scoped>
  .login{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title-bar{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10);
  }
  .logo{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .logo img{
    width: 34px;
    height: 30px;
    margin-right: 10px;
    background-size: cover;
  }
  .logo span{
    font-size: 20px;
    color: #17181A;
    line-height: 40px;
  }
  .introduce{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .introduce a{
    font-size: 14px;
    color: #5C6066;
    line-height: 18px;
    cursor: pointer;
  }
  .introduce a:first-child{
    padding-right: 20px;
    border-right: 1px solid #D8D8D8;
  }
  .introduce a:last-child{
    padding-left: 20px;
  }
  .login-content{
    flex: 1;
    position: relative;
  }
  .login-card{
    position: absolute;
    top: 156px;
    right: 50px;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.10);
    border-radius: 2px;
  }
  .card-title{
    width: 380px;
    padding-top: 20px;
    padding-bottom: 10px;
    margin: 0 30px;
    font-size: 20px;
    color: #17181A;
    line-height: 30px;
    border-bottom: 1px solid #E4E5E6;
  }
  .card-content{
    margin: 10px 30px 20px;
  }
  .card-item{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .card-item span{
    width: 56px;
    text-align: right;
    font-size: 14px;
    color: #333;
  }
  .card-item .img{
    width: 85px;
    height: 34px;
  }
  .card-item em{
    cursor: pointer;
    margin-left: 5px;
    font-size: 12px;
    color: #3A8DFF;
  }
  .card-tip{
    width: 280px;
    margin-top: 10px;
    margin-left: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .card-tip span{
    cursor: pointer;
    font-size: 12px;
    color: #3A8DFF;
    line-height: 20px;
  }
  .card-tel{
    padding: 10px;
    display: flex;
    flex-direction: column;
    background: #FFF4F0;
    border-radius: 0 0 2px 2px;
  }
  .card-tel span{
    margin-left: 79px;
    font-size: 12px;
    color: #5C6066;
    line-height: 20px;
  }
  .card-tel .tel{
    margin-top: 5px;
    font-size: 16px;
  }
  .login-footer{
    padding-top: 20px;
    border-top: 3px solid #00479D;
    margin: 0 auto;
    margin-bottom: 30px;
    width: 1000px;
  }
  .item{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .item span{
    color: #999;
    font-size: 12px;
    margin: 4px 8px;
  }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
