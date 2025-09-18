<script lang="ts" src="./createDelivery.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card glossy-card mb-0">
            <div class="p-6 max-w-3xl mx-auto">
                <h2 class="text-lg font-semibold mb-6">Steps</h2>

                <!-- 步骤条 -->
                <div class="flex items-center justify-between mb-8">
                    <div v-for="(step, index) in steps" :key="index" class="flex items-center w-full">
                        <!-- Step Circle -->
                        <div class="flex items-center">
                            <div class="flex items-center justify-center w-8 h-8 rounded-full border" :class="[currentStep === index + 1 ? 'border-green-500 text-green-500 font-bold' : 'border-gray-300 text-gray-400']">
                                {{ index + 1 }}
                            </div>
                            <span class="ml-2" :class="currentStep === index + 1 ? 'text-green-500 font-semibold' : 'text-gray-500'">
                                {{ step }}
                            </span>
                        </div>

                        <!-- Line -->
                        <div v-if="index < steps.length - 1" class="flex-1 border-t-2 mx-2" :class="currentStep > index + 1 ? 'border-green-500' : 'border-gray-200'"></div>
                    </div>
                </div>

                <!-- 步骤内容 -->
                <div v-if="currentStep === 1">
                    <h3 class="text-lg font-medium mb-4">Step 1: Header I</h3>
                    <form class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium">Name</label>
                            <input type="text" class="border rounded p-2 w-full" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Email</label>
                            <input type="email" class="border rounded p-2 w-full" />
                        </div>
                    </form>
                </div>

                <div v-if="currentStep === 2">
                    <h3 class="text-lg font-medium mb-4">Step 2: Header II</h3>
                    <form class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium">Address</label>
                            <input type="text" class="border rounded p-2 w-full" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">City</label>
                            <input type="text" class="border rounded p-2 w-full" />
                        </div>
                    </form>
                </div>

                <div v-if="currentStep === 3">
                    <h3 class="text-lg font-medium mb-4">Step 3: Header III</h3>
                    <p class="text-gray-600">Review your information before submitting.</p>
                    <!-- 可以在这里显示 summary -->
                </div>

                <!-- 按钮 -->
                <div class="flex justify-between mt-6">
                    <button class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" :disabled="currentStep === 1" @click="prevStep">Previous</button>
                    <button v-if="currentStep < steps.length" class="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600" @click="nextStep">Next</button>
                    <button v-else class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" @click="submitForm">Submit</button>
                </div>
            </div>
        </div>
    </Motion>
</template>
