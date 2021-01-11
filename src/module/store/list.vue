<template>
  <div class="online-store w-full flex flex-col bg-white border-1 h-full border-gray-800 border border-solid rounded-t">
    <div class="flex text-lg px-2 py-1 items-center text-gray-200 font-bold bg-gray-800 rounded-t">
      <app-icon
        class="mr-2"
        color="text-gray-200"
        width="w-5"
        height="w-5"
        name="store"
      />
      <div class="flex-1">
        Online Stores
      </div>
      <app-button
        size="sm"
        icon="gear"
      />
    </div>
    <vue-scroll class="flex-1">
      <div
        class="online-store_list"
        v-for="store in stores"
        :key="store.key"
        :style="{ minHeight: '90px', backgroundImage: `url('${store.coverImg}')` }"
      >
        <div class="absolute inset-0 bg-gray-700 opacity-70 z-0" />

        <div
          class="online-store_logo"
        >
          <img
            class="max-h-full max-w-full"
            :src="store.logo"
          >
        </div>

        <div class="w-full h-full z-10 pl-3 text-white font-bold">
          <div class="text-xl">
            {{ store.name }}
          </div>
          <div>{{ store.slogan }}</div>
        </div>

        <div class="online-store_actions flex flex-col items-end">
          <div class="w-full text-white bg-gray-700 flex-1 px-2 flex items-center">
            {{ store.name }}
          </div>

          <div class="flex items-end w-full h-auto justify-between p-2 bg-gray-100">
            <app-button
              color="green"
              size="sm"
              icon="cart"
              label="Open"
            />

            <app-button
              color="blue"
              size="sm"
              icon="eye"
              label="Preview"
            />
            <app-button
              color="gray"
              size="sm"
              icon="write"
              label="Edit"
            />

            <app-button
              color="red"
              size="sm"
              icon="blocked"
              label="Disable"
            />
          </div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import AppButton from '@/components/Button';
import AppIcon from '@/components/Icons';
import { S3_STORE_DOMAIN } from '@/.env';

export default {
  name: 'OnlineStore',

  components: {
    AppButton,
    AppIcon
  },

  data () {
    return {
      stores: [
        {
          key: 'chaly-travel-tours', // must be unique
          name: 'Chaly Travel and Tours',
          slogan: 'We offer international and domestic flights',
          logo: `${S3_STORE_DOMAIN}/chaly-travel-tours/chaly-logo.jpg`,
          coverImg: `${S3_STORE_DOMAIN}/chaly-travel-tours/chaly-cover.jpg`,
          category: ['Travel Agency'],
          tags: ['travel agency', 'book hotels', 'book tickets']
        },
        {
          key: 'klassy', // must be unique
          name: 'Klassy',
          slogan: 'Since 1990',
          logo: `${S3_STORE_DOMAIN}/klassy/klassy-logo.png`,
          coverImg: `${S3_STORE_DOMAIN}/klassy/slide-01.jpg`,
          category: ['Convenience Store'],
          tags: ['tiyange', 'everyday needs', 'noodles']
        },
        {
          key: 'dough-deal-bcd', // must be unique
          name: 'Dough Deal Bcd',
          logo: `${S3_STORE_DOMAIN}/dough-deal-bcd/dough-logo.jpg`,
          coverImg: `${S3_STORE_DOMAIN}/dough-deal-bcd/dough-cover.jpg`,
          category: ['Convenience Store'],
          tags: ['tiyange', 'everyday needs', 'noodles']
        },
        {
          key: 'cha-rose-bbq', // must be unique
          name: 'Cha`Rose BBQ',
          slogan: 'Ang bbq ng masa!',
          logo: `${S3_STORE_DOMAIN}/cha-rose-bbq/cha-rose-logo.jpg`,
          coverImg: `${S3_STORE_DOMAIN}/cha-rose-bbq/cha-rose-cover.jpg`,
          category: ['Barbeque', 'Food'],
          tags: ['tiyange', 'everyday needs', 'noodles']
        },
        {
          key: 'pomato', // must be unique
          name: 'Pomato',
          slogan: 'It is a long established fact that a reader will be distracted',
          logo: `${S3_STORE_DOMAIN}/pomato/logo.png`,
          coverImg: `${S3_STORE_DOMAIN}/pomato/banner.jpg`,
          category: ['Barbeque', 'Food'],
          tags: ['tiyange', 'everyday needs', 'noodles']
        },
        {
          key: 'lories-kitchenette', // must be unique
          name: 'Lorie`s kitchenette',
          logo: `${S3_STORE_DOMAIN}/lories-kitchenette/lorie-logo.jpg`,
          coverImg: `${S3_STORE_DOMAIN}/lories-kitchenette/lorie-cover.jpg`,
          category: ['Barbeque', 'Food'],
          tags: ['tiyange', 'everyday needs', 'noodles']
        },
        {
          key: 'travel-tours', // must be unique
          name: 'Travel and Tours',
          logo: `${S3_STORE_DOMAIN}/chaly-travel-tours/chaly-logo.jpg`,
          category: ['Travel Agency'],
          tags: ['travel agency', 'book hotels', 'book tickets']
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.online-store {
  &_logo {
    @apply flex items-center p-2 z-10 bg-white rounded shadow;
    max-width: 100px;
  }

  &_list {
    @apply flex items-center bg-cover bg-no-repeat bg-center p-2 m-2 rounded overflow-hidden relative cursor-pointer;

    &:hover {
       .online-store_actions {
         top: 0;
       }
    }
  }

  &_actions {
    @apply absolute inset-0 h-full z-10 border-gray-700 border-solid border rounded;
    transition: all 150ms ease-in;
    top: 100%;
  }
}
</style>
