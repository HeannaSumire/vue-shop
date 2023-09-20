import { useIntersectionObserver } from "@vueuse/core"

//定义懒加载插件
export const lazyPlugin = {
    install(app) {
        //定义全局指令
        app.directive('img-lazy', {
            mounted(el, binding) {
                //el：指令绑定的元素 img
                //binding :binding.value 指令等于号后面绑定的表达式的值，url
                const { stop } = useIntersectionObserver(
                    el, ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            //是否进入视口
                            el.src = binding.value
                            stop()
                        }
                    }
                )
            }
        })
    }

}