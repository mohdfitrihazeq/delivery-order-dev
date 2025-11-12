<script setup lang="ts">
import { ref } from 'vue';
import { Button, Card, Input } from '@qubit/prosync';

const email = ref('');

function handleClick() {
    alert(`Email entered: ${email.value}`);
}
</script>

<template>
    <div class="p-6">
        <Card title="Test Card" class="mb-4">
            <p>This is a test card using the UI kit.</p>
            <Input v-model="email" label="Email" placeholder="Enter your email" class="mb-2" />
            <Button variant="primary" @click="handleClick">Click Me</Button>
        </Card>
    </div>
</template>
