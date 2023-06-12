<template>
    <p class="gamequestion" :style="cardStyle">
        <b>{{ props.question.left }}</b><span> or </span><b>{{ props.question.right }}</b>
    </p>
</template>
  
<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
import {type Question} from '@/stores/questions'

const props = defineProps<{
    question: Question
}>();

const cardStyle = computed(():StyleValue => {
    return `background:linear-gradient(90deg,${props.question.leftColor} 49.999%,${props.question.rightColor} 50%)`;
})

</script>
    
<style scoped>
.gamequestion {
    background: #DDD;
    padding: 1em;
    border-radius: 0.7em;
    display: inline-flex;
    color: #FFF;
}
</style>