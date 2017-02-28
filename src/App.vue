<template>
  <div id="app">
    <div class="container">
      <img src="./assets/logo.png">
      <h1>{{ msg }}</h1>
      <div class="todoList">
        <div class="todo-header">
          <div class="el-input el-input--large">
            <i class="el-input__icon el-icon-star-on"></i>
            <input type="text" placeholder="TODO" class="el-input__inner" v-model.trim="todoText" @keydown.enter="todoEnter(todoText)">
          </div>
        </div>
        <div class="todo-body">
          <ul v-if="todoList.length > 0">
            <Item v-for="item in todoList" :item="item" :todoDel="todoDel" :itemCheckedChange="itemCheckedChange" />
          </ul>
          <div v-else>
            No Data.
          </div>
        </div>
        <div class="todo-footer" v-if="todoList.length > 0">
          <el-row>
            <el-col :span="18">
              <el-checkbox v-model="allChecked" @change="allCheckedChange">
                {{ checkNum }} finished / {{ total }} total
              </el-checkbox>
            </el-col>
            <el-col :span="6" class="btnCol">
              <el-button v-if="deleteFinished" type="danger" @click="todoDelFinish">delete finished</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from 'store';
import Item from './Item.vue';

export default {
  data () {
    const initialTodoList = [{
        id : new Date().getTime(),
        context : 'TODO1',
        checked : false,
    },];

    const todoList = store.get('vue_limit_todoList') ? store.get('vue_limit_todoList') : initialTodoList;

    return {
      msg: 'Vue TodoList',
      todoText: '',
      todoList: todoList,
    }
  },

  computed: {
    checkNum() {
      return this._getCheckedNum();
    },
    total(){
      return this.todoList.length;
    },
    allChecked(){
      return this._getCheckedNum() == this.todoList.length;
    },
    deleteFinished(){
      return this._getCheckedNum() > 0;
    },
  },

  components: {
    Item
  },

  methods: {
    saveTodoList(){
      store.set('vue_limit_todoList',this.todoList);
      return this;
    },
    todoEnter(todoText) {
      if(todoText == ""){
        this.$message({
          message: 'TodoText can not be empty.',
          type: 'error',
          duration : 1000,
        });
        return false;
      }

      if(this.todoList.filter( (item,index) => { return item.context == todoText; }).length > 0){
        this.$message({
          message: `Todo ${todoText} is existing.`,
          type: 'error',
          duration : 1000,
        });
        return false;
      }

      let todo = {
        id : new Date().getTime(),
        context : todoText,
        checked : false,
      }
      this.todoList.push(todo);
      this.saveTodoList();
    },
    itemCheckedChange(id){
      this.saveTodoList();
    },
    todoDel(id) {
      let index = this._getToDoIndex(id);
      let item = this.todoList[index];
      const { context, checked } = item;
      const tipsContent = checked ? `Delete ${context}?` : `Todo "${context}" is unfinished,do you want to delete it?`;
      this.$confirm(tipsContent, 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.todoList = this.todoList.filter( (item,index) => {
          return item.id != id;
        });
        this.saveTodoList();
      }).catch(() => {
        //  取消删除        
      });
    },
    allCheckedChange(event){
      const allChecked = event.target.checked;
      this.todoList.map(item => item.checked = allChecked);
      this.saveTodoList();
    },
    todoDelFinish(){
      if(this._getCheckedNum() < 1){
          this.$message({
            message: 'No finished to be deleted.',
            type: 'error',
            duration : 1000,
          });
          return false;
      }
      this.$confirm('Delete finished?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.todoList = this.todoList.filter( (item,index) => {
          return item.checked == false;
        });
        this.saveTodoList();
      }).catch(() => {
        //  取消删除        
      });
    },
    _getToDoIndex(id) {
      return this.todoList.findIndex(function(item, index, arr) {
        return item.id == id;
      });
    },
    _getCheckedNum(){
      return this.todoList.filter((item,index)=>{
        return item.checked == true;
      }).length;
    }
    // _titleCase(string){
    //   let StringArr = string.split('');
    //   StringArr[0] = StringArr[0].toLocaleUpperCase();
    //   return StringArr.join('');
    // }
  }
}
</script>

<style scoped>
body {
  font-family: Helvetica, sans-serif;
}
.container{
  margin:0 auto;
  width:700px;
  text-align:center;
}
.todo-body{
  margin-top: 16px;
}
.todo-body ul{
  text-align:left;
  list-style: none;
  padding:0;
  margin:0;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.btnCol{
  text-align:center;
}
.todo-footer{
  height: 62px;
  line-height: 42px;
  box-sizing: border-box;
  padding:10px;
  margin-top: 16px;
  text-align:left;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
