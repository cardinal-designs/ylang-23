
<template lang="pug">
  .footer-email-collection(:style="{'background-color': backgroundColor, 'color': fontColor}")
    .footer-email-collection__content
      .footer-email-collection__form
        slot
</template>

<script>
  export default {
    name: 'FooterEmailCollection',
    props: {
      schema: Object,
      newsletter: String,
    },
    computed: {
      backgroundColor() {
        return this.schema.settings.backgroundColor;
      },
      fontColor() {
        return this.schema.settings.textColor
      },
    },
    data() {
      return {};
    },
  }
</script>

<style lang="scss">
  .footer-email-collection {
    padding: 48px 16px 56px 16px;
    margin: 0 auto;

    @include desktop-up {
      padding: 48px 20px 56px 20px;
    }

    &__content {
      position: relative;
      flex-direction: column;
      align-items: center;
      max-width: 344px;
      text-align: center;
      margin: 0 auto;

      @include desktop-up {
        max-width: 429px;
        margin: 0 auto;
        padding: 0;
      }
    }

    &__title {
      margin-bottom: 8px;
      font-size: 28px;

      @include desktop-up {
        width: 100%;
        margin-bottom: 16px;
      }
    }

    &__text {
      font-size: rem(14);

      @include desktop-up {
        font-size: rem(16);
        width: 100%;
        margin-right: 44px;
        flex-basis: 50%;
      }

      .footer-content--center & {
        @include mobile-only {
          text-align: center;
        }
      }
    }

    &__body {
      margin-bottom: 16px;
      font-size: rem(12);
      line-height: 1.33;

      @include desktop-up {
        font-size: rem(14);
      }

      p, span, em, strong {
        font-size: inherit;
        line-height: inherit;
        color: inherit;
      }
    }
  }
</style>