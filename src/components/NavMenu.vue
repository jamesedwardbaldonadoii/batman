<template>
  <AppOnClickOutside :do="hideContent">
    <div class="relative">
      <div
        class="p-1 text-gray-500"
        @click="toggleMenu"
      >
        <slot name="icon">
          <div class="default-menu-icon">
            <div class="line" />
            <div class="line" />
            <div class="line" />
          </div>
        </slot>
      </div>

      <div
        class="dropdown-menu absolute right-0 origin-top-left h-auto"
        :class="{active: isShown}"
        @click="hideContent"
      >
        <slot />
      </div>
    </div>
  </AppOnClickOutside>
</template>

<script>

import AppOnClickOutside from './OnClickOutside';

export default {
  name: 'NavMenu',
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    listType: {
      type: Boolean,
      default: true
    }
  },
  components: {
    AppOnClickOutside
  },
  data () {
    return {
      isShown: false
    };
  },
  methods: {
    toggleMenu () {
      this.isShown = !this.isShown;
    },
    hideContent () {
      if (this.isShown) {
        this.isShown = false;
      }
    }
  },
  mounted () {
    if (!this.$slots.default) {
      throw new Error('Please define default slot content!');
    }
    if (this.listType && (this.$slots.default[0].tag !== 'ul')) {
      throw new Error(`Wrong template! Please use <ul> tag as default slot to define menu list:
      <AppDropdown>
        <ul>
          <li>hello</li>
          <li>bye</li>
        </ul>
      <AppDropdown>
      `);
    }
  }
};
</script>
