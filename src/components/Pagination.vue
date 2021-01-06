<template>
  <div
    :class="pageInfo ? 'items-center' : 'justify-end'"
    class="w-full flex"
  >
    <div
      v-if="pageInfo"
      class="flex-1 text-left text-gray-500"
    >
      Showing <strong>{{ (currentPage * perPage) - perPage + 1 }}</strong> to <strong>{{ currentPage * perPage }}</strong> of <strong>{{ total }}</strong> entries
    </div>
    <ul
      v-if="pages.length > 1"
      class="list-none"
    >
      <li class="inline-block">
        <app-button
          aria-label="Go to first page"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
          label="First"
          size="sm"
          :color="color"
        />
      </li>

      <li class="inline-block">
        <app-button
          class="mx-1"
          aria-label="Go to previous page"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          label="Previous"
          size="sm"
          :color="color"
        />
      </li>

      <li
        v-for="(page, index) in pages"
        :key="index"
        class="inline-block"
      >
        <app-button
          class="mx-1 w-10"
          :class="{ 'bg-blue-900': isPageActive(page.name) }"
          :aria-label="`Go to page number ${page.name}`"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :label="page.name"
          size="sm"
          :color="color"
        />
      </li>

      <li class="inline-block">
        <app-button
          class="mx-1"
          aria-label="Go to next page"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          label="Next"
          size="sm"
          :color="color"
        />
      </li>

      <li class="inline-block">
        <app-button
          class="ml-1"
          aria-label="Go to last page"
          @click="onClickLastPage"
          :disabled="isInLastPage"
          label="Last"
          size="sm"
          :color="color"
        />
      </li>
    </ul>
  </div>
</template>

<script>

import AppButton from './Button.vue';

export default {
  name: 'AppPagination',
  components: {
    AppButton
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: 'blue'
    },
    pageInfo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    startPage () {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages < this.maxVisibleButtons ? 1 : this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    totalPages () {
      const totalPages = this.total / this.perPage;
      const hasDecimal = totalPages % 1 !== 0;

      return Math.floor(totalPages, 0) + (hasDecimal ? 1 : 0);
    },
    endPage () {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages () {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage () {
      return this.currentPage === 1;
    },
    isInLastPage () {
      return this.currentPage === this.totalPages;
    }
  },
  methods: {
    onClickFirstPage () {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage () {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage (page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage () {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage () {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive (page) {
      return this.currentPage === page;
    }
  }
};
</script>
