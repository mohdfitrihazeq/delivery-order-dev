<template>
    <div class="location-item">
        <div class="location-row" :style="{ paddingLeft: level * 20 + 'px', marginTop: level === 0 ? '20px' : '10px' }" v-tooltip="`This is Location ${level + 1}`">
            <!-- 展开/折叠按钮 -->
            <Button v-if="hasChildren" icon="pi" :class="isExpanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" class="p-button-text p-button-sm toggle-btn" @click="toggleExpand" />

            <!-- L 形箭头 -->
            <span v-if="level > 0" class="arrow"> └─ </span>

            <span>{{ location.name }}</span>
        </div>

        <!-- 遍历子级 -->
        <div v-show="isExpanded">
            <LocationItem v-for="(child, key) in location.children" :key="key" :location="child" :level="level + 1" />
        </div>
    </div>
</template>

<script lang="ts">
import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';
import { defineComponent, PropType } from 'vue';

interface Location {
    name: string;
    children?: Record<string, Location>;
    [key: string]: any;
}

export default defineComponent({
    name: 'LocationItem',
    components: { LocationItem: () => import('@/views/project/components/tab/Location.vue'), Button },
    directives: { tooltip: Tooltip },
    props: {
        location: { type: Object as PropType<Location>, required: true },
        level: { type: Number, default: 0 }
    },
    data() {
        return { isExpanded: true };
    },
    computed: {
        hasChildren(): boolean {
            return this.location.children && Object.keys(this.location.children).length > 0;
        }
    },
    methods: {
        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        }
    }
});
</script>

<style scoped>
.location-item {
    margin-bottom: 5px;
}

.location-row {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.toggle-btn {
    margin-right: 5px;
}

.arrow {
    color: gray;
    margin-right: 5px;
}
</style>
