
export default defineComponent({
  setup (props, { slots }) {
    return () => {
      return <div class='flex h-screen items-center justify-center'>
        {slots.default()}
      </div>
    }
  }
})
