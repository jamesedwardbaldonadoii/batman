<template>
  <div class="ui-checkbox component">
    <label
      class="flex justify-start items-start items-center cursor-pointer"
      :for="labelId"
    >
      <div class="bg-white rounded-full border-2 border-solid border-gray-600 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
        <input
          type="radio"
          class="opacity-0 absolute hidden"
          :checked="checked"
          :name="name"
          :value="val"
          v-on="listeners"
          :id="labelId"
        >

        <AppIcon
          class="app-icon fill-current w-4 h-4 text-green-500 pointer-events-none hidden"
          name="circleBlock"
        />

      </div>
      <div class="app-label select-none">{{ label }}</div>
    </label>
  </div>
</template>

<script>
import AppIcon from './Icons.vue';

export default {
  name: 'AppRadioButton',

  components: {
    AppIcon
  },

  props: {
    name: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    checked: {
      type: Boolean,
      required: true
    },
    val: {
      type: [Boolean, String],
      default: null
    }
  },

  data: () => {
    return {};
  },

  methods: {
    getRandomInt () {
      const min = 1;
      const max = 1000000000;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  },

  computed: {
    labelId () {
      return `formId${this.getRandomInt()}`;
    },
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
