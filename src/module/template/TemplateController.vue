<template>
  <div class="px-2 py-3 flex items-center overflow-hidden bg-white border border-gray-300 border-solid">
    <app-color-picker />
    <app-button
      class="mx-1"
      size="sm"
      label="Group"
    />
    <app-button
      class="mx-1"
      size="sm"
      label="Ungroup"
    />
    <app-button
      class="mx-1"
      size="sm"
      label="Undo"
    />
    <app-button
      class="mx-1"
      size="sm"
      label="Redo"
    />
    <app-button
      class="mx-1"
      size="sm"
      label="Fullscreen"
      @click="onToggleFullscreen"
    />
  </div>
</template>

<script>
import AppColorPicker from '@/components/ColorPicker';
import AppButton from '@/components/Button';

export default {

  components: {
    AppButton,
    AppColorPicker
  },

  props: {
    toggleFullscreen: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {};
  },

  methods: {
    onToggleFullscreen () {
      this.$emit('update:toggleFullscreen', !this.toggleFullscreen);
    }
  }
};
</script>
