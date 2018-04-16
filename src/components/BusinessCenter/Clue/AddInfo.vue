<template>
  <i-form ref="formInline" :model="formInline" :rules="ruleInline">
    <Modal :value="isShow" width="600" @on-cancel="hideAdd">
      <p slot="header" class="title">
        <span>录入</span>
      </p>
      <div class="jus-item">
        <div class="item">
          <span>客户姓名：</span>
          <FormItem prop="realname">
            <i-input type="text" v-model="formInline.realname" placeholder="请输入客户姓名" :maxlength="4" style="width: 160px;"></i-input>
          </FormItem>
        </div>
        <div class="item">
          <span>联系电话：</span>
          <FormItem prop="tel">
            <i-input v-model="formInline.tel" placeholder="必填，15位数字以内" :maxlength="15" style="width: 160px;"></i-input>
          </FormItem>
        </div>
      </div>
      <div class="ali-item">
        <span>省份城市：</span>
        <FormItem prop="provincesn">
          <Select v-model="formInline.provincesn" style="width: 160px;" placeholder="选择省份">
              <Option :value="item.provincesn" v-for="(item,index) in provinceList" :key="index">{{item.provincename}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="citysn">
          <Select v-model="formInline.citysn" style="width: 160px;margin-left: 10px;" placeholder="选择城市">
            <Option :value="item.citysn" v-for="(item,index) in cityList[formInline.provincesn]" :key="index">{{item.cityname}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="ali-item">
        <span>品牌车系：</span>
        <FormItem prop="brandid">
          <Select v-model="formInline.brandid" style="width: 160px;" placeholder="选择品牌">
            <Option :value="0">全部品牌</Option>
            <Option :value="item.brandid" v-for="(item,index) in brandList" :key="index">{{item.brandname}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="seriesid">
          <Select v-model="formInline.seriesid" @on-change="selectSeries" style="width: 160px;margin-left: 10px;" placeholder="选择类别">
            <Option :value="0">全部车系</Option>
            <OptionGroup v-for="(item,index) in seriesList[formInline.brandid]" :key="index" :label="item[0].subcategoryname">
                <Option v-for="(ele,number) in item" :ref="`series${ele.seriesid}`" :key="number" :value="ele.seriesid" :data-id="ele.subcategoryid">{{ele.seriesname}}</Option>
            </OptionGroup>
          </Select>
        </FormItem>
      </div>
      <div class="ali-item">
        <span>意向车型：</span>
        <FormItem prop="truckid">
          <Select v-model="formInline.truckid" style="width: 500px;" placeholder="选择车型">
            <Option :value="0">全部车型</Option>
            <Option :value="item.productid"  v-if="item.brandid === formInline.brandid && item.seriesid === formInline.seriesid" v-for="(item,index) in productList" :key="index">{{item.productid}}{{item.productname}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="ali-item">
        <span>客户级别：</span>
        <FormItem prop="clueslevel">
          <Select v-model="formInline.clueslevel" style="width: 160px;" placeholder="选择客户级别">
            <Option v-for="(item,index) in cluelevelList" :value="item.value" :key="index">{{item.key}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="jus-item" v-if="formInline.clueslevel === '2' || formInline.clueslevel === '3' || formInline.clueslevel === '4'">
        <div class="item">
          <span>下次回访：</span>
          <FormItem prop="addday">
            <DatePicker v-model="formInline.addday" format="yyyy/MM/dd" @on-change="changeaddday" type="date" show-week-numbers placeholder="下次回访" style="width: 160px"></DatePicker>
          </FormItem>
        </div>
        <div class="item">
          <span>预期价格：</span>
          <FormItem prop="dealtprice">
            <i-input style="width: 160px;" placeholder="选填" v-model="formInline.dealtprice">
              <span slot="append">万</span>
            </i-input>
          </FormItem>
        </div>
      </div>
      <div class="jus-item" v-if="formInline.clueslevel === '5'">
        <div class="item">
          <span>成交时间：</span>
          <FormItem prop="dealtdate">dealtdate
            <DatePicker v-model="formInline.dealtdate" format="yyyy/MM/dd" @on-change="changedealtdate" type="date" show-week-numbers placeholder="成交时间" style="width: 160px"></DatePicker>
          </FormItem>
        </div>
        <div class="item">
          <span>成交价格：</span>
          <FormItem prop="dealtprice">
            <i-input style="width: 160px;" placeholder="选填" v-model="formInline.dealtprice">
              <span slot="append">万</span>
            </i-input>
          </FormItem>
        </div>
      </div>
      <div class="jus-item" v-if="formInline.clueslevel === '6'">
        <div class="item">
          <span>战败时间：</span>
          <FormItem prop="faildate">
            <DatePicker v-model="formInline.faildate" format="yyyy/MM/dd" @on-change="changefaildate" type="date" show-week-numbers placeholder="战败时间" style="width: 160px"></DatePicker>
          </FormItem>
        </div>
        <div class="item">
          <span>战败原因：</span>
          <FormItem prop="fail">
            <Select v-model="formInline.fail" style="width: 160px;" placeholder="非必须">
              <Option v-for="(item,index) in fail" :key="index" :value="item.value">{{item.key}}</Option>
            </Select>
          </FormItem>
        </div>
      </div>
      <div class="ali-item" v-if="formInline.clueslevel === '7'">
        <span>无效原因：</span>
        <FormItem prop="invalidcaseid">
          <Select v-model="formInline.invalidcaseid" style="width: 160px;" placeholder="选择无效原因">
            <Option v-for="(item,index) in invalidcaseid" :value="item.value" :key="index">{{item.key}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="ali-item">
        <span>线索来源：</span>
        <FormItem prop="clueresourceid">
          <Select v-model="formInline.clueresourceid" style="width: 160px;" placeholder="线索来源">
            <Option v-for="(item,index) in clueresourceid" :key="index" :value="item.value">{{item.key}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="jus-item">
        <div class="item">
          <span>车辆用途：</span>
          <FormItem prop="cheliangyongtuid">
            <Select v-model="formInline.cheliangyongtuid" style="width: 160px;" placeholder="非必须">
              <Option v-for="(item,index) in cheliangyongtuid" :key="index" :value="item.value">{{item.key}}</Option>
            </Select>
          </FormItem>
        </div>
        <div class="item">
          <span>购车数量：</span>
          <FormItem prop="expectedbycarnum">
            <i-input style="width: 160px;" v-model="formInline.expectedbycarnum" placeholder="选填，请输入正整数">
              <span slot="append">辆</span>
            </i-input>
          </FormItem>
        </div>
      </div>
      <div class="remark">
        <div class="remark-title">备注信息：<span><em>{{formInline.remark.length}}</em>/400</span></div>
        <FormItem prop="remark">
          <i-input type="textarea" v-model="formInline.remark" style="width: 568px;height: 110px;" :maxlength="400" :rows="5" placeholder="选填，如客户印象、意向程度等"></i-input>
        </FormItem>
      </div>
      <div slot="footer">
        <FormItem style="margin: 0;">
          <Button type="ghost" style="margin-left: 8px;width: 60px;" @click="handleReset('formInline')">取消</Button>
          <Button type="primary" style="width: 80px;" @click="handleSubmit('formInline')">保存</Button>
        </FormItem>
      </div>
    </Modal>
  </i-form>
</template>
<script>
export default {
  props: ['isShow'],
  data: () => ({
    // 省市列表
    provinceList: [],
    cityList: [],
    // 线索来源
    clueresourcelist: [],
    // 品牌列表
    brandList: [],
    // 车系列表
    seriesList: {},
    // 车型列表
    productList: [],
    // 客户级别列表
    cluelevelList: [],
    // 购车用途
    cheliangyongtuid: [],
    // 线索来源
    clueresourceid: [],
    // 战败原因
    fail: [],
    // 无效原因列表
    invalidcaseid: [],
    // 录入信息
    formInline: {
      // 用户姓名
      realname: '',
      // 联系方式
      tel: '',
      // 省份城市
      provincesn: '',
      citysn: '',
      // 品牌车系
      brandid: '',
      // 类别
      category: '',
      // 车系
      seriesid: '',
      // 车型
      truckid: '',
      // 客户级别
      clueslevel: '',
      // 下次回访时间
      addday: '',
      // 成交时间
      dealtdate: '',
      // 战败时间
      faildate: '',
      // 预期价格
      dealtprice: '',
      // 成交价格
      successPrice: '',
      // 战败原因
      fail: '',
      // 无效原因
      invalidcaseid: '',
      // 线索来源
      clueresourceid: '',
      // 车辆用途
      cheliangyongtuid: '',
      // 购车数量
      expectedbycarnum: '',
      // 备注
      remark: ''
    },
    ruleInline: {
      // 用户姓名
      realname: [
        {
          required: true,
          message: '请输入客户姓名',
          trigger: 'blur'
        }
      ],
      // 联系方式
      tel: [
        {
          required: true,
          message: '请输入客户联系方式',
          trigger: 'blur'
        }
      ],
      // 省份
      provincesn: [
        {
          required: true,
          message: '请选择省份',
          trigger: 'change',
          type: 'number'
        }
      ],
      // 城市
      citysn: [
        {
          required: true,
          message: '请选择城市',
          trigger: 'change',
          type: 'number'
        }
      ],
      // 品牌
      brandid: [
        {
          required: true,
          message: '请选择品牌',
          trigger: 'change',
          type: 'number'
        }
      ],
      // 类别
      seriesid: [
        {
          required: true,
          message: '请选择车系',
          trigger: 'change',
          type: 'number'
        }
      ],
      // 车型
      truckid: [
        {
          required: true,
          message: '请选择车型',
          trigger: 'change',
          type: 'number'
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
          message: '请选择下次回访时间',
          trigger: 'change'
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
          message: '请选择客户级别',
          trigger: 'change'
        }
      ],
      // 战败时间
      invalidcaseid: [
        {
          required: true,
          message: '请选择无效原因',
          trigger: 'change'
        }
      ],
      // 线索来源
      clueresourceid: [
        {
          required: true,
          message: '请选择线索来源',
          trigger: 'change'
        }
      ],
      // 线索来源
      cheliangyongtuid: [
        {
          required: true,
          message: '请选择车辆用途',
          trigger: 'change'
        }
      ],
      // 联系方式
      expectedbycarnum: [
        {
          required: true,
          message: '请输入客户联系方式',
          trigger: 'blur'
        }
      ]
    }
  }),
  created() {
    // 请求城市信息
    let provincelist = this.getStorage('newsalesprovincelist')
    if (provincelist) {
      this.provinceList = provincelist.salesprovincelist
      // this.provinceList.unshift({ provincename: '全部', provincesn: '' })
    }
    // 获取城市列表
    let citylist = this.getStorage('newsalescitylist')
    if (citylist) {
      this.cityList = citylist.salescitylist
    }
    // 线索来源取得
    let clueresourcelist = this.getStorage('newclueresourcelist')
    if (clueresourcelist) {
      this.clueresourceid = clueresourcelist.clueresourcelist
    }
    // 获取品牌列表
    let brandlist = this.getStorage('newbrandlist')
    if (brandlist) {
      this.brandList = brandlist.brandlist
    }
    // 获取车系列表
    let serieslist = this.getStorage('newserieslist')
    if (serieslist) {
      this.seriesList = serieslist.serieslist
    }
    console.log(this.seriesList, 'seriesList')

    // 获取车型列表
    let productlist = this.getStorage('newproductlist')
    if (productlist) {
      this.productList = productlist.productlist
    }
    console.log(this.productList, 'productList')
    // 获取用户级别列表
    let cluelevellist = this.getStorage('newcluelevellist')
    if (cluelevellist) {
      this.cluelevelList = cluelevellist.cluelevellist
    }

    // 请求购车用途
    let carusagelist = this.getStorage('newcarusagelist')
    if (carusagelist) {
      this.cheliangyongtuid = carusagelist.carusagelist
    }
    // 获取战败原因列表
    let fail = this.getStorage('newfailurecaselist')
    if (fail) {
      this.fail = fail.failurecaselist
    }
    // 获取无效列表菜单
    let invalidcaseid = this.getStorage('newinvalidcaselist')
    if (invalidcaseid) {
      this.invalidcaseid = invalidcaseid.invalidcaselist
    }
  },
  methods: {
    changeSelect(e) {
      console.log(e)
    },
    // 隐藏录入
    hideAdd() {
      this.$refs['formInline'].resetFields()
      this.$emit('hideAdd', false)
    },
    // 选择车系
    selectSeries(e) {
      this.formInline.subcategoryid = this.$refs[`series${e}`][0].$attrs['data-id']
    },
    // 下次回访时间
    changeaddday(e) {
      this.formInline.addday = e
    },
    // 成交时间
    changedealtdate(e) {
      this.formInline.dealtdate = e
    },
    // 战败时间
    changefaildate(e) {
      this.formInline.faildate = e
    },
    // 保存
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
          if (this.formInline.realname && this.formInline.realname.length > 4) {
            this.$Message.success('名字最多输入4个字符喔~')
            return
          }
          if (this.formInline.tel && this.formInline.tel.length > 15) {
            this.$Message.success('联系电话最多输入15个数字喔~')
            return
          }
          // 如果字符数超过
          if (this.formInline.remark.length > 800) {
            this.$Message.success('备注最多输入800个字符喔~')
            return
          }
          this.postData('/newsaasapi/Clues/AddClues.aspx?', this.formInline, ele => {
            if (ele.data.status === 1) {
              // 提示
              this.$Message.success('添加成功!')
              // 关闭添加层
              this.hideAdd()
              // 如果是400转化成线索  添加成功  && 存储信息
              // if (this.$route.query.id) {
              //   this.setStorage('addClue400', this.$route.query)
              // }
              // // 如果是400转化过来的线索 存储数据
              // this.$emit('toastPop', '添加成功')
              // if (this.$route.query.change) {
              //   this.$router.go(-2)
              // } else {
              //   this.$router.go(-1)
              // }
            } else if (ele.data.status === 901) {
              this.clearInfo()
            } else {
              // 转交 成功 || 失败 弹出提示层
              this.confirmInfo.content = ele.data.msg
              this.$Message.success(ele.data.msg)
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
      this.hideAdd()
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
</style>
