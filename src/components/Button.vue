<template>
  <button
    class="app-button"
    :disabled="disabledBtn"
    :class="[btnColorClass, textColorClass, btnSizeClass, disabledBtn, {'rounded-full': circle, 'border-0': borderless}]"
    v-on="listeners"
  >
    <AppLoader
      v-if="loading"
      :size="size"
    />
    <AppIcon
      v-if="icon"
      :name="icon"
      :color="textColorClass"
      :width="iconSizeClass.width"
      :height="iconSizeClass.height"
      :class="{'mr-1': label, 'invisible' : loading}"
    />
    <div :class="{'invisible' : loading}">
      {{ label }}
    </div>
  </button>
</template>

<script>
import AppIcon from './Icons.vue';
import AppLoader from './Loader.vue';
export default {
  name: 'AppButton',
  components: {
    AppIcon,
    AppLoader
  },
  props: {
    color: {
      type: String,
      default: 'white',
      validator: v => ['white', 'green', 'red', 'blue', 'gray'].indexOf(v) !== -1
    },
    size: {
      type: String,
      default: 'md'
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    borderless: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectedColor () {
      return this.color;
    },
    btnColorClass () {
      if (this.disabled || this.loading) {
        if (this.selectedColor === 'white') {
          return 'bg-gray-300 border-gray-500 text-gray-500 cursor-not-allowed';
        }
        return `bg-${this.selectedColor}-400 border-${this.selectedColor}-500 text-${this.selectedColor}-200 cursor-not-allowed`;
      }
      if (this.selectedColor === 'white') {
        return `${this.selectedColor} bg-${this.selectedColor} border-gray-600`;
      }
      return `${this.selectedColor} bg-${this.selectedColor}-600 border-${this.selectedColor}-500`;
    },
    textColorClass () {
      if ((this.disabled || this.loading) && this.selectedColor === 'white') {
        return 'text-gray-500';
      }
      if (this.selectedColor === 'white') {
        return 'text-gray-700';
      }
      return `text-${this.selectedColor}-200`;
    },
    iconSizeClass () {
      const iconProps = {};
      let size;
      if (!this.icon) {
        return iconProps;
      }
      switch (this.size) {
        case 'sm':
          size = '3';
          break;
        case 'lg':
          size = '5';
          break;
        case 'xl':
          size = '6';
          break;
        default:
          size = '4';
      }
      iconProps.width = 'w-' + size;
      iconProps.height = 'h-' + size;
      return iconProps;
    },
    btnSizeClass () {
      let size;
      switch (this.size) {
        case 'sm':
          size = 'p-2 text-sm';
          break;
        case 'lg':
          size = 'p-4 text-lg';
          break;
        case 'xl':
          size = 'p-5 text-xl';
          break;
        default:
          size = 'p-3 text-base';
      }
      return size;
    },
    disabledBtn () {
      if (this.loading || this.disabled) {
        return true;
      }
      return false;
    },
    listeners () {
      return {
        ...this.$listeners
      };
    }
  }
};
</script>
