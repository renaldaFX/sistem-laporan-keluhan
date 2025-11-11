<template>
    <div v-if="variant === 'alert-success'" role="alert" class="alert alert-success mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ message }}</span>
        </div>

        <!-- Alert Error -->
        <div v-if="variant === 'alert-error'" role="alert" class="alert alert-error mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ message }}</span>
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</button>
        </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        message: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            required: true // akan berisi 'alert-success' atau 'alert-error'
        }
    },
    // 2. Deklarasikan event yang akan dikirim ke Upload.vue
    emits: ['close']
}
</script>