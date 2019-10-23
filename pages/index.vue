<template>
    <div style="padding: 10px;background: #f8f8f9;padding-bottom:50px;">
<van-panel :title="userInfo.name" :desc="incomedesc" :status="status" :icon="userInfo.avatar">
  <div>
    <van-grid :column-num="3" :gutter="10" >
      <van-grid-item icon="photo-o"  >
        <div>{{userInfo.income}}</div>
        <div class="van-grid-item__text">总收益</div>
      </van-grid-item>
      <van-grid-item icon="home-o" text="" dot >
        <div>{{userInfo.income}}</div>
        <div class="van-grid-item__text">活动收益</div>
      </van-grid-item>
      <van-grid-item  text="活动收益" dot>
        <!-- <van-tag plain type="primary">标签</van-tag> -->
        <div>{{userInfo.income}}</div>
        <div class="van-grid-item__text">邀请收益</div>
        <!-- <van-button :loading="replay" loading-type="spinner" type="info" loading-text="  " size="small" icon="replay" @click="fetchIncome">刷新</van-button> -->
      </van-grid-item>
</van-grid>
  </div>
  <div slot="footer" class="ta-right">
    <van-button :loading="replay" loading-type="spinner" type="info" size="small" icon="replay" @click="fetchIncome">刷新</van-button>
    <van-button size="small" type="primary">提现</van-button>
  </div>
</van-panel>
<van-panel title="关注公众号" >
  <div>
    <img :src="qrcode.publicQrcode" alt="">
    <div>长按关注公众号</div>
  </div>
</van-panel>
<van-panel title="邀请好友分提成" >
  <div>
    <img :src="qrcode.inviteQrcode" alt="">
    <van-button type="primary" size="large" @click="copyInviteUrl">复制链接发送给好友</van-button>
  </div>
</van-panel>
<van-goods-action style="margin-bottom:10px;">
  <van-goods-action-button :type="readButtonType" :text="autoreadDesc" @click="onClickReadButton" />
  <van-goods-action-button type="info" text="下载助手" @click="onClickButton" />
</van-goods-action>
    </div>
</template>
<script>
    import QRCode from 'qrcode'
    import copy from 'copy-html-to-clipboard'
    export default {
        data () {
            return {
                qrcodeOpt:{
                  errorCorrectionLevel: 'H',
                  type: 'image/jpeg',
                  rendererOpts: {
                    quality: 0.3
                  }
                },
                qrcode:{
                  publicQrcode:'',
                  inviteQrcode:'',
                  inviteUrl:'http://choukin.github.io/'
                },
                userInfo:{
                  avatar:'https://avatars1.githubusercontent.com/u/6270610?s=40&v=4',
                  name:'你好 choukin!',
                  income: 20
                },
                replay: false,
                autoread:false,
                switchValue: true
            }
        },
        computed: {
          incomedesc (){
            return `当前收入¥:${this.userInfo.income}`
          },
          status () {
            return this.userInfo.income >1 ? '可提现' : '不可提现'
          },
          autoreadDesc () {
            return this.autoread?'停止阅读':'开始阅读'
          },
          readButtonType () {
            return this.autoread?'warning':'primary'
          }
        },
        mounted() {
          // let [a, b, c] = [1, 2, 3];
          // console.log(a,b,c)
          // let [,,third] = ['one','two','three']
          // console.log(third)
          // let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
          // console.log(baz)
          // 自定义加载图标
         const toast = this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0, 
            loadingType: 'spinner'
          })
          this.createQrcode(this.qrcode.inviteUrl,'inviteQrcode')
          this.createQrcode('http://choukin.github.io/','publicQrcode')
          toast.clear()
        },
        methods: {
          createQrcode(textUrl='',type='') {
            const _this = this
            
            
            QRCode.toDataURL(textUrl, this.qrcodeOpt, function (err, url) {
              if (err) throw err
              // var img = document.getElementById('image')
              _this.$set(_this.qrcode,type,url)
              // _this.qrcode.publicQrcode = url
              // img.src = url
            })
          },
          fetchIncome() {
            this.replay = true
            setTimeout(() => {
              this.replay = false
              this.userInfo.income+=1
            }, 1000);
          },
          onClickReadButton(){
              this.autoread=!this.autoread
              if (this.autoread) {
                this.$notify({ 
                  type: 'primary', 
                  message: '开始阅读',
                  onClose:()=>{
                      this.autoRead()
                  }})
              }
          },
          autoRead(){
                    this.$notify({ 
                      type: 'primary', 
                      message: '获取文章中...',
                      onClose:()=>{
                        this.$notify({ 
                          type: 'success', 
                          message: '获取文章成功',
                          onClose:()=>{
                            this.autoRead()
                          } 
                          });
                      }
                     });
          },
          onClickButton(){

          },
          copyInviteUrl () {
            copy(this.qrcode.inviteUrl)
            this.$notify({ 
              type: 'success', 
              message: '复制成功，发送给好友吧',
              onClose:()=>{
              } 
              });
          }

        },
    }
</script>
<style>
  .van-panel__content {
    padding: 20px;
  }
  .van-panel__content div {
    text-align: center;
  }
  .van-cell-group + .van-cell-group{
    margin-top:10px;
  }
  .ta-right{
    text-align: right;
  }
</style>

