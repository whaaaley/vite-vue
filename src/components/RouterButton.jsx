
export default defineComponent({
  props: {
    to: {
      type: [Object, String]
    }
  },
  setup (props, { slots }) {
    const router = useRouter()

    const open = event => {
      event.preventDefault()

      if (props.to) {
        router.push(props.to)
      }
    }

    return () => {
      return <Button onClick={open}>
        {slots.default()}
      </Button>
    }
  }
})
