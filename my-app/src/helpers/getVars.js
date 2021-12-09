export const debug = () => {
    return process.env.VUE_APP_ENV === 'development';
}