import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl;
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURl: this.baseUrl,
            headers: {
                //
            }
        }
        return config
    }
    // 全局拦截器
    interceptors(instance) {
        instance.interceptors.request.use(config => {
            //  添加全局loading
            // console.log(config)
            if (!Object.keys(this.queue).length) {
                // loading(url,[{call:true}]).into(TARGET, FIELD, [filters])
            }
            // this.queue[url] = true
            // config.headers['Authorization'] = getToken()
            return config
        }, error => {
            return Promise.reject(error)
        })
        instance.interceptors.response.use(res => {
            // console.log(res)
            const { data } = res
            return data
        }, error => {
            return Promise.reject(error)
        })
    }

    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance)
        return instance(options)
    }
}
export default HttpRequest
