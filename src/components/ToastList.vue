<template>
  <transition-group
    name="slide"
    tag="div"
    class="app-toast-list"
  >
    <app-toast
      @remove="onRemove"
      v-for="item in toastsList"
      :item="item"
      :key="item.id"
    />
  </transition-group>
</template>

<script>
import AppToast from './Toast';
export default {
  name: 'AppToastList',

  components: {
    AppToast
  },

  watch: {
    $route: {
      handler: 'clearToastList',
      deep: 'true'
    },
    toastsList: function (_new) {
      if (_new.length > 9) {
        this.onRemove(this.toastsList[0].id);
      }
    }
  },

  computed: {
    toastsList () {
      return this.$store.state.toast.toastsList;
    }
  },

  methods: {
    onRemove (id) {
      this.$store.commit('toast/REMOVE', { id });
    },
    clearToastList () {
      if (this.toastsList.length) {
        this.$store.commit('toast/CLEAR_LIST');
      }
    }
  }
};
</script>
