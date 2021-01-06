/**
 * import and init global plugins
 */

import Vue from 'vue';

import globalEventBus from '../plugins/globalEventBus';
import dayjs from '../plugins/dayjs';

Vue.use(globalEventBus);
Vue.use(dayjs);
