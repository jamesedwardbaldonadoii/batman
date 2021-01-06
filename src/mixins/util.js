export default {
  methods: {
    $isEmpty: obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length,
    $pickBy (object, predicate = v => v) {
      return Object.assign(
        ...Object
          .entries(object)
          .filter(([, v]) => predicate(v))
          .map(([k, v]) => ({ [k]: v }))
      );
    },
    $camelCase (str) {
      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    },
    $startCase (str) {
      return str.replace(/\w\S*/g, function (t) {
        return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
      });
    }
  }
};
