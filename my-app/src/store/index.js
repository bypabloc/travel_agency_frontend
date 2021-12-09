import { createStore, createLogger } from 'vuex'

import config from './config'
import bus from './bus'
import driver from './driver'
import location from './location'
import journey from './journey'
import passenger from './passenger'
import seat from './seat'
import journey_driver from './journey_driver'
import ticket from './ticket'

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
        passenger,
        seat,
        journey_driver,
        ticket,
    },
})
