<template>
  <div class="app-header pl-2">
    <AppToastList />
    <AppConfirmDialog :show="showConfirmDialog" />

    <div class="flex-1" />

    <div
      class="flex items-center"
      v-if="$currentUser._id"
    >
      <div class="relative ml-1">
        <AppButton
          icon="bell"
          borderless
        />
        <div class="absolute notification-count">
          99
        </div>
      </div>

      <NavMenu class="flex-none relative">
        <div slot="icon">
          <AppButton
            icon="cogs"
            borderless
          />
        </div>
        <ul>
          <li class="cursor-pointer">
            <a @click="logout"> Logout </a>
          </li>
        </ul>
      </NavMenu>
    </div>
  </div>
</template>

<script>

import AppButton from '@/components/Button';
import NavMenu from '@/components/NavMenu';
import AppToastList from '@/components/ToastList';
import AppConfirmDialog from '@/components/ConfirmDialog';
import { AuthService } from '@/services/auth.service';

export default {
  name: 'Header',
  components: {
    NavMenu,
    AppToastList,
    AppConfirmDialog,
    // AppIcon,
    AppButton
  },
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    listType: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      msg: 'DTR'
    };
  },
  computed: {
    showConfirmDialog () {
      return this.$store.state.confirmDialog.show;
    }
  },
  methods: {
    async logout () {
      await AuthService.makeLogout();
    },
    async goToDtr () {
      this.$router.push('/dtr');
    },
    async goHome () {
      if (this.$currentUser && this.$currentUser._id) {
        this.$router.push('/');
      } else {
        this.$router.push('/login');
      }
    }
  }
};
</script>
