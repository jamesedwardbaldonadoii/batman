<template>
  <div class="w-full mt-16 relative max-w-sm m-auto">
    <div class="relative h-full w-full card bg-white">
      <img
        src="@/assets/img/tabang.png"
        class="m-auto mb-4"
      >

      <app-input
        label="Firstname"
        required
        v-model="firstname"
        :error="errorName"
        placeholder="Full name"
        @blur="validateName"
      />

      <app-input
        label="Family name"
        required
        v-model="lastname"
        :error="errorName"
        placeholder="Full name"
        @blur="validateName"
      />

      <app-input
        label="Email"
        email
        required
        v-model="email"
        :error="errorUser"
        placeholder="Email Address"
        @blur="validateEmail"
      />

      <app-input
        label="Password"
        password
        required
        v-model="password"
        :error="errorPass"
        placeholder="**********"
        @blur="validatePassword"
        @keyup.enter="makeLogin"
      />

      <div class="flex flex-col items-center justify-between mt-4">
        <app-button
          class="w-full mt-4"
          label="Register"
          color="blue"
          size="md"
          @click="registerAccount"
          :loading="isLoading"
        />
      </div>

      <div
        class="text-error text-center mt-3"
        v-if="errorServer"
      >
        {{ errorServer }}
      </div>
    </div>
  </div>
</template>

<script>

import { AuthService } from '@/services/auth.service';
import AppInput from '@/components/Input';
import AppButton from '@/components/Button';
import { isValidEmail } from '@/utils';

export default {
  name: 'Login',

  components: {
    AppInput,
    AppButton
  },

  data () {
    return {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      errorServer: '',
      errorUser: '',
      errorPass: '',
      errorName: '',
      isLoading: false,
      isDisabled: false
    };
  },

  beforeMount () {
    if (this.$currentUser && this.$currentUser._id) {
      this.$router.push('/');
    }
  },

  methods: {
    validateEmail () {
      if (this.errorUser) {
        this.errorUser = null;
      }

      if (!this.email) {
        this.errorUser = 'Email field cannot be empty.';
      }

      if (this.email && !isValidEmail(this.email)) {
        this.errorUser = 'Invalid email address format.';
      }

      this.isDisabled = !!(this.errorUser || this.errorPass);
    },

    validateName () {

    },

    validateForm () {
      this.validateEmail();
      this.validateName();
      this.validatePassword();
    },

    validatePassword () {
      if (this.errorPass) {
        this.errorPass = null;
      }

      if (!this.password) {
        this.errorPass = 'Password field cannot be empty.';
      }

      if (this.password && this.password.length < 6) {
        this.errorPass = 'Invalid Password Request'; // create a proper validation for password
      }

      this.isDisabled = !!(this.errorUser || this.errorPass) || !this.email;
    },

    resetErrorValue () {
      this.email = '';
      this.firstname = '';
      this.lastname = '';
      this.password = '';
      this.errorUser = '';
      this.errorPass = '';
      this.errorServer = '';
    },

    registerAccount () {
      if (!this.isDisabled) {
        this.validateForm();
      }

      if (this.isDisabled) {
        return;
      }

      this.isLoading = true;

      AuthService.registerAccount({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.resetErrorValue();
        })
        .then(() => {
          // this.$store
          //   .dispatch('user/getCurrent')
          //   .then(() => this.$router.push('/'))
          //   .catch(error => this.$store.commit('toast/NEW', { type: 'error', message: error.message }, { root: true }));
        })
        .catch(error => {
          this.errorServer = error.message;
          this.errorServer = error.status === 404 ? 'EMPLOYEE CODE not found' : error.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
