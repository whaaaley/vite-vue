
const Appbar = {
  setup () {
    return () => {
      return <div class='absolute py-4 px-5'>
        <h1 class='font-din-exp text-shark-500 text-xl font-black uppercase tracking-wider'>
          Art Promo
        </h1>
      </div>
    }
  }
}

export default defineComponent({
  setup () {
    return () => {
      return <>
        <Appbar/>
        <RouterView/>
      </>
    }
  }
})
