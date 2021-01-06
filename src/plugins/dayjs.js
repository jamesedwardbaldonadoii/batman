import dayjs from 'dayjs';

dayjs.locale('en');

export default function install (Vue) {
  Object.defineProperties(Vue.prototype, {
    $dayjs: {
      get () {
        return dayjs;
      }
    }
  });
}
