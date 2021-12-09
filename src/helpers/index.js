export const arrayToString = (arr) => {
    let str = '';

    for (const i in arr) {
    	if((Array.isArray(arr[i]))){
        	str +=  `${i} ${arrayToString(arr[i])} <br/>`;
        }else{
        	str +=  `${arr[i]} `;
        }
    }

    return str;
};

export const getErrorsFromYup = ({arr,err}) => {
    for (const key in arr) {
        arr[key] = []
    }

    const { inner: errors } = err
    if(errors){
        for (const e of errors) {
            const { path, message } = e
            if(!arr[path]){
                arr[path] = [message];
            }else{
                arr[path].push(message)
            }
        }
    }

    return arr
};

// https://stackoverflow.com/a/66092645/7100847
export const requireImage = link => {
    return require(`@/assets/${link}`);
}