
<template lang="pug">
  .accordion-group
    slot
</template>

<script>
  export default {
    name: 'AccordionGroup',
    data () {
      return {
        accordions: []
      }
    },
    methods: {
      addAccordion (accordion) {
        this.accordions.push(accordion)
      },
      removeAccordion (accordion) {
        let index = this.accordions.findIndex(a => a.heading === accordion.heading)
        this.accordions.splice(index, 1)
      },
      activate ({ heading }) {
        const toOpen = this.accordions.filter(a => !a.active)
        const toClose = this.accordions.filter(a => a.active && a.autoClose !== false)

        toOpen.concat(toClose)
          .forEach((accordion) => {
            accordion.active = Boolean(heading === accordion.heading)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>