import axios from 'axios'

const baseURL = process.env.MIX_APP_URL ?? 'http://127.0.0.1:8000/';
const debug = process.env.MIX_APP_ENV === 'testing'

const headers = {
    'Content-Type' : 'application/json',
    Accept : 'application/json',
    tz_in_minutes : new Date().getTimezoneOffset(),
    lg : navigator.language || navigator.userLanguage,
    device: navigator.userAgent,
};

export default {
    get({url,params}){
        const instance = axios.create({
            method: 'GET', 
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
                if (error.response && 419 === error.response.status) {
                    window.location.reload()
                }
        
                return Promise.reject(error)
            }
        )

        return instance.get(url,{params})
    },
    post({url,params}){

        const instance = axios.create({
            method: 'GET', 
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
                        res['errors'] = errors
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

        return instance.post(url,params)
    },
}