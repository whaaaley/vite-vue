
import useApiStore from '@/stores/useApi.js'

const Dropzone = defineComponent({
  props: {
    modelValue: {
      type: [Object, null]
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup (props, { emit }) {
    const image = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value)
      }
    })

    const dragover = event => {
      event.preventDefault() // Prevent the browser from opening the file
    }

    const drop = event => {
      event.preventDefault() // Prevent the browser from opening the file

      const files = event.dataTransfer.files
      const file = files[0]

      if (files.length > 1) {
        window.alert('You can only upload one image')
      /* } else if (file.type !== 'image/png' && file.type !== 'image/jpg') {
        window.alert('You can only upload PNG or JPG') */
      } else {
        image.value = file
      }
    }

    const fileSelect = event => {
      const [file] = event.target.files
      image.value = file
    }

    return () => {
      return <div class='border-shark-600 rounded-lg border-2 border-dashed' onDrop={drop} onDragover={dragover}>
        <div class='text-shark-500 grid justify-center gap-1 p-4'>
          <Show when={image.value != null}>
            <img class='m-auto max-h-[9rem] max-w-[9rem] rounded-lg object-cover' src={URL.createObjectURL(image.value)}/>
          </Show>
          <Show when={image.value == null}>
            <PhotoIcon class='m-auto h-16 w-16 stroke-1'/>
          </Show>
          <div class='font-semibold'>
            <div class='text-xl'>Drop your artwork here!</div>
            <div class='text-center text-sm'>(Discord's limit is 25mb)</div>
            <div class='flex justify-center pt-4'>
              <LabelButton>
                Select Artwork
                <input type='file' onChange={fileSelect} hidden/>
              </LabelButton>
            </div>
          </div>
        </div>
      </div>
    }
  }
})

export default defineComponent({
  setup () {
    const router = useRouter()
    const apiStore = useApiStore()

    const model = reactive({
      loading: false,
      image: null,
      artstation: '',
      instagram: '',
      twitter: ''
    })

    const postArtwork = async () => {
      console.log('posting artwork')
      model.loading = true

      await apiStore.shareArtwork({
        image: model.image,
        artstation: model.artstation,
        instagram: model.instagram,
        twitter: model.twitter
      })

      if (apiStore.state.shareArtwork.success) {
        console.log('success')
      }

      model.loading = false
    }

    const header = () => {
      return <h1 class='font-din-exp font-black'>
        <span class='uppercase tracking-wider'>Share Artwork</span>
      </h1>
    }

    return () => {
      return <Layout>
        <div class='grid w-full max-w-lg gap-6'>
          <Card loading={model.loading} v-slots={{ header }}>
            <div class='grid gap-4 rounded-xl'>
              <Show when={apiStore.state.shareArtwork.error != null}>
                <p class='rounded-lg bg-red-900/50 px-4 py-3 text-sm'>
                  {apiStore.state.shareArtwork.error ?? 'Something went wrong'}
                </p>
              </Show>
              <Dropzone v-model={model.image}/>
              <p class='bg-shark-700 rounded-lg px-4 py-3 text-sm'>
                Please add links to your social media posts.
                These should link to the posts themselves, not your profile.
              </p>
              <InputText
                label='ArtStation'
                placeholder='https://artstation.com/artwork/:id'
                v-model={model.artstation}
              />
              <InputText
                label='Instagram'
                placeholder='https://instagram.com/p/:id'
                v-model={model.instagram}
              />
              <InputText
                label='Twitter'
                placeholder='https://twitter.com/:user/status/:id'
                v-model={model.twitter}
              />
            </div>
          </Card>
          <div class='flex justify-between'>
            <Button class='bg-shark-800' onClick={router.back}>Cancel</Button>
            <Button onClick={postArtwork}>Post Artwork</Button>
          </div>
        </div>
      </Layout>
    }
  }
})
