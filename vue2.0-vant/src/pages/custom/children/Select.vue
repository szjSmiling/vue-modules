<template>
  <div class="select-wrap">
    <!-- <input class="select-input" placeholder="请选择" v-model="selectUser.name" @blur="blurHandle" @focus="focusHandle"/> -->
    <button @click="setDefaultValue">模拟设置默认值: {{defaultValue}}</button>
    <div class="select-input" @click="clickHandle">
      {{selectUser.name || '请选择'}}
      <span class="select-clear" @click.stop="clearSelect">x</span>
      <div class="select-content">
        <ul class="select-list" ref="selectList" v-if="showSelect" v-scroll="loadMore">
          <li v-for="user in list"
            :class="user.id === selectUser.id ? 'active': ''"
            :key="user.id"
            @click.stop="selectHandle(user)">
            <p>{{user.name}}</p>
            <p>{{user.phone}}</p>
          </li>
        </ul>
        <div class="select-loading" v-show="loading">
          loading...
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.select-input{
  margin: 20px 0;
  padding-left: 2em;
  width:100%;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  border: 1px solid #ddd;
  position: relative;
}
.select-clear{
  float: right;
  font-size: 24px;
  padding: 0 15px;
  border: 1px solid #aaa;
  height: 28px;
  line-height: 24px;
  cursor: pointer;
  &:active{
    color: #fff;
    background: #eee;
  }
}
.select-content{
  width: 90%;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}
.select-list{
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 240px;
  overflow: auto;
  li{
    padding: 2px 2em;
    box-sizing: border-box;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    &.active{
      color: #f00;
      background: #eee;
    }
  }
}
.select-loading{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  font-size: 25px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script>
import throttle from 'lodash/throttle'

function awaitfn (current = 1) {
  let id = parseInt(Math.random(0, 1) * current * 10);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id)
    }, 100)
  })
}

export default {
  data() {
    return {
      showSelect: false,
      defaultValue: '',
      selectUser: {
        name: ''
      },
      loading: false,
      pagination: {
        current: 1,
      },
      list: [
        { id: 1, name: '用户1', phone: '手机号1' },
        { id: 2, name: '用户2', phone: '手机号2' },
        { id: 3, name: '用户3', phone: '手机号3' },
        { id: 4, name: '用户4', phone: '手机号4' },
        { id: 5, name: '用户5', phone: '手机号5' },
        { id: 6, name: '用户6', phone: '手机号6' },
        { id: 7, name: '用户7', phone: '手机号7' },
        { id: 8, name: '用户8', phone: '手机号8' },
        { id: 9, name: '用户9', phone: '手机号9' },
        { id: 10, name: '用户10', phone: '手机号10' },
      ]
    }
  },
  directives: {
    scroll: (target, binding, vnode) => {
      let current = vnode.context.pagination.current || 1
      target.addEventListener('scroll', (event) => {
        const scrollTop = event.target.scrollTop
        const scrollHeight = event.target.scrollHeight
        const clientHeight = event.target.clientHeight
        var distanceBottom = scrollHeight - clientHeight * current;
        if(distanceBottom * current - scrollTop <= 66) {
          binding.value()
        }
      })
    }
  },
  methods: {
    blurHandle(e) {
      this.showSelect = !this.showSelect
    },
    focusHandle(e) {
      this.showSelect = !this.showSelect
    },
    // --------------------
    clearSelect() {
      this.selectUser = this.$options.data().selectUser
      this.pagination = this.$options.data().pagination
      this.showSelect = false
    },
    async setDefaultValue() {
      this.clearSelect()
      const id = await awaitfn(this.pagination.current)
      let info = this.list.filter(user => user.id == id)
      
      if(info.length > 0) {
        this.defaultValue =  info[0].name
        this.selectUser = info[0]
      }else {
        this.defaultValue =  '未匹配到'
        this.clearSelect()
      }
    },
    clickHandle() {
      this.showSelect = !this.showSelect
      if(this.showSelect) {
        this.$nextTick(() => {
          if(this.selectUser.id >= 4) {
            this.$refs.selectList.scrollTo(0, 34.5 * (this.selectUser.id - 4))
          }
        })
      }
    },
    selectHandle(user) {
      this.selectUser = user;
      this.showSelect = false;
    },
    loadMore: throttle(function () {
      this.loading = true;
      for (let index = 1; index <= 10; index++) {
        let id = this.pagination.current * 10 + index;
        this.list.push({
          id,
          name: `用户${id}`,
          phone: `手机号${id}`
        })
      }
      setTimeout(() => {
        this.pagination.current++;
        this.loading = false;
        console.log(this.list);
      }, 500)
    }, 300, { leading: false, trailing: true })
  }
}
</script>