
import supabase from '@/supabase.js'

const Auth = defineComponent({
  setup () {
    const signIn = async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord'
      })
    }

    const join = () => {
      window.open('https://discord.gg/h8CkAYwwYB', '_blank')
    }

    return () => {
      return <div class='grid gap-4'>
        <h1 class='font-din text-5xl font-black'>Art Promo</h1>
        <Button onClick={signIn}>Sign in with Discord</Button>
        <Button onClick={join}>Join the Discord</Button>
      </div>
    }
  }
})

export default () => {
  return <Layout>
    <Auth/>
  </Layout>
}
