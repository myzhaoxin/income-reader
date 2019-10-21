<template>
    <div style="padding: 10px;background: #f8f8f9">
<van-panel title="标题" desc="描述信息" status="状态">
  <div>
    <van-grid square>
  <van-grid-item
    v-for="value in 8"
    :key="value"
    icon="photo-o"
    text="文字"
  />
</van-grid>
  </div>
  <div slot="footer">
    <van-button size="small">按钮</van-button>
    <van-button size="small" type="danger">按钮</van-button>
  </div>
</van-panel>
<van-goods-action>
  <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
  <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
</van-goods-action>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                switchValue: true
            }
        },
    }
</script>