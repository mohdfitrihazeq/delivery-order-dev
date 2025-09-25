<script lang="ts" src="./createDelivery.script"></script>

<template>
    <div class="card flex justify-center">
        <Stepper v-model:value="activeStep" class="w-full max-w-6xl mt-4" :clickable="false">
            <StepList class="flex justify-between">
                <!-- Step 1 -->
                <Step :value="1">
                    <div class="flex flex-col items-center gap-2">
                        <span
                            :class="[
                                'rounded-full border-2 w-8 h-8 flex items-center justify-center',
                                {
                                    'bg-primary text-primary-contrast border-primary': 1 <= activeStep,
                                    'border-surface-200 dark:border-surface-700': 1 > activeStep
                                }
                            ]"
                        >
                            <i class="pi pi-truck" />
                        </span>
                        <span class="text-sm font-medium" :class="{ 'text-primary': 1 <= activeStep }"> Delivery Info </span>
                    </div>
                </Step>

                <!-- Step 2 -->
                <Step :value="2">
                    <div class="flex flex-col items-center gap-2">
                        <span
                            :class="[
                                'rounded-full border-2 w-8 h-8 flex items-center justify-center',
                                {
                                    'bg-primary text-primary-contrast border-primary': 2 <= activeStep,
                                    'border-surface-200 dark:border-surface-700': 2 > activeStep
                                }
                            ]"
                        >
                            <i class="pi pi-box" />
                        </span>
                        <span class="text-sm font-medium" :class="{ 'text-primary': 2 <= activeStep }"> Select PO </span>
                    </div>
                </Step>

                <!-- Step 3 -->
                <Step :value="3">
                    <div class="flex flex-col items-center gap-2">
                        <span
                            :class="[
                                'rounded-full border-2 w-8 h-8 flex items-center justify-center',
                                {
                                    'bg-primary text-primary-contrast border-primary': 3 <= activeStep,
                                    'border-surface-200 dark:border-surface-700': 3 > activeStep
                                }
                            ]"
                        >
                            <i class="pi pi-check" />
                        </span>
                        <span class="text-sm font-medium" :class="{ 'text-primary': 3 <= activeStep }"> Verify Items </span>
                    </div>
                </Step>

                <!-- Step 4 -->
                <Step :value="4">
                    <div class="flex flex-col items-center gap-2">
                        <span
                            :class="[
                                'rounded-full border-2 w-8 h-8 flex items-center justify-center',
                                {
                                    'bg-primary text-primary-contrast border-primary': 4 <= activeStep,
                                    'border-surface-200 dark:border-surface-700': 4 > activeStep
                                }
                            ]"
                        >
                            <i class="pi pi-file" />
                        </span>
                        <span class="text-sm font-medium" :class="{ 'text-primary': 4 <= activeStep }"> Review </span>
                    </div>
                </Step>
            </StepList>

            <!-- Panels -->
            <StepPanels>
                <StepPanel :value="1">
                    <DeliveryInfo @update="handleStep1Update" />
                </StepPanel>
                <StepPanel :value="2">
                    <SelectPO @update="handleStep2Update" @next-step="goStep(3)" @prev-step="goStep(1)" />
                </StepPanel>
                <StepPanel :value="3">
                    <VerifyItem @update="handleStep3Update" @next-step="goStep(4)" :selected-po="deliveryData.selectPO" @prev-step="goStep(2)" />
                </StepPanel>
                <StepPanel :value="4">
                    <div v-if="canPassToReview"><Review @update="handleStep4Update" :deliveryData="deliveryData" /></div>
                    <div v-else class="text-gray-500">Please complete all previous steps before reviewing.</div>
                </StepPanel>
            </StepPanels>
        </Stepper>
    </div>
</template>
