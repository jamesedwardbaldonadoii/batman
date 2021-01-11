<template>
  <div
    class="app-sidebar"
    :class="isPinned ? 'pinned' : ''"
    v-show="true"
  >
    <div class="h-16 w-full flex">
      <img
        src="@/assets/img/tabang.png"
        class="block m-auto"
        style="height: 92%;"
      >
      <div
        class="w-16 text-center cursor-pointer flex items-center"
        @mouseover="showPin = true"
        @mouseout="showPin = false"
        @click="pinUnpinNavigation"
      >
        <app-icon
          class="inline-block m-auto w-auto"
          width="w-5"
          height="h-5"
          color="text-gray-800"
          :name="showPin ? 'pushpin' : 'hamburger'"
        />
      </div>
    </div>
    <vue-scroll
      class="flex-1 bg-gray-800 pt-2"
    >
      <div
        v-for="nav in navigations"
        :key="nav.label"
      >
        <div
          class="app-sidebar-items"
          @click="() => { nav.subview ? showSubview(nav) : navigateView(nav) }"
        >
          <div class="app-sidebar-title">
            {{ nav.label }}
          </div>

          <app-icon
            v-if="nav.subview"
            class="inline-block m-auto w-auto pb-1 transition-all ease-in-out transform"
            :class="nav.showSub ? 'rotate-180' : 'rotate-0'"
            width="w-4"
            height="h-4"
            color="text-gray-500"
            name="arrowDown"
          />

          <div class="w-16 text-center">
            <app-icon
              class="inline-block m-auto w-auto"
              width="w-5"
              height="h-5"
              color="text-gray-500"
              :name="nav.icon"
            />
          </div>
        </div>

        <div
          v-if="nav.subview"
          class="flex-grow-0 flex-shrink-0 w-full bg-gray-700 transition-all ease-in-out overflow-hidden"
          :class="nav.showSub ? 'max-h-96' : 'max-h-0'"
        >
          <div
            v-for="sub in nav.subview"
            :key="sub.label"
            class="app-sidebar-items pl-2"
            @click="() => { navigateView(sub) }"
          >
            <div class="app-sidebar-title overflow-hidden">
              {{ sub.label }}
            </div>
            <div class="w-16 text-center">
              <app-icon
                class="inline-block m-auto w-auto"
                width="w-5"
                height="h-5"
                color="text-gray-500"
                :name="sub.icon"
              />
            </div>
          </div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>

import AppIcon from '@/components/Icons.vue';

export default {
  name: 'SideBarLeft',
  components: {
    AppIcon
  },
  data () {
    return {
      showPin: false,
      navigations: [
        {
          label: 'Build My Store',
          icon: 'store',
          route: 'build-store'
        }
      ]
    };
  },

  beforeMount () {

  },

  computed: {
    isPinned () {
      return this.$store.state.sidebar.pin;
    }
  },

  methods: {
    /**
     * @desc toggle pin on the navigation sidebar
     */
    pinUnpinNavigation () {
      if (this.isPinned) {
        this.$store.commit('sidebar/UNPIN_SIDEBAR');
      } else {
        this.$store.commit('sidebar/PIN_SIDEBAR');
      }
    },

    /**
     * @desc toggle the subview of each navigation if available
     */
    showSubview (nav) {
      nav.showSub = !nav.showSub;
    },

    /**
     * @desc go to page
     */
    navigateView (nav) {
      if (nav.route && this.$route.name !== nav.route) {
        this.$router.push({ name: nav.route });
      }
    }
  }
};
</script>
