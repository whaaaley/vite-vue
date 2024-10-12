
import supabase from '@/supabase.js'

export default defineComponent({
  setup () {
    const model = reactive({
      loading: false,
      user: null
    })

    const getUser = async () => {
      model.loading = true

      const { data, error } = await supabase.auth.getUser()
      console.log(data, error)

      model.user = data.user
      model.loading = false
    }

    onMounted(getUser)

    const header = () => {
      return <Show when={model.user != null}>
        <div class='flex justify-between'>
          <div class='flex items-center gap-4'>
            <img src={model.user.user_metadata.picture} class='h-12 w-12 rounded-full'/>
            <h1>Hello, {model.user.user_metadata.name}</h1>
          </div>
          <div class='flex items-center'>
            <RouterButton class='bg-shark-800' to={{ name: 'Profile' }}>Edit Profile</RouterButton>
          </div>
        </div>
      </Show>
    }

    const toInstagram = event => {
      event.preventDefault()
      window.open('https://instagram.com/artpromoshowcase', '_blank')
    }

    return () => {
      return <Layout>
        <div class='grid w-full max-w-lg gap-6'>
          <Card loading={model.loading} v-slots={{ header }}>
            <div class='grid gap-4 text-sm'>
              <div class='bg-shark-700 rounded-lg px-4 py-3'>
                <p>
                  This is the official app for the Art Promo discord.
                  Add your social media handles to your profile before sharing!
                  {/* Here you can view your posts, share artwork, and check your account rank. */}
                </p>
              </div>
              <div class='bg-shark-700 rounded-lg px-4 py-3'>
                <p class='flex items-center justify-between'>
                  Make sure to follow the community Instagram!
                  <RouterButton class='bg-shark-800' onClick={toInstagram}>Follow</RouterButton>
                </p>
              </div>
            </div>
          </Card>
          <div class='flex justify-between gap-4'>
            <RouterButton class='bg-shark-800' to={{ name: 'Share' }}>Sign Out</RouterButton>
            <RouterButton to={{ name: 'Share' }}>Share Artwork</RouterButton>
          </div>
        </div>
      </Layout>
    }
  }
})
