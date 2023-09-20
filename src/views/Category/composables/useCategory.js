// 封装分类数据业务相关代码
import { onMounted, ref } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
    // 获取分类数据
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => getCategory())

    //目标：路由参数变化的时候，重新获取对应分类数据
    onBeforeRouteUpdate((to) => {
        //to就是RouterLink里的to 目标路由参数
        getCategory(to.params.id)
    })
    return {
        categoryData
    }
}