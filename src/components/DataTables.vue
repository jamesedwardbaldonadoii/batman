<template>
  <div class="w-full h-full">
    <div
      ref="app-datatable"
      class="overflow-auto bg-white rounded-lg shadow relative h-full"
    >
      <vue-scroll>
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr class="text-left">
              <th
                v-if="select"
                class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100 align-middle"
              >
                <app-checkbox
                  v-model="allSelected"
                  @change="onChangeAllSelected"
                />
              </th>
              <th
                v-for="i in selectedHeaders"
                :key="i.value"
                :data-key="i.value"
                class="px-6 py-2 z-10 bg-gray-100 sticky top-0 border-b border-gray-200 text-gray-600 font-bold tracking-wider uppercase text-sm"
              >
                <div
                  @click="onSortValue(i.value)"
                  class="flex items-center cursor-pointer"
                >
                  <div class="flex-1">
                    {{ i.label }}
                  </div>

                  <div
                    v-if="sort && sorted && sorted.value === i.value"
                    class="pl-1 cursor-pointer"
                  >
                    <app-icon
                      v-show="sorted.asc"
                      class="-mb-2 block"
                      name="sortUp"
                    />
                    <app-icon
                      v-show="!sorted.asc"
                      class="-mt-2 block"
                      name="sortDown"
                    />
                  </div>
                </div>
              </th>
              <th
                v-if="operations && operations.length"
                id="operations-container"
                class="py-2 px-3 z-10 sticky top-0 border-b border-gray-200 bg-gray-100 align-middle whitespace-nowrap"
              />
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td :colspan="headers && headers.length">
                <app-skeleton-loader type="list" />
              </td>
            </tr>

            <tr
              v-else
              v-for="i in list"
              :key="i[data.key]"
            >
              <td
                v-if="select"
                class="px-3 border-dashed border-t border-gray-200 align-middle"
              >
                <app-checkbox
                  v-model="i.isSelected"
                  @change="onChangeSelected"
                  :name="checkBoxName"
                />
              </td>
              <td
                v-for="k in selectedHeaders"
                :key="k.value"
                class="align-middle border-dashed border-t border-gray-200 userId"
              >
                <app-contenteditable
                  :action="(val, cancelUpdate) => action({[k.value] : val}, i, cancelUpdate)"
                  v-model="i[k.value]"
                  :disabled="!contentEditable"
                  :error="i.error[k.value]"
                  plaintext
                />
              </td>
              <td
                v-if="operations && operations.length"
                class="px-3 border-dashed border-t border-gray-200 align-middle text-center whitespace-nowrap"
              >
                <app-button
                  v-for="(op, $index) in operations"
                  :key="$index"
                  class="m-1 mb-1"
                  size="sm"
                  :icon="op.btnIcon"
                  @click="onOperation(op, i)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import AppButton from './Button';
import AppIcon from './Icons.vue';
import AppCheckbox from './Checkbox';
import AppContenteditable from '@/components/Contenteditable';
import AppSkeletonLoader from '@/components/SkeletonLoader';

export default {
  name: 'AppDataTable',

  components: {
    AppContenteditable,
    AppSkeletonLoader,
    AppCheckbox,
    AppButton,
    AppIcon
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    select: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: false
    },
    sorted: {
      type: Object,
      default: null
    },

    isLoading: {
      type: Boolean,
      default: false
    },

    operations: {
      type: [Array, Object],
      default: null
    },

    contentEditable: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      default: null
    }
  },

  data: () => {
    return {
      selectedList: {},
      allSelected: false,
      isAddedManually: false,
      ro: null
    };
  },

  computed: {
    checkBoxName () {
      return `name${this.getRandomInt()}`;
    },
    list () {
      this.data.list.forEach(i => {
        if (!i.error) {
          this.$set(i, 'error', {});
        }

        if (!i.isSelected) {
          this.allSelected = false;
        }
      });

      return this.data.list || [];
    },
    selectedHeaders () {
      return this.headers.filter(i => i.show);
    }
  },

  mounted () {
    if (this.$listeners.datatablecreated) {
      this.$emit('datatablecreated', this.$refs['app-datatable']);
    }
  },

  methods: {
    getRandomInt () {
      const min = 1;
      const max = 1000;
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    onChangeSelected () {
      if (this.data.list && this.data.list.length <= 0) {
        return;
      }

      this.allSelected = this.$pickBy(this.data.list, i => i.isSelected).length === this.data.list.length;
      this.$emit('selectedlistchanged');
    },

    onChangeAllSelected (e) {
      this.data.list.forEach(i => {
        this.$set(i, 'isSelected', this.allSelected);
      });

      this.$emit('selectedlistchanged');
    },

    onOperation (operation, item) {
      if (this.$listeners.operation) {
        this.$emit('operation', operation, item);
      }
    },

    onSortValue (i) {
      const lastSort = { ...this.sorted };

      this.$set(this.sorted, 'value', i);
      this.$set(this.sorted, 'asc', lastSort.value !== i ? true : !lastSort.asc);

      if (this.$listeners.sortchanged) {
        this.$emit('sortchanged');
      }
    }
  }
};
</script>
