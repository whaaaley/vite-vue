
import supabase from '@/supabase.js'

export default defineStore('api', () => {
  const state = reactive({
    shareArtwork: {
      data: null,
      success: null,
      error: null
    },
    readProfile: {
      data: null,
      success: null,
      error: null
    },
    updateProfile: {
      data: null,
      success: null,
      error: null
    }
  })

  const shareArtwork = async data => {
    try {
      const formData = new FormData()

      for (const key in data) {
        formData.append(key, data[key])
      }

      const { data: sessionData, error } = await supabase.auth.getSession()

      if (error) {
        throw new Error(error)
      }

      const res = await fetch(import.meta.env.VITE_API_URL + '/share-artwork', {
        method: 'POST',
        headers: {
          'Authorization': sessionData.session.access_token
        },
        body: formData
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      console.log(res.data)

      state.shareArtwork = {
        data: res.data,
        success: true,
        error: null
      }
    } catch (err) {
      console.log(err)

      state.shareArtwork = {
        data: null,
        success: false,
        error: err.message
      }
    }
  }

  const readProfile = async () => {
    try {
      const { data: sessionData, error } = await supabase.auth.getSession()

      if (error) {
        throw new Error(error)
      }

      const res = await supabase
        .from('profiles')
        .select()
        .eq('user_id', sessionData.session.user.id)

      state.readProfile = {
        data: res.data,
        success: true,
        error: null
      }
    } catch (err) {
      console.log(err)

      state.readProfile = {
        data: null,
        success: false,
        error: err
      }
    }
  }

  const updateProfile = async data => {
    try {
      const { data: sessionData, error } = await supabase.auth.getSession()

      if (error) {
        throw new Error(error)
      }

      const res = await supabase
        .from('profiles')
        .update({
          artstation: data.artstation,
          instagram: data.instagram,
          twitter: data.twitter,
          channel: data.channel
        })
        .eq('user_id', sessionData.session.user.id)

      state.updateProfile = {
        data: res.data,
        success: true,
        error: null
      }
    } catch (err) {
      console.log(err)

      state.updateProfile = {
        data: null,
        success: false,
        error: err
      }
    }
  }

  return {
    state,
    shareArtwork,
    readProfile,
    updateProfile
  }
})
