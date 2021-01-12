<template>
  <div class="component">
    <label
      class="flex justify-start items-center cursor-pointer"
      :for="labelId"
    >
      <div class="bg-white w-8 h-8 flex flex-shrink-0 justify-center items-center rounded">
        <input
          class="w-full h-full rounded"
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
