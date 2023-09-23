import request from '@/utils/http'
//商品详情
export const getDetail = (id) => {
    return request({
        url: '/goods',
        params: {
            id
        }
    })
}
//热榜  id:商品id；type:1代表24小时热销榜，2代表周热榜；limit：获取个数
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
    return request({
        url: '/goods/hot',
        params: {
            id,
            type,
            limit
        }
    })
}