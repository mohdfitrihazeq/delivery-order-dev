<script lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseSpinner',
    components: { ProgressSpinner },
    props: {
        size: {
            type: Number,
            default: 50
        }
    }
});
</script>

<template>
    <div class="flex justify-center items-center py-10">
        <ProgressSpinner strokeWidth="4" animationDuration="2.5s" :style="{ width: size + 'px', height: size + 'px' }" />
    </div>
</template>
