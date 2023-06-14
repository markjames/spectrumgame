<!-- CustomInput.vue -->
<script setup lang="ts">
/*
* A component that displays a grid of avatar images. Clicking one selects that images,
* and updates the model value with that image's index number
*/

const props = defineProps<{
  modelValue: number
  images: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [id: number]
}>()

const selectIndex = (idx:number) => {
    emit("update:modelValue",idx);
}

</script>

<template>
    <div class="avatar-select"
    role="radiogroup"
    aria-label="Select an Avatar">
        <div class="avatar-select--item"
            v-for="(avatarImage,idx) of props.images"
            v-bind:key="avatarImage"
            @click="selectIndex(idx)"
            >
            <img :src="avatarImage" role="radio" :aria-checked="idx == props.modelValue" />
        </div>
    </div>
</template>

<style scoped>
.avatar-select {
    display: flex;
    flex-wrap: wrap;
}
.avatar-select--item {
    display: flex;
    flex: 0 0 65px;
}
img {
    max-width: 60px;
    max-height: 60px;
    border: 3px solid rgba(0,0,0,0);
    border-radius: 100px;
}
img[aria-checked="true"] {
    box-shadow: 0 1px 4px 4px #FFF;
}

</style>