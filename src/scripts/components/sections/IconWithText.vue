<template>
    <div class="icon__with-text bg-light-grey">
        <div>
            <div class="container">
                <h2 class="h2" v-if="schema.settings.title">{{ schema.settings.title }}</h2>
                <div class="icon__with-text-item-wrapper">
                    <div class="single__block" v-for="block in schema.blocks">
                        <div class="single__block-item">
                            <div class="single__block-icon">
                                <img height="48" width="48" :src="block.settings.icon_image.src" class="reveal"
                                    :alt="block.settings.icon_title" v-if="block.settings.icon_image.src">
                                    <img height="48" width="48" :src="block.settings.icon_image" class="reveal"
                                    :alt="block.settings.icon_title" v-if="block.settings.icon_image  && typeof block.settings.icon_image == 'string'">
                            </div>
                            <div class="single__block-content">
                                <span class="h4" v-if="block.settings.icon_title">{{ block.settings.icon_title }}</span>
                                <div class="single__block-icon-content" v-if="block.settings.icon_content"
                                    v-html="block.settings.icon_content"></div>
                            </div>
                            <v-link class="single__block-link link" v-if="block.settings.icon_link_url"
                                :href="block.settings.icon_link_url">
                                {{ block.settings.icon_link_text }}
                                <icon name="chevron-right" size="10px" />
                            </v-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.icon__with-text {
  padding: 60px 0;
  h2 {
    text-align: center;
    margin-bottom: 40px;
  }
  .icon__with-text-item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 40px;
    @media (max-width: 991px) {
      gap: 40px;
      flex-wrap: wrap;
    }
    @media (max-width: 767px) { 
      display: block;
    }
    .single__block {
      flex: 0 0 calc(25% - 40px);
      text-align: center;
      @media (max-width: 991px) {
        flex: 0 0 calc(50% - 40px);
        text-align: center;
      }
      @media (max-width: 767px) { 
        flex: 0 0 100%;
        text-align: center;
        margin-bottom: 30px;       
      }
      &.single__block:last-child {
        margin-bottom: 0;
      }
      .single__block-item {
        .single__block-icon {
          max-width: 110px;
          margin: 0 auto;
        }
        .single__block-content {
          margin: 20px 0;
          .single__block-icon-content {
            margin: 15px 0;
          }
        }
        .single__block-link {
          width: 100%;
          .link__content {
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
                display: inline-block !important;
            }
          }
        }
      }
    }
  }
}
</style>
<script>
import VLink from '../buttons/VLink.vue';
import Icon from '../basic/Icon.vue'
export default {
    name: "IconWithText",
    components: {
        VLink,Icon
    },
    props: {
        schema: Object
    }
}
</script>
