<template>
  <div class="p-8 h-full overflow-auto">
    <div
      v-if="isHome"
      class="flex h-full items-start"
    >
      <div class="flex flex-col pr-4 h-full flex-1">
        <div class="flex items-start justify-between flex-1">
          <div class="mr-1 text-lg font-bold">
            Templates
          </div>
          <app-button
            icon="plus"
            color="green"
            label="Build Template"
            @click="()=> { navigateView('shop:template') }"
          />
        </div>
        <div class="flex items-start justify-between flex-1">
          <div class="mr-1 text-lg font-bold">
            Plugins
          </div>
          <app-button
            icon="plus"
            color="green"
            label="Build a Plugin"
          />
        </div>
      </div>

      <div class="w-96 h-full">
        <OnlineShops />
      </div>
    </div>
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
import AppButton from '@/components/Button';
import OnlineShops from '@/module/shop/list';

const PAGE_NAME = 'shop';

export default {
  name: 'BuildStorePage',

  components: {
    AppButton,
    OnlineShops
  },

  data () {
    return {
      isHome: false
    };
  },

  mounted () {
    this.isHome = this.$route.name === PAGE_NAME;
  },

  methods: {
    /**
     * @desc go to page
     */
    navigateView (route) {
      if (route && this.$route.name !== route) {
        this.$router.push({ name: route });
      }
    }
  },

  /**
   * @desc dont show the main index for /shop under chidlren
   */
  beforeRouteUpdate (to, from, next) {
    this.isHome = to.name === PAGE_NAME;
    next();
  }
};
</script>
