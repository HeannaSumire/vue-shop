//封装购物车Store
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { delCartAPI, findNewCartListAPI, insertCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    //state
    const cartList = ref([])
    //action
    //添加
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            //登录之后的加入购物车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            //已添加过 - count+1
            //未添加过 - 直接push
            //通过匹配传递过来的商品对象中的skuId能不能在cartList中找到
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }
    }
    //删除
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        } else {
            cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
        }
    }
    //获取最新购物车列表
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    const clearCart = () => {
        cartList.value = []
    }

    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }

    //是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    //全选功能
    const allCheck = (selected) => {
        //将每一项都设定为当前状态
        cartList.value.forEach(item => item.selected = selected)
    }

    //计算属性
    //1.总数
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    //2.总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    // 3. 结算时已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    // 4. 结算时已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
}, {
    persist: true
})