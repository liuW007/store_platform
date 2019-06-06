export default {
    props: {
      parentItem: {
        type: Object,
        default: () => {}
      },
      theme: String,
      iconSize: Number
    },
    computed: {
      parentName () {
        // console.log('parentItem=>',this.parentItem)
        return this.parentItem.name
      },
      children () {
        return this.parentItem.children
      },
      textColor () {
        return this.theme === 'dark' ? '#fff' : '#495060'
      }
    }
  }