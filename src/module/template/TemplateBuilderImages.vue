<template>
  <div class="px-2 py-3 h-full flex flex-col">
    <div class="px-2">
      <app-input
        v-model="searchText"
        placeholder="Search Image"
      />
    </div>
    <vue-scroll class="flex-1">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="px-2 py-1"
      >
        <img
          v-on="$listeners"
          class="w-full rounded cursor-pointer"
          :src="image"
          :alt="image"
          draggable
          @dragstart="handleOnDragstart"
        >
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import AppInput from '@/components/Input';

export default {
  components: {
    AppInput
  },

  props: {

  },

  data () {
    return {
      searchText: null,
      images: [
        'https://images.unsplash.com/photo-1610420749500-21dfef30df77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      ]
    };
  },

  methods: {
    handleOnDragstart (e) {
      console.log(e);
    }
  }
};
</script>
