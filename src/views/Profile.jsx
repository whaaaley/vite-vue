
import useApiStore from '@/stores/useApi.js'

export default defineComponent({
  setup () {
    const router = useRouter()
    const apiStore = useApiStore()

    const model = reactive({
      loading: false,
      artstation: '',
      instagram: '',
      twitter: '',
      channel: '#small-artists'
    })

    onMounted(async () => {
      model.loading = true
      await apiStore.readProfile()

      if (apiStore.state.readProfile.success) {
        console.log('success')
        const [profile] = apiStore.state.readProfile.data

        model.artstation = profile.artstation
        model.instagram = profile.instagram
        model.twitter = profile.twitter
        model.channel = profile.channel
      }

      model.loading = false
    })

    const updateProfile = async () => {
      console.log('updating profile')
      model.loading = true

      await apiStore.updateProfile({
        artstation: model.artstation,
        instagram: model.instagram,
        twitter: model.twitter,
        channel: model.channel
      })

      if (apiStore.state.updateProfile.success) {
        console.log('success')
      }

      model.loading = false
    }

    return () => {
      const header = () => {
        return <h1 class='font-din-exp font-black'>
          <span class='uppercase tracking-wider'>Edit Profile</span>
        </h1>
      }

      return <Layout>
        <div class='grid w-full max-w-lg gap-6'>
          <Card loading={model.loading} v-slots={{ header }}>
            <div class='grid gap-4 rounded-xl'>
              <p class='bg-shark-700 rounded-lg px-4 py-3 text-sm'>
                Add your social media usernames here.
                These will be included in community posts if you're selected for a showcase.
              </p>
              <InputText
                label='ArtStation'
                placeholder='Username'
                v-model={model.artstation}
              />
              <InputText
                label='Instagram'
                placeholder='Username'
                v-model={model.instagram}
              />
              <InputText
                label='Twitter'
                placeholder='Username'
                v-model={model.twitter}
              />
              <Select
                label='Channel'
                options={['#small-artists', '#medium-artists', '#large-artists']}
                v-model={model.channel}
              />
            </div>
          </Card>
          <div class='flex justify-between'>
            <Button class='bg-shark-800' onClick={router.back}>Cancel</Button>
            <Button onClick={updateProfile}>Save Profile</Button>
          </div>
        </div>
      </Layout>
    }
  }
})
