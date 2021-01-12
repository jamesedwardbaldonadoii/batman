<template>
  <div class="component">
    <label
      class="flex justify-start items-center cursor-pointer"
      :for="labelId"
    >
      <div
        class="hover:bg-gray-300 w-8 h-8 flex flex-shrink-0 p-1 justify-center items-center rounded cursor-pointer transition-all ease-linear"
      >
        <input
          class="w-full h-full rounded cursor-pointer outline-none border-none shadow-none m-0 p-0"
          type="color"
          :name="name"
          :value="value"
          v-on="listeners"
          :id="labelId"
        >
      </div>
      <div class="app-label select-none">{{ label }}</div>
    </label>
  </div>
</template>

<script>

export default {
  name: 'AppRadioButton',
  props: {
    name: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: '#000000'
    }
  },

  data () {
    return {
      labelId: this.$randomId()
    };
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: e => {
          this.$emit('change', e.target.value);
        },
        input: e => {
          this.$emit('input', e.target.value);
        }
      };
    }
  }
};
</script>
