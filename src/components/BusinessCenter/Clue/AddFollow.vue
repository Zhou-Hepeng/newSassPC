<template>
  <i-form ref="followItem" :model="followItem" :rules="ruleInline">
    <Modal :value="isShowFollow" width="600" @on-cancel="hideAddFollow">
      <p slot="header" class="title">
        <span>添加跟进记录</span>
      </p>
      <div class="jus-item">
        <div class="item">
          <span>跟进方式：</span>
          <FormItem prop="followuptypeid">
            <Select v-model="followItem.followuptypeid" style="width: 160px;" placeholder="请选择跟进方式">
              <Option v-for="(item,index) in cluefollowuptypeList" :key="index" :value="item.value">{{item.key}}</Option>
            </Select>
          </FormItem>
        </div>
        <div class="ali-item">
          <span>客户级别：</span>
          <FormItem prop="clueslevel">
            <Select v-model="followItem.clueslevel" style="width: 160px;" placeholder="选择客户级别">
              <Option v-for="(item,index) in cluelevelList" :key="index" :value="item.value">{{item.key}}</Option>
            </Select>
          </FormItem>
        </div>
      </div>
      <div class="jus-item" v-if="followItem.clueslevel === '2' || followItem.clueslevel === '3' || followItem.clueslevel === '4'">
        <div class="item">
          <span>下次回访：</span>
          <FormItem prop="addday">
            <DatePicker v-model="followItem.addday" format="yyyy/MM/dd" @on-change="changevisitTime" type="date" show-week-numbers placeholder="下次回访" style="width: 160px"></DatePicker>
          </FormItem>
        </div>
        <div class="item">
          <span>预期价格：</span>
          <FormItem prop="price">
            <i-input style="width: 160px;" placeholder="选填" v-model="followItem.price">
              <span slot="append">万</span>
            </i-input>
          </FormItem>
        </div>
      </div>
      <div class="jus-item" v-if="followItem.clueslevel === '5'">
        <div class="item">
          <span>成交时间：</span>
          <FormItem prop="dealtdate">
            <DatePicker v-model="followItem.dealtdate" format="yyyy/MM/dd" @on-change="changesuccessTime" type="date" show-week-numbers placeholder="成交时间" style="width: 160px"></DatePicker>
          </FormItem>
        </div>
        <div class="item">
          <span>成交价格：</span>
          <FormItem prop="price">
            <i-input style="width: 160px;" placeholder="选填" v-model="followItem.price">
              <span slot="append">万</span>
            </i-input>
          </FormItem>
        </div>
      </div>
      <div class="jus-item" v-if="followItem.clueslevel === '6'">
        <div class="item">
          <span>战败时间：</span>
          <FormItem prop="faildate">
            <DatePicker v-model="followItem.faildate" format="yyyy/MM/dd" @on-change="changefaildate" type="date" show-week-numbers placeholder="战败时间" style="width: 160px"></DatePicker>
          </FormItem>
        </div>
        <div class="item">
          <span>战败原因：</span>
          <FormItem prop="failid">
            <Select v-model="followItem.failid" style="width: 160px;" placeholder="非必须">
              <Option v-for="(item,index) in failurecaseList" :key="index" :value="item.value">{{item.key}}</Option>
            </Select>
          </FormItem>
        </div>
      </div>
      <div class="ali-item" v-if="followItem.clueslevel === '7'">
        <span>无效原因：</span>
        <FormItem prop="invalidcaseid">
          <Select v-model="followItem.invalidcaseid" style="width: 160px;" placeholder="线索来源">
              <Option v-for="(item,index) in invalidcaseList" :key="index" :value="item.value">{{item.key}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="remark">
        <div class="remark-title">备注信息：<span><em>{{followItem.remark.length}}</em>/400</span></div>
        <FormItem prop="remark">
          <i-input type="textarea" v-model="followItem.remark" style="width: 568px;height: 110px;" :maxlength="400" :rows="5" placeholder="选填，如客户印象、意向程度等"></i-input>
        </FormItem>
      </div>
      <div class="upload-img">
      <FormItem prop="uploadList">
        <div class="demo-upload-list" v-for="(item, index) in followItem.uploadList" :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:104px;">
          <div class="default-img">
            <div class="up-name"><Icon type="camera" size="20" style="margin-right: 4px;"></Icon>上传图片</div>
          </div>
        </Upload>
      </FormItem>
      </div>
      <div slot="footer">
        <FormItem style="margin: 0;">
          <Button type="ghost" style="margin-left: 8px;width: 60px;" @click="handleReset('followItem')">取消</Button>
          <Button type="primary" style="width: 80px;" @click="handleSubmit('followItem')">保存</Button>
        </FormItem>
      </div>
    </Modal>
  </i-form>
</template>
<script>
export default {
  props: ['isShowFollow', 'cluesextendid'],
  data: () => ({
    // 跟进方式
    cluefollowuptypeList: [],
    // 用户级别列表
    cluelevelList: [],
    // 战败原因
    failurecaseList: [],
    // 无效列表
    invalidcaseList: [],
    // 录入信息
    followItem: {
      // 跟进时间
      followupdate: '',
      // 线索id
      cluesextendid: '',
      // 跟进方式
      followuptypeid: '1',
      // 客户级别
      clueslevel: '',
      // 下次回访时间
      addday: '',
      // 成交时间
      dealtdate: '',
      // 战败时间
      faildate: '',
      // 预期价格 || 成交价格
      price: '',
      // 战败原因
      failid: '',
      // 无效原因
      invalidcaseid: '',
      // 备注
      remark: '',
      // 图片list
      uploadList: []
    },
    // 验证规则
    ruleInline: {
      // 跟进方式
      followuptypeid: [
        {
          required: true,
          message: '请选择跟进方式',
          trigger: 'change'
        }
      ],
      // 客户级别
      clueslevel: [
        {
          required: true,
          message: '请选择客户级别',
          trigger: 'change'
        }
      ],
      // 下次回访时间
      addday: [
        {
          required: true,
          message: '请选择回访时间',
          trigger: 'change'
        }
      ],
      price: [
        {
          required: true,
          message: '请填写价格',
          trigger: 'blur'
        }
      ],
      // 成交时间
      dealtdate: [
        {
          required: true,
          message: '请选择成交时间',
          trigger: 'change'
        }
      ],
      // 战败时间
      faildate: [
        {
          required: true,
          message: '请选择战败时间',
          trigger: 'change'
        }
      ],
      // 战败原因
      failid: [
        {
          required: true,
          message: '请选择战败原因',
          trigger: 'change'
        }
      ],
      // 无效原因
      invalidcaseid: [
        {
          required: true,
          message: '请选择无效原因',
          trigger: 'change'
        }
      ]
    },
    defaultList: [
      {
        name: 'a42bdcc1178e62b4694c830f028db5c0',
        url:
          'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
      }
    ]
  }),
  created() {
    // 获取用户跟进方式
    let cluefollowuptypelist = this.getStorage('newcluefollowuptypelist')
    if (cluefollowuptypelist) {
      this.cluefollowuptypeList = cluefollowuptypelist.cluefollowuptypelist
    }
    // 获取用户级别列表
    let cluelevellist = this.getStorage('newcluelevellist')
    if (cluelevellist) {
      this.cluelevelList = cluelevellist.cluelevellist
    }
    // 获取战败原因列表
    let failurecaselist = this.getStorage('newfailurecaselist')
    if (failurecaselist) {
      this.failurecaseList = failurecaselist.failurecaselist
    }
    // 获取无效列表菜单
    let invalidcaselist = this.getStorage('newinvalidcaselist')
    if (invalidcaselist) {
      this.invalidcaseList = invalidcaselist.invalidcaselist
    }

    // 跟进时间
    let date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    this.day = date.getDate()
    // 跟进时间
    this.followItem.followupdate = `${this.year}-${this.addZero(this.month)}-${this.addZero(this.day)}`
  },
  mounted() {
    // this.followItem.uploadList = this.$refs.upload.fileList
  },
  methods: {
    // 隐藏录入
    hideAddFollow() {
      this.$refs['followItem'].resetFields()
      this.$emit('hideAddFollow', false)
    },
    // 下次回访时间
    changevisitTime(e) {
      this.followItem.addday = e
    },
    // 成交时间
    changesuccessTime(e) {
      this.followItem.dealtdate = e
    },
    // 战败时间
    changefaildate(e) {
      this.followItem.faildate = e
    },
    // 保存
    handleSubmit(name) {
      this.followItem.cluesextendid = this.cluesextendid
      this.$refs[name].validate(valid => {
        if (valid) {
          this.postData('/newsaasapi/Clues/AddClueFollowUp.aspx?', this.followItem, ele => {
            if (ele.data.status === 1) {
              this.$Message.success('添加成功')
              this.hideAddFollow()
            } else if (ele.data.status === 901) {
              this.clearInfo()
            } else {
              alert(ele.data.msg)
            }
          }, () => {
            alert('网络错误')
          })
        } else {
          this.$Message.error('内容不完整')
        }
      })
    },
    // 重置
    handleReset(name) {
      this.$refs[name].resetFields()
      this.hideAddFollow()
    },
    // 删除图片
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    // 上传成功
    handleSuccess(res, file) {
      file.url =
        'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    // 类型错误
    handleFormatError(file) {
      this.$Notice.warning({
        title: '图片类型错误',
        desc: '请选择jpg、png、jpeg类型图片'
      })
    },
    // 超过最大限制
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '图片大小超出限制',
        desc: '图片不能超过2M，请重新选择'
      })
    },
    // 图片上传前
    handleBeforeUpload() {
      const check = this.followItem.uploadList.length < 9
      if (!check) {
        this.$Notice.warning({
          title: '图片不能超过9张'
        })
      }
      return check
    },
    // 时间补0
    addZero(number) {
      if (number < 10) {
        return '0' + number
      } else {
        return number
      }
    }
  }
}
</script>
<style scoped>
  .title{
    font-size: 16px;
    color: #17181A;
    text-align: left;
    height: 22px;
    line-height: 22px
  }
  .jus-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .item{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .ali-item{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .jus-item span,.ali-item span{
    margin-bottom: 10px;
  }
  .remark{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .remark-title{
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .remark-title span{
    color: #999;
    font-size: 12px;
  }
  .remark-title span em{
    color: #F44336;
  }
  .default-img{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 104px;
    height: 69px;
    justify-content: center;
  }
  .up-name{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    color: #25A6FF;
  }
  .demo-upload-list{
    display: inline-block;
    width: 104px;
    height: 69px;
    text-align: center;
    line-height: 69px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list-cover i{
    position: absolute;
    right: 4px;
    bottom: 0;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
</style>
