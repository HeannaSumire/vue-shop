import httpInstance from '@/utils/http'

//从后台获取数据
export function getBannerAPI() {
    return httpInstance({
        url: '/home/banner'
    })
}

export function getNewAPI() {
    return httpInstance({
        url: '/home/new'
    })
}

export function getHotAPI() {
    return httpInstance({
        url: '/home/hot'
    })
}