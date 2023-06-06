<template lang="pug">
  div(:class="schema.settings.backgroundColor")
    .ff__container(:style="{'max-width': schema.settings.maxWidth}")
      split-wrapper(
        :imageWidthClass="schema.settings.imageWidth"
        :backgroundColorClass="schema.settings.backgroundColor"
        :textAlignmentClass="schema.settings.textAlignment"
        :reversedClass="schema.settings.layout"
        :marginTop="schema.settings.marginTop"
        :marginBottom="schema.settings.marginBottom"
      )
        template(slot="image")
          a.ff__image.ff__image(
            :href="schema.settings.ctaUrl"
            :aria-label="schema.settings.subheader || schema.settings.preheader"
          )
            picture
              source(
                :srcset="imageSize(schema.settings.imageDesktop, '900x')"
                media="(min-width: 992px)"
              )
              source(
                :srcset="imageSize(schema.settings.imageMobile || schema.settings.imageDesktop, '900x')"
                media="(min-width: 768px)"
              )
              img(
                :src="imageSize(schema.settings.imageMobile || schema.settings.imageDesktop, '600x')"
                :alt="schema.settings.subheader || schema.settings.preheader"
                loading="lazy"
              )
        template(slot="content")
          .ff__main-wrap
            p.preheader.ff__preheader(:class="schema.settings.preheaderColor", v-if="schema.settings.preheader") {{ schema.settings.preheader }}
            h2.ff__header(:class="[schema.settings.imageWidth === 'sw--50' ? 'h3': 'h2', schema.settings.headerColor]", v-if="schema.settings.header") {{ schema.settings.header }}
            p.subheader.ff__subheader(:class="schema.settings.subheaderColor", v-if="schema.settings.subheader") {{ schema.settings.subheader }}
            .ff__body(:class="{[schema.settings.bodyColor]: true, 'ff-body-margin-bottom--none': !(schema.settings.ctaText && schema.settings.ctaUrl)}", v-html="schema.settings.body", v-if="schema.settings.body")
            component(
              :is="/link/.test(schema.settings.ctaStyle) ? 'v-link': 'v-button'"
              tag="a"
              :class="schema.settings.ctaStyle"
              :href="schema.settings.ctaUrl"
              v-if="schema.settings.ctaText && schema.settings.ctaUrl"
            ) {{ schema.settings.ctaText }}
</template>

<script>
import VButton from '../buttons/VButton.vue';
import VLink from '../buttons/VLink.vue';
import SplitWrapper from '../basic/SplitWrapper.vue';
import { imageSize } from '../../helpers/util';

export default {
  name: "FiftyFifty",
  props: {
    schema: Object,
  },
  computed: {
  },
  components: {
    VButton,
    VLink,
    SplitWrapper
  },
  methods: {
    imageSize
  }
}
</script>

<style lang="scss">
  .ff {
    &__container {
      margin: 0 auto;

      @include mobile-only {
        .sw {
          display: block;
        }
      }
    }

    &__main-wrap > * {
      margin-bottom: 8px;
    }

    &__main-wrap > *:last-child {
      margin-bottom: 0;
    }

    &__header {
      @include desktop-up {
        margin-bottom: 8px;
      }
    }

    &__body {
      margin-bottom: 24px;
      @include mobile-only {
        margin-bottom: 16px;
      }
    }

    &__body-margin-bottom--none {
      margin-bottom: 0;
    }

    .sw &__image--desktop {
      display: none;
    }

    .button {
      margin: 0;
    }

    @include desktop-up {
      .sw &__image--mobile {
        display: none;
      }

      .sw &__image--desktop {
        display: block;
      }

      .sw__main {
        padding: 5%;
      }
    }
  }
  @include mobile-only {
    .sw {
      &__image {
        height: 229px;
      }
    }

    .sw__main {
      padding: 0px 14px 24px;
    }

    .sw {
      padding: 24px 12px 0px;
    }

    .sw--60 {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  // Passing the selected color to v-html
  .ff__body.body-md p {
    color: inherit;
  }

  .ff__image {
    position: relative;

    img {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      height: 100%;
      object-fit: cover;
    }
  }
</style>