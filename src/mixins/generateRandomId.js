/**
 * @description generate some random ID
 */
export default {
  methods: {
    $randomId () {
      const min = 1;
      const randomNumber = Math.floor(Math.random() * (1000000000 - min + 1) + min);

      return `halad-${randomNumber}`;
    }
  }
};
