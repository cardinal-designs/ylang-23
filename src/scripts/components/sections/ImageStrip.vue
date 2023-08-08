<template lang="pug">
    section.itp-section-padded(
      :style="paddingStyles"
    )
      div.itp.text-center.container(
        v-if="schema.blocks.length >= 2"
      )
        .itp__blocks.itp__static(
          :style="columnStyles"
        )
          component.itp__itp(
            v-for="block in schema.blocks"
            :is="block.settings.itp_url ? 'a' : 'div'"
            :href="block.settings.itp_url"
            :aria-label="block.settings.link_aria_label"
            :target="block.settings.itp_link_target || '_self'"
            :key="block.id"
            v-if="block.settings.itp_logo"
          )
            picture.itp__img-wrap
              source(
                :srcset="imageSize(block.settings.itp_logo, '500x')"
                media="(min-width: 992px)"
              )
              source(
                :srcset="imageSize(block.settings.itp_logo, '900x')"
                media="(min-width: 768px)"
              )
              img.itp__img(
                :src="imageSize(block.settings.itp_logo, '600x')"
                :alt="block.itp_logo_alt"
                loading="lazy"
              )
</template>

<script>
import { imageSize, imageCrop, checkUndefined } from '../../helpers/util';
import { px } from 'scripts/filters/string.js'

export default {
  name: "ImageStrip",
  props: {
    schema: Object
  },
  computed: {
    paddingStyles() {
      return {
        'padding-top': px(checkUndefined(this.schema.settings.paddingTop, 56)),
        'padding-bottom': px(checkUndefined(this.schema.settings.paddingBottom, 56)),
        'padding-left': px(checkUndefined(this.schema.settings.paddingLeft, 56)),
        'padding-right': px(checkUndefined(this.schema.settings.paddingRight, 56))
      }
    },
    columnStyles() {
      return {
        'column-gap': px(checkUndefined(this.schema.settings.columnGap, 8)),
        'row-gap': px(checkUndefined(this.schema.settings.rowGap, 8)),
      }
    }
  },
  methods: {
    imageSize,
    imageCrop
  },
}
</script>

<style lang="scss" scoped>
  .container {
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
  }

  .itp-section-padded {
    padding: 0 24px;
    @include mobile-only {
      padding: 0;
    }
  }

  .itp {
    &__title {
      user-select: none;
      margin-bottom: 32px;

      @include desktop-only {
        margin-bottom: 32px;
      }
    }

    &__img {
      user-select: none;
      padding: 0;
      width: 100%;
    }

    &__static {
      display: none;
    }

    &__itp {
      margin: 0 auto;
      width: 50%;
      @include mobile-only {
        width: 100%;
      }
    }

    &__img-wrap {
      display: flex;
    }

    &__pagination {
      position: absolute;
      top: calc(100% - 16px);
      left: 0;
      width: 100%;
    }

    @include desktop-only {
      &__itp {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__static {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
      }
    }
    @include mobile-only {
      &__itp {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__static {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }
    .itp__img-wrap {
      height: 100%;
      width: 100%;
    }
  }
</style>
