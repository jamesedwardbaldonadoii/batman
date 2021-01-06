<script>
export default {
  name: 'OnScrollOutside',
  props: {
    do: {
      type: Function,
      required: true,
      default: null
    }
  },
  mounted () {
    const listener = e => {
      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.do();
      }
    };
    document.addEventListener('scroll', listener, true);
    this.$once('hook:destroyed', () => {
      document.removeEventListener('scroll', listener, true);
    });
  },
  render () {
    return this.$slots.default[0];
  }
};
</script>
