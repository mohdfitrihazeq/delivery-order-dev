<script lang="ts" src="./selectPO"></script>

<template>
    <div class="p-mb-5 mt-5">
        <Message severity="secondary" variant="outlined" :closable="false">
            <i class="pi pi-box"></i>
            Select the Pruchase Order that corresponds to this delivery. You can search by PO number or item name.
        </Message>

        <Card class="mt-6 border">
            <template #title> <i class="pi pi-search"></i> Search Purchase Order </template>
            <template #content>
                <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4 mt-1 w-full sm:w-full">
                    <div class="grid grid-cols-2 gap-4 p-3">
                        <!-- Driver Plate Number -->
                        <div class="flex flex-col">
                            <label for="driverPlate">Driver Plate Number</label>
                            <InputText name="driverPlate" placeholder="Plate Number" fluid />
                            <Message v-if="errors.driverPlate" severity="error" size="small" variant="simple">
                                {{ errors.driverPlate }}
                            </Message>
                        </div>
                    </div>

                    <div class="flex justify-end mt-4"><Button type="submit" label="Next" severity="primary" /></div>
                </Form>
            </template>
        </Card>
    </div>
</template>
