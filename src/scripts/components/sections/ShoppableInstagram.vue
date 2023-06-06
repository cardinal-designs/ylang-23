<template lang="pug">
  .shoppable-instagram-container
    h2(v-if="heroSchema.title") {{ heroSchema.title }}
    .yotpo.yotpo-pictures-widget(data-gallery-id="5f848f8a19d86f4270716140")
</template>

<script>
  export default {
    name: 'ShoppableInstagram',
    props: {
      heroSchema: {
        type: Object,
        default: () => ({
          title: String
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .shoppable-instagram-container {
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
  }

  h2 {
    text-align: center;
    margin-bottom: 32px;
  }

  .yotpo.yotpo-pictures-widget {
    margin: 0;
  }
</style>