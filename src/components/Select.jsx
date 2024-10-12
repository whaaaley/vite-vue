
export default defineComponent({
  props: {
    label: {
      type: String
    },
    options: {
      type: Array
    },
    modelValue: {
      type: String
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup (props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value)
      }
    })

    return () => {
      return <label class='grid gap-1'>
        <Show when={props.label}>
          <div class='text-shark-300 px-3 text-xs font-black'>
            <span class='font-din-exp uppercase tracking-wider'>{props.label}</span>
          </div>
        </Show>
        <select
          v-model={value.value}
          class={[
            'bg-shark-900/50 h-10 rounded-lg pl-3 text-sm',
            'border-2 border-transparent outline-none focus:border-blue-500'
          ]}>
          {props.options.map(value => <option value={value}>{value}</option>)}
        </select>
      </label>
    }
  }
})
