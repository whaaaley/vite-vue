
import supabase from '@/supabase.js'

export default defineStore('auth', () => {
  const state = reactive({
    user: null,
    error: null
  })

  const discord = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord'
    })

    state.user = data
    state.error = error
  }

  return {
    state,
    discord
  }
})
