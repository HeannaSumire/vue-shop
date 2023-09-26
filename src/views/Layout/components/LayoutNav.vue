<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

const confirm = () => {
  //退出登录业务
  userStore.clearUserInfo()
  router.push('/login')
}
</script>
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模板渲染 区分登录状态和非登录状态 是否有token -->
        <template v-if="userStore.userInfo.token">
          <li>
            <a href="javascript:;" @click="$router.push('/member')"
              ><i class="iconfont icon-user"></i>Me</a
            >
          </li>
          <li>
            <el-popconfirm
              title="确认退出吗？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="confirm"
            >
              <template #reference><a href="javascript:;">退出登录</a></template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
          <li><a href="javascript:;" @click="$router.push('/member')">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <!-- 在 Vue 中，以 $ 开头的变量通常是全局对象或实例的属性和方法。Vue 实例的属性和方法会以 $ 开头，以示它们属于 Vue 实例 -->
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: right;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
      }
      i {
        font-size: 14px;
        margin-right: 2px;
      }
      &:hover {
        color: $xtxColor;
      }
    }
    ~ li {
      a {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>
