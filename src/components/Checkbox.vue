<template>
  <label
    class="flex justify-start items-center cursor-pointer"
    :for="labelId"
  >
    <div class="bg-white rounded border-2 border-solid border-green-900 w-5 h-5 flex-shrink-0 mr-2">
      <input
        type="checkbox"
        class="opacity-0 hidden"
        :checked="value"
        :name="name"
        v-on="listeners"
        :id="labelId"
      >

      <app-icon
        class="app-icon pointer-events-none hidden"
        color="text-green-900"
        name="done"
      />
    </div>
    <div class="app-label select-none">{{ label }}</div>
  </label>
</template>

<script>
import AppIcon from './Icons.vue';

export default {
  name: 'AppCheckbox',

  components: {
    AppIcon
  },

  props: {
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: [Boolean, String],
      default: null
    }
  },

  data () {
    return {
      labelId: this.$randomId()
    };
  },

  computed: {,
    listeners () {
      return {
        ...this.$listeners,
        change: e => {
          this.$emit('change', e.target.checked);
        },
        input: e => {
          this.$emit('input', e.target.checked);
        }
      };
    }
  }
};
</script>
