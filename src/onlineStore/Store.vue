<template>
  <div class="store-page h-100 w-100">
    <div v-html="page.template" />
  </div>
</template>

<script>

export default {
  name: 'StorePage',

  components: {

  },

  beforeMount () {
    window.document.title = `${this.page.title} | Store`;
  },

  data () {
    return {
      page: {
        title: 'Ang tindahan',
        template: '<b>My First Store</b>',
        layout: {

        },
        products: [

        ]
      }
    };
  }
};
</script>
