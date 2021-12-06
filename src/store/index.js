import { createStore, createLogger } from 'vuex'

import config from './config'
import bus from './bus'
import driver from './driver'
import location from './location'
import journey from './journey'

import { debug } from '@/helpers/getVars.js'

export default createStore({
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    modules: {
        config,
        bus,
        driver,
        location,
        journey,
    },
})
