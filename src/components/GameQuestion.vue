<template>
    <p class="gamequestion" :style="cardStyle">
        <b>{{ props.left }}</b><span> or </span><b>{{ props.right }}</b>
    </p>
</template>
  
<script setup lang="ts">
import { computed, type StyleValue } from 'vue';

type Question = {
    left: string,
    right: string,
    leftColor: string,
    rightColor: string
}

const props = withDefaults(defineProps<Question>(), {
    left: "A",
    right: "B",
    leftColor: "#777",
    rightColor: "#999",
})

const cardStyle = computed(():StyleValue => {
    return `background:linear-gradient(90deg,${props.leftColor} 49.999%,${props.rightColor} 50%)`;
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