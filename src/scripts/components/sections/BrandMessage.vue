<template lang="pug">
  section.brand-message-block
    .brand-message-block__wrapper 
      img.brand-message-block__image(:src="schema.settings.brandImage" :alt="schema.settings.brandImageAlt")
      h1.brand-message-block__heading {{schema.settings.brandMessage}}
      .brand-message-block__cta-wrapper(v-if="schema.settings.ctaURL !== '' && schema.settings.ctaText !== ''")
        a.button.button--primary(:href="schema.settings.ctaURL")
          span.button__content {{schema.settings.ctaText}}
</template>

<script>

export default {
  name: "BrandMessage",
  props: {
    schema: Object,
  },
  components: {},
  computed: {},
  mounted () {},
  beforeDestroy () {},
  methods: {}
}
</script>

<style lang="scss">
  .brand-message-block {
    padding: 40px 16px 56px;

    @include tablet-up {
      padding: 24px 16px 48px;
    }
    &__wrapper {
      margin: 0 auto;
      max-width: 660px;
      text-align: center;
    }

    &__heading {
      font-size: 1.75rem;
      font-weight: 100;
      line-height: 1.75rem;

      @include tablet-up {
        font-size: 3rem;
        line-height: 3rem;
      }
    }

    &__image {
      max-width: 80px;
      margin-bottom: 8px;
      @include tablet-up {
        max-width: 96px;
      }
    }

    &__cta-wrapper {
      padding-top: 16px;
    }
  }
</style>