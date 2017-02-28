<template>
  <li @mouseenter="mouseenter" @mouseleave="mouseleave">
    <el-row>
      <el-col :span="18">
        <el-checkbox v-model="item.checked" @change="itemCheckedChange">
          <span :class="{ 'line-through' : item.checked }">{{ item.context }}</span>
        </el-checkbox>
      </el-col>
      <el-col :span="6" class="btnCol">
        <el-button v-if="hover" type="danger" @click="todoDel(item.id)">delete</el-button>
      </el-col>
    </el-row>
  </li>
</template>

<script>

export default {
  props: ['item','todoDel','itemCheckedChange'],
  data () {
    return {
      hover : false,
    }
  },

  methods: {
    mouseenter() {
      this.hover = true;
    },
    mouseleave(){
      this.hover = false;
    },
  }
}
</script>

<style scoped>
.line-through{
  text-decoration: line-through;
}
li{
  height: 62px;
  line-height: 42px;
  box-sizing: border-box;
  padding:10px;
  border-top:1px solid #ddd;
}
li:first-child{
  border-top:0;
}
li .checkBoxCol{

}
.btnCol{
  text-align:center;
}
</style>
