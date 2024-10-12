
const Spinner = () => {
  return <LoaderIcon
    class='h-16 w-16 animate-spin stroke-blue-500 stroke-1'
    style='animation-duration: 1500ms'
  />
}

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  emit: [
    'cancel',
    'submit'
  ],
  setup (props, { emit, slots }) {
    return () => {
      return <div class='bg-shark-800 relative overflow-hidden rounded-lg shadow-lg'>
        <Show when={slots.header}>
          <div class='bg-shark-900/50 p-4'>
            {slots.header()}
          </div>
        </Show>
        <div class='p-4'>
          {slots.default()}
        </div>
        <Show when={props.loading || props.success}>
          <div class='bg-shark-900/50 absolute inset-0 flex'>
            <div class='bg-shark-800 m-auto rounded-lg p-1 shadow-lg'>
              <Show when={props.success}>
                <CircleCheckIcon class='h-16 w-16 stroke-blue-500 stroke-1'/>
              </Show>
              <Show when={props.loading}>
                <Spinner/>
              </Show>
            </div>
          </div>
        </Show>
        <Show when={slots.footer}>
          <div class='bg-shark-900/50 p-4'>
            {slots.footer()}
          </div>
        </Show>
      </div>
    }
  }
})
