/**
 * import and init global mixins
 */

import Vue from 'vue';

import generateRandomId from '../mixins/generateRandomId';
import formatDateTime from '../mixins/formatDateTime';
import currentUser from '../mixins/currentUser';
import dialogMixin from '../mixins/dialogMixin';
import formMixin from '../mixins/formMixin';
import jumpTo from '../mixins/jumpTo';
import util from '../mixins/util';

Vue.mixin(generateRandomId);
Vue.mixin(formatDateTime);
Vue.mixin(currentUser);
Vue.mixin(dialogMixin);
Vue.mixin(formMixin);
Vue.mixin(jumpTo);
Vue.mixin(util);
