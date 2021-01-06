<template>
  <div class="w-full mt-16 relative max-w-sm m-auto">
    <div class="relative h-full w-full card bg-white">
      <img
        src="@/assets/img/tabang.png"
        class="m-auto mb-4"
      >

      <app-input
        label="Email"
        email
        required
        v-model="email"
        :error="errorUser"
        placeholder="EMPLOYEE CODE"
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
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
        <app-button
          class="w-full mt-4"
          label="Login"
          color="blue"
          size="md"
          @click="makeLogin"
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
      password: '',
      errorServer: '',
      errorUser: '',
      errorPass: '',
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

    validateLogin () {
      this.validateEmail();
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
      this.password = '';
      this.errorUser = '';
      this.errorPass = '';
      this.errorServer = '';
    },

    makeLogin () {
      if (!this.isDisabled) {
        this.validateLogin();
      }

      if (this.isDisabled) {
        return;
      }

      this.isLoading = true;

      AuthService.makeLogin({
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.resetErrorValue();
        })
        .then(() => {
          this.$store
            .dispatch('user/getCurrent')
            .then(() => this.$router.push('/'))
            .catch(error => console.log(error));
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
