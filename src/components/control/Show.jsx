
export default defineComponent({
  props: {
    when: {
      default: false
    }
  },
  setup (props, { slots }) {
    return () => {
      return props.when ? slots.default() : slots.fallback?.()
    }
  }
})
