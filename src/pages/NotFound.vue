<template>
  <div>
    <div class="h-screen w-screen bg-blue-600 flex justify-center content-center flex-wrap">
      <p class="font-sans text-white error-text text-9xl">
        404
      </p>
    </div>

    <div class="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
      <span class="opacity-50">Take me back to </span>
      <a
        class="border-b cursor-pointer hover:underline"
        @click="$router.push({ name: prevRoute })"
      >{{ prevRoute }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      prevRoute: null
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from.name ? from.name : 'home';
    });
  }
};
</script>
