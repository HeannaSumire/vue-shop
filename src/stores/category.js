import { ref } from 'vue'
import { getCategoryAPI } from '@/apis/layout'
import { defineStore } from 'pinia'

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
