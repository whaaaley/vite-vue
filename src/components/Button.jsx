
export default defineComponent({
  setup (props, { slots }) {
    return () => {
      return <button class='rounded-lg bg-blue-500 px-5 py-2.5 font-medium text-white'>
        <div class='font-din-exp text-center text-sm uppercase tracking-wider'>
          {slots.default()}
        </div>
      </button>
    }
  }
})
