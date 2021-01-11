<template>
  <div class="app-input box-border">
    <label
      class="app-label"
      :class="{ 'text-red-500': hasError }"
      :for="labelId"
    >{{ label }}</label>

    <div
      class="container"
      :class="[borderColor, disabledClass, {'border-red-500': hasError}]"
      :style="{height: height}"
    >
      <div
        class="slot before"
        v-if="$slots.before"
      >
        <slot name="before" />
      </div>

      <div class="flex-grow">
        <input
          ref="input"
          class="p-3 w-full h-full active:outline-none focus:outline-none leading-tight"
          :class="disabledClass"
          :id="labelId"
          :value="value"
          :type="inputType"
          :disabled="disabled"
          :maxlength="maxlength"
          :min="min"
          :max="max"
          :placeholder="placeholder || 'Type here..'"
          :accept="extension ? extension.join(',') : null"
          v-on="listeners"
          :required="required"
        >
      </div>

      <div
        class="slot after"
        v-if="$slots.after"
      >
        <slot name="after" />
      </div>
    </div>
    <em
      class="text-error"
      v-html="errorMessage"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    label: {
      type: String,
      default: null
    },
    password: {
      type: Boolean,
      default: false
    },
    email: {
      type: Boolean,
      default: false
    },
    url: {
      type: Boolean,
      default: false
    },
    file: {
      type: Boolean,
      default: false
    },
    image: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    },
    value: {
      type: [String, Object, Array, Boolean, Number],
      required: false,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    extension: {
      type: Array,
      default: null
    },
    maxlength: {
      type: Number,
      default: 250
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    error: {
      type: [String, Boolean],
      default: false
    }
  },
  data: () => {
    return {
      borderColor: 'border-gray-200'
    };
  },
  computed: {
    labelId () {
      return `formId${this.getRandomInt()}`;
    },
    hasError () {
      return !!this.error;
    },
    errorMessage () {
      return this.error ? this.error : '';
    },
    inputType () {
      if (this.file || this.image) {
        return 'file';
      }
      if (this.password) {
        return 'password';
      }
      if (this.number) {
        return 'number';
      }
      if (this.email) {
        return 'email';
      }
      if (this.url) {
        return 'url';
      }
      return 'text';
    },
    listeners () {
      return {
        ...this.$listeners,
        focus: e => {
          this.$emit('focus', e);
          this.borderColor = 'border-teal-500';
        },
        input: e => this.$emit('input', e.target.value),
        blur: e => {
          this.$emit('blur', e);
          this.borderColor = 'border-gray-200';
        }
      };
    },
    disabledClass () {
      if (this.disabled) {
        return 'app-disabled';
      }
      return 'text-gray-700';
    }
  },
  methods: {
    getRandomInt () {
      const min = 1;
      const max = 1000000000;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
};
</script>
