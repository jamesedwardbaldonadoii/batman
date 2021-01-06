<template>
  <app-on-click-outside :do="hideErrorMessage">
    <div
      class="relative"
    >
      <div
        ref="app-contenteditable"
        :contenteditable="contenteditable"
        @blur="onInputChange"
        @focus="onInputFocus"
        @keydown.enter="onInputChange"
        :class="hasError ? 'bg-red-100 border-red-100' : 'bg-white border-white'"
        class="text-gray-700 px-6 py-3 border-solid border flex items-center relative focus:bg-gray-200"
      >
        {{ value }}
      </div>

      <div v-if="hasError">
        <span
          ref="error-indicator"
          @mouseenter="showErrorMessage = true"
          class="flex h-3 w-3 absolute -top-1 -right-1 z-40"
        >
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
        <div
          ref="error-message"
          v-show="showErrorMessage"
          style="bottom: calc(100% + 10px)"
          class="pl-2 pr-2 py-3 w-60 absolute text-sm bg-white border border-solid border-gray-300
          shadow-md rounded text-red-400 z-50"
        >
          <app-icons
            class="absolute top-1 right-1 cursor-pointer"
            @click="hideErrorMessage"
            width="w-2"
            height="h-2"
            name="close"
            color="text-gray-300"
          />
          {{ error }}
        </div>
      </div>
    </div>
  </app-on-click-outside>
</template>

<script>

import AppOnClickOutside from './OnClickOutside';
import AppIcons from './Icons';

export default {
  name: 'AppContenteditable',

  components: {
    AppOnClickOutside,
    AppIcons
  },

  props: {
    plaintext: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Array, Boolean],
      required: false,
      default: null
    },
    enum: {
      type: Array,
      default: null
    },
    action: {
      type: Function,
      default: null
    },
    error: {
      type: String,
      default: null
    }
  },

  computed: {
    hasError () {
      return !!this.error;
    },

    contenteditable () {
      if (this.disabled) {
        return false;
      }
      if (typeof this.value !== 'string') {
        return false;
      }

      return this.plaintext ? 'plaintext-only' : true;
    }
  },

  data () {
    return {
      isShown: false,
      showErrorMessage: false,
      positionObject: {
        position: 'fixed'
      },
      originalText: ''
    };
  },

  watch: {
    hasError: function (val) {
      if (!val) {
        this.originalText = this.value.trim().repeat(1);
      } else {
        this.confirmExit();
      }
    }
  },

  methods: {
    onInputChange (e) {
      if (this.plaintext && e.type === 'keydown') {
        e.preventDefault();
      }
      if (e.which === 13) {
        return e.target.blur();
      }

      const value = e.target.innerText.trim();

      if (this.originalText === value) {
        this.action(value, true);
        return;
      }

      if (this.hasError) {
        this.confirmExit();
      } else {
        this.action(value);
        this.$emit('input', value);
      }
    },

    onInputFocus (e) {
      if (!this.hasError) {
        this.originalText = this.value.trim().repeat(1);
      }
    },

    confirmExit () {
      this.$dialog.confirm({
        header: 'Unsaved Changes',
        body: 'Changes cannot be saved. Revert changes?'
      }).then(confirm => {
        if (confirm) {
          this.$emit('input', this.originalText);
          this.action(this.originalText, true);
        } else {
          this.$refs['app-contenteditable'].focus();
        }
      });
    },

    hideErrorMessage () {
      this.showErrorMessage = false;
    }
  }
};
</script>
