<template>
  <div
    id="app"
    class="flex flex-col h-screen overflow-hidden transition-all duration-200 ease-linear"
    :class="$currentUser._id ? (isPinned ? 'ml-64' : 'ml-16') : ''"
  >
    <AppHeader class="flex-none" />

    <AppSidebarLeft v-if="$currentUser._id" />

    <div class="bg-gray-100 flex-1 overflow-hidden relative">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import AppHeader from './Header.vue';
import AppSidebarLeft from './SidebarLeft';
import $store from '@/store';
// import AppFooter from './Footer.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppSidebarLeft
    // AppFooter
  },
  computed: {
    isPinned () {
      return $store.state.sidebar.pin;
    }
  }
};
</script>
