<template>
  <div class="app-input">
    <label
      :class="{ 'text-red-500': hasError }"
      :for="labelId"
    >{{ label }}</label>

    <div
      class="container"
      :class="[borderColor, disabledClass, {'border-red-500': hasError}]"
      :style="{height: height}"
    >
      <div class="flex-grow">
        <textarea
          ref="textarea"
          class="p-3 w-full active:outline-none focus:outline-none leading-tight resize-none h-24"
          :class="disabledClass"
          :id="labelId"
          :value="value"
          :disabled="disabled"
          :maxlength="maxlength"
          :placeholder="placeholder || 'Type here..'"
          v-on="listeners"
          autocomplete="new-password"
        />
        <div
          v-if="maxlength"
          class="text-gray-400 text-right text-sm pr-1"
        >
          {{ maxlength - (this.value ? this.value.length : 0) }}
        </div>
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
  name: 'AppTextarea',
  props: {
    label: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 250
    },
    height: {
      type: String,
      default: 'auto'
    },
    value: {
      type: [Number, String],
      required: false,
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
      borderColor: 'border-gray-200',
      errorMsg: ''
    };
  },
  computed: {
    labelId () {
      return `formId${this.getRandomInt()}`;
    },
    hasError () {
      return this.error;
    },
    errorMessage () {
      return typeof this.error === 'boolean' ? this.errorMsg : this.error;
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
