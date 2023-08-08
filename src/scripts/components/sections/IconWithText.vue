<template>
    <div class="icon__with-text bg-light-grey">
        <div>
            <div class="container">
                <h2 class="h2" v-if="schema.settings.title">{{ schema.settings.title }}</h2>
                <div class="icon__with-text-item-wrapper">
                    <div class="single__block" v-for="block in schema.blocks">
                        <div class="single__block-item">
                            <div class="single__block-icon" v-if="block.settings.icon_image">
                                <img height="48" width="48" :src="block.settings.icon_image.src" class="reveal"
                                    :alt="block.settings.icon_title">
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
.icon__with-text-item-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon__with-text {
    padding: 60px 0;
}

.icon__with-text h2 {
    text-align: center;
    margin-bottom: 40px;
}

.single__block {
    flex: 0 0 25%;
    text-align: center;
}
.single__block-link{
    &.link{
        svg{
            display: block !important;
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
