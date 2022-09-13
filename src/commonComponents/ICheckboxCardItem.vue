<template>
    <div class="idm-checkbox-card-item">
        <div class="d-flex align-s">
            <van-checkbox
                :icon-size="propData && propData.iconSize"
                :shape="propData.iconStyle"
                class="idm-checkbox-card-checkbox margin-top-1"
                :disabled="itemData.isDisabled || isDev"
                @click="$emit('itemDataChange', { itemIndex: itemIndex })"
                v-model="itemData.isCheck"
            ></van-checkbox>
            <div class="flex-1 idm-checkbox-card-title">
                {{ IDM.express.replace(`@[${propData.titleField}]`, itemData, true) }}
            </div>
        </div>
        <div v-for="(item, index) in itemData.children" :key="index" class="idm-checkbox-card-sub d-flex align-s">
            <van-checkbox
                :icon-size="propData && propData.iconSize"
                :shape="propData.iconStyle"
                class="idm-checkbox-card-checkbox"
                :disabled="item.isDisabled || isDev"
                @click="$emit('subItemChange', { index, itemIndex })"
                v-model="item.isCheck"
            ></van-checkbox>
            <img
                :src="IDM.url.getWebPath(IDM.express.replace(`@[${propData.avatarField}]`, item, true))"
                class="idm-checkbox-card-avatar"
                alt=""
            />
            <div class="flex-1">
                <div class="d-flex just-b align-c">
                    <div class="idm-checkbox-card-username">
                        {{ IDM.express.replace(`@[${propData.usernameField}]`, item, true) }}
                    </div>
                    <div class="idm-checkbox-card-time">
                        {{ IDM.express.replace(`@[${propData.timeField}]`, item, true) }}
                    </div>
                </div>
                <div class="idm-checkbox-card-content">
                    <div class="text-o-e-2">
                        {{ IDM.express.replace(`@[${propData.contentField}]`, item, true) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ICheckboxCard',
    props: {
        itemData: {
            type: Object,
            required: true,
            default: () => {}
        },
        itemIndex: {
            type: Number,
            required: true,
            default: 0
        },
        propData: {
            type: Object,
            default: () => {}
        },
        moduleObject: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        isDev() {
            return this.moduleObject.env === 'develop'
        }
    }
}
</script>
<style lang="scss" scoped>
.idm-checkbox-card-item {
    .idm-checkbox-card-sub:last-child {
        margin-bottom: 0 !important;
    }
    &:last-child {
        margin-bottom: 0 !important;
    }
    .margin-top-1{
        margin-top: 1px !important;
    }
}
</style>
