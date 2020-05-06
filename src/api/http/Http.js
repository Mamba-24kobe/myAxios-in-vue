import axios from 'axios'
import Services from './ContactList'
import {Toast} from 'vant'
let instance  = axios.create({
    baseURL: 'http://localhost:9000/api/',
    timeout: 2000,
})
const Http = {}
for (let key in Services) {
    let api = Services[key]   
    Http[key] = async function(params,isFormData=false,config={}) {
        let newParams = {} 
        if (params&&isFormData) {
            let formData = new FormData()
            for (let i in params) {
                formData.append(i, params[i])
            }
            newParams = formData
        } else {
            newParams = params
        }
        console.log(newParams)
        let url = api.url
        let method = api.method
        let response = null
        
        if ( method=='post' || method=='put' || method=='patch') {
            try{
                let res = await instance[method](url,newParams,config)
                console.log(res)
                response = res
            }catch(err){
                response = err
                // return Promise.reject(err);
            }
        } else if ( method=='get' || method=='delete') {
            config.params = params
            try{
                let res = await instance[method](url,config)
                response = res
            }catch(err){
                response = err
                console.log(err)
                return Promise.reject(err);
            }       
        }
        console.log(response)
        return response
    }
}
instance.interceptors.request.use( config => {
    Toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner'
    })
    return config
}, (err) => {
    Toast.clear()
    Toast.fail({
        message: '请求错误，请稍后重试！',
        forbidClick: true,     
    })
    return Promise.reject(err);
})
instance.interceptors.response.use( res => {
    Toast.clear()
    Toast.success({
        message: '请求成功！',
        forbidClick: true,     
    })
    return res.data
}, (err) => {
    Toast.clear()
    // Toast.fail({
    //     message: '请求失败，请稍后重试！',
    //     forbidClick: true,     
    // })
    console.log(err)
    return Promise.reject(err);
})
export default Http
