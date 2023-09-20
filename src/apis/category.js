import request from '@/utils/http'

//获取一级分类列表
export function getCategoryAPI(id) {
    return request({
        url: '/category',
        params: {
            id
        }
    })
}