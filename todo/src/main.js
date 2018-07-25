/*require('todomvc-app-css/index.css')*/


import css from 'todomvc-app-css/index.css'

import Vue from 'vue'


var filters = {
  all:function(todos){
    return todos
  },
  active:function(todos){
    return todos.filter(function(todo){
      return !todo.start
    })
  },
  completed:function(todos){
    return todos.filter(function(todo){
      return todo.start
    })
  }


};


var vm = new Vue({
  el : '.todoapp',
  data:{
    title:'todoList',
    newTodo:'',
    todos:[]
  },
  computed:{
    remain:function(){
      return filters.active(this.todos).length
    }
  },
  methods:{
    addTodo:function(){
      this.todos.push({
        content:this.newTodo,
        start:false
      });
      this.newTodo = '';
    },
    remTodo(index){
      this.todos.splice(index,1);
    },
    clearCompleted:function(){

    }



  }

})


