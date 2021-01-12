<template>
  <app-on-scroll-outside :do="hideContent">
    <app-on-click-outside :do="hideContent">
      <div class="relative inline-block text-left">
        <label class="app-label">{{ label }}</label>

        <div>
          <app-button
            :size="btnSize"
            ref="dropdown-btn"
            :class="{'border-red-500': hasError}"
            @click="toggleMenu"
          >
            <div class="flex-1 text-left">
              <span> {{ showlabel ? `${placeholder} :` : '' }} </span>
              <span
                v-if="multi"
                class="pl-1"
              > {{ Object.keys($pickBy(currentValue)).length }} </span>
              <span
                v-else
                class="pl-1 capitalize"
              > {{ currentValue ? currentValue : (showlabel ? '' : placeholder) }} </span>
            </div>

            <app-icon
              class="-mr-1 ml-2"
              width="w-5"
              height="h-5"
              name="caretDown"
            />
          </app-button>
        </div>

        <div
          class="dropdown-menu"
          :class="{active: isShown}"
          :style="positionObject"
          @click="hideContent"
        >
          <vue-scroll class="h-full w-full overflow-auto">
            <div
              v-if="!multi"
              ref="dropdown-menu"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                href="#"
                v-for="(option, index) in dropdownItems"
                @click="()=>selectItem(option)"
                :key="index"
                class="block px-4 py-2 text-sm capitalize hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                :class="option.value === currentValue ? 'bg-gray-500 text-white' : ' text-gray-700'"
              >{{ option.label }}</a>
            </div>

            <div
              v-else
              ref="dropdown-menu"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <app-checkbox
                class="px-4 py-2 capitalize"
                v-model="selectedItem[option.value]"
                @change="(e)=> { $emit('multichanged', { [option.value]: e}) }"
                :name="checkBoxName"
                v-for="(option, index) in dropdownItems"
                :key="index"
                :label="option.label"
              />
            </div>
          </vue-scroll>
        </div>
        <em
          class="text-error"
          v-html="errorMessage"
        />
      </div>
    </app-on-click-outside>
  </app-on-scroll-outside>
</template>

<script>
import $store from '@/store';

import AppOnScrollOutside from './OnScrollOutside';
import AppOnClickOutside from './OnClickOutside';
import AppCheckbox from './Checkbox';
import AppIcon from './Icons.vue';
import AppButton from './Button.vue';

export default {
  name: 'AppDropdown',

  components: {
    AppOnScrollOutside,
    AppOnClickOutside,
    AppCheckbox,
    AppButton,
    AppIcon
  },

  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Number, String, Object, Boolean],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    showlabel: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: null
    },
    multi: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    error: {
      type: [String, Boolean],
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    btnSize: {
      type: String,
      default: 'md'
    }
  },

  data () {
    return {
      checkBoxName: this.$randomId(),
      isShown: false,
      errorMsg: null,
      selectedItem: {},
      positionObject: {
        position: 'fixed'
      }
    };
  },

  computed: {
    hasError () {
      return !!this.error;
    },
    errorMessage () {
      return typeof this.error === 'boolean' ? '' : this.error;
    },
    windowWidth () {
      return $store.state.dom.windowWidth;
    },
    currentValue () {
      const item = this.dropdownItems.find(item => item.value === this.value);
      return item ? item.label : (this.multi ? this.selectedItem : this.value);
    },
    dropdownItems () {
      let options = [];

      if (!this.options) {
        return options;
      }

      if (this.options[0] && this.options[0].label) {
        options = this.options;
      } else {
        this.options.forEach(i => {
          options.push({
            label: i,
            value: i
          });
        });
      }

      return options;
    }
  },

  beforeMount () {
    if (this.multi) {
      this.selectedItem = this.value;
    } else {
      // this.selectedItem = this.value
    }
  },

  watch: {
    windowWidth: function () {
      this.hideContent();
    }
  },

  methods: {
    selectItem (item) {
      this.selectedItem = item;
      this.$emit('input', item.value);
      if (this.$listeners.select) {
        this.$emit('select', item.value);
      }
    },
    resetStyling () {
      this.positionObject.bottom = null;
      this.positionObject.top = null;
      this.positionObject.left = null;
    },
    toggleMenu (ev) {
      if (!this.isShown) {
        this.positionDropdownMenu(this.$refs['dropdown-btn'].$el.getBoundingClientRect());
      } else {
        this.resetStyling();
      }

      this.isShown = !this.isShown;
    },
    hideContent () {
      if (this.isShown) {
        this.isShown = false;
        this.isMounted = false;
        this.resetStyling();
      }
    },
    positionDropdownMenu (pos) {
      const drpW = this.$refs['dropdown-menu'].clientWidth;
      const drpH = this.$refs['dropdown-menu'].clientHeight + 10; // 10 for the margin

      if (pos.right + drpW > window.innerWidth) {
        this.positionObject.right = `${window.innerWidth - pos.right - 7}px`;
      } else {
        this.positionObject.left = `${pos.left}px`;
      }

      if (pos.bottom + drpH > window.innerHeight) {
        this.positionObject.bottom = `${window.innerHeight - pos.top + 5}px`;
        this.positionObject['transform-origin'] = 'center bottom';
      } else {
        this.positionObject.top = `${pos.bottom + 5}px`;
        this.positionObject['transform-origin'] = 'center top';
      }
    }
  }
};
</script>
