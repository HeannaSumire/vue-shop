import { ref } from 'vue'
import { getCategoryAPI } from '@/apis/layout'
import { defineStore } from 'pinia'

//pinia只需要像这样 导出函数的形式即可当做全局对象使用   
export const useCategoryStore = defineStore('category', () => {
  //导航列表数据管理
  //state 导航列表数据
  const categoryList = ref([])
  //action
  const getCategory = async () => {
    const res = await getCategoryAPI()
    console.log(res)
    categoryList.value = res.result
  }
  return {
    categoryList,
    getCategory
  }
})
