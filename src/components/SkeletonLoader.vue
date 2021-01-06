<template>
  <div class="w-full p-2 rounded-lg">
    <div
      v-if="type === 'form'"
      class="w-full p-2 rounded-lg"
    >
      <div class="animate-pulse mx-2 w-24 h-4 bg-gray-300 rounded animation-delay" />
      <div class="animate-pulse mx-2 mt-2 mb-4 h-12 bg-gray-300 rounded" />
      <div
        class="animate-pulse mx-2 w-24 h-4 bg-gray-300 rounded"
        style="animation-delay: 150ms"
      />
      <div
        class="animate-pulse mx-2 mt-2 mb-4 h-12 bg-gray-300 rounded"
        style="animation-delay: 150ms"
      />
      <div
        class="animate-pulse mx-2 w-24 h-4 bg-gray-300 rounded"
        style="animation-delay: 200ms"
      />
      <div
        class="animate-pulse mx-2 mt-2 mb-4 h-12 bg-gray-300 rounded"
        style="animation-delay: 200ms"
      />
      <div
        class="animate-pulse mx-2 w-24 h-4 bg-gray-300 rounded"
        style="animation-delay: 250ms"
      />
      <div
        class="animate-pulse mx-2 mt-2 mb-4 h-12 bg-gray-300 rounded"
        style="animation-delay: 250ms"
      />
      <div class="flex justify-end">
        <div
          class="w-24 h-12 animate-pulse bg-gray-300 rounded"
          style="animation-delay: 300ms"
        />
        <div
          class="w-24 h-12 ml-4 animate-pulse bg-gray-300 rounded"
          style="animation-delay: 300ms"
        />
      </div>
    </div>

    <div
      v-else
      class="w-full p-2 rounded-lg"
    >
      <!-- <div v-if="table" class="flex mx-2 h-12 mb-1">
        <div class="flex-1 h-12 animate-pulse bg-gray-300 rounded"></div>
        <div class="flex-1 h-12 mx-1 animate-pulse bg-gray-300 rounded"></div>
        <div class="flex-1 h-12 animate-pulse bg-gray-300 rounded"></div>
        <div class="flex-1 h-12 mx-1 animate-pulse bg-gray-300 rounded"></div>
        <div class="flex-1 h-12 animate-pulse bg-gray-300 rounded"></div>
      </div> -->
      <div>
        <div
          class="animate-pulse mx-2 h-1 bg-gray-300 rounded animation-delay"
          style="animation-delay: 100ms"
        />
        <div
          class="animate-pulse mx-2 mt-1 mb-1 h-12 bg-gray-300 rounded"
          style="animation-delay: 100ms"
        />
        <div
          class="animate-pulse mx-2 h-1 bg-gray-300 rounded"
          style="animation-delay: 150ms"
        />
        <div
          class="animate-pulse mx-2 mt-1 mb-1 h-12 bg-gray-300 rounded"
          style="animation-delay: 150ms"
        />
        <div
          class="animate-pulse mx-2 h-1 bg-gray-300 rounded"
          style="animation-delay: 200ms"
        />
        <div
          class="animate-pulse mx-2 mt-1 mb-1 h-12 bg-gray-300 rounded"
          style="animation-delay: 200ms"
        />
        <div
          class="animate-pulse mx-2 h-1 bg-gray-300 rounded"
          style="animation-delay: 250ms"
        />
        <div
          class="animate-pulse mx-2 mt-1 mb-1 h-12 bg-gray-300 rounded"
          style="animation-delay: 250ms"
        />
        <div
          class="animate-pulse mx-2 h-1 bg-gray-300 rounded"
          style="animation-delay: 300ms"
        />
        <div
          class="animate-pulse mx-2 mt-1 mb-1 h-12 bg-gray-300 rounded"
          style="animation-delay: 300ms"
        />
        <div
          class="animate-pulse mx-2 h-1 bg-gray-300 rounded"
          style="animation-delay: 300ms"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSkeletonLoader',

  props: {
    type: {
      type: String,
      required: true
    }
  }
};
</script>
