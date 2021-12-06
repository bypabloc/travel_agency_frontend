import axios from 'axios'

const baseURL = process.env.MIX_APP_URL ?? 'http://127.0.0.1:8000/api/';
const debug = process.env.MIX_APP_ENV === 'testing'

const format = 'json';
const tz_in_minutes = new Date().getTimezoneOffset();

const headers = {
    'Content-Type' : 'application/json',
    Accept : 'application/json',
    tz_in_minutes,
    lg : navigator.language || navigator.userLanguage,
    device: navigator.userAgent,
};

const instance = axios.create({
    mode: 'cors',
    cache: 'no-cache', 
    baseURL,
    headers,
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
});

instance.interceptors.response.use(
    response => response,
    error => {
        const { response } = error
        const { data, status } = response

        const res = {}

        switch (status) {
            case 422:
                const { errors, message } = data
                res['errors'] = errors ? errors : data
                break;

            case 419:
                window.location.reload()
                break;
        
            default:
                res['errors'] = ['Error no controlado']
                break;
        }

        return Promise.reject(res)
    }
)

export default {
    get({url,params}){
        return instance.get(url,{
            params: {
                ...params,
                format,
                tz_in_minutes,
            }
        })
    },
    
    post({url,params}){

        console.log('endpoint -> params',params)
        const param_with_format = {
            ...params,
            format,
            tz_in_minutes,
        }
        return instance.post(url,param_with_format,{
            params: {
                tz_in_minutes,
            }
        })
    },
}