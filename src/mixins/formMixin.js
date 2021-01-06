export default {
  methods: {
    $validateForm (data = {}, rules = []) {
      const errors = [];
      const formatErr = [];

      if (this.$isEmpty(data)) {
        return false;
      }

      rules.forEach(rule => {
        const value = data[rule.key];

        // skip ID validation
        if (rule.id) {
          return;
        }

        // if required
        if (rule.required && !value) {
          errors.push(`${rule.key}:: ${rule.key} is required.`);
        }

        if (value) {
          // max number of characters
          if (rule.maxlength && (rule.maxlength < value.length)) {
            errors.push(`${rule.key}:: ${rule.key} exceeded max char of ${rule.maxlength}.`);
          }

          // min number of characters
          if (rule.minlength && (rule.minlength > value.length)) {
            errors.push(`${rule.key}:: ${rule.key} must have a min char of ${rule.minlength}.`);
          }

          // if has match regex
          if (rule.match && !new RegExp(rule.match[0].slice(1, -1), 's').test(value)) {
            errors.push(`${rule.key}:: ${rule.match[1]}`);
          }

          // if has enum values
          if (rule.values && (typeof rule.values.indexOf === 'function') && rule.values.indexOf(value) < 0) {
            errors.push(`${rule.key}:: ${rule.key} must match from one of these values ${rule.values}.`);
          }

          if (rule.format && rule.format === 'array') {
            if (!Array.isArray(value)) {
              errors.push(`${rule.key}:: ${rule.key} invalid format, must be ${this.$startCase(rule.format)}.`);
            }
            // type of
            // eslint-disable-next-line valid-typeof
          } else if (rule.format && (typeof value !== `${rule.format}`)) {
            errors.push(`${rule.key}:: ${rule.key} invalid format, must be ${this.$startCase(rule.format)}.`);
          }
        }
      });

      errors.forEach(err => {
        const e = err.split('::');
        if (!formatErr[e[0]]) {
          formatErr[e[0]] = [];
        }

        formatErr[e[0]].push(e[1]);
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    },

    $invalidForm (errors = [], entity = {}) {
      errors.forEach(err => {
        const error = err.split('::');
        this.$set(entity, error[0], error[1]);
      });
    },

    $clearForm (formEnt = {}, errorEnt = {}) {
      // Clear all form values
      Object.keys(formEnt).forEach((i, $index) => {
        this.$set(formEnt, i, null);
      });

      // Clear all errors
      Object.keys(errorEnt).forEach((i, $index) => {
        this.$set(errorEnt, i, null);
      });
    }
  }
};
