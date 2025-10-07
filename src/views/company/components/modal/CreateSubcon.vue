<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface ContactPerson {
    name: string;
    email: string;
    contactNumber: string;
    selected: boolean;
}

interface Information {
    name: string;
    shortCode: string;
    faxNumber: string;
    regNo: string;
    gstId: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    contacts: ContactPerson[];
}

export default defineComponent({
    name: 'CreateInformationModal',
    props: {
        visible: { type: Boolean, required: true }
    },
    emits: ['update:visible', 'submit'],
    setup(props, { emit }) {
        const close = () => emit('update:visible', false);

        const form = reactive<Information>({
            name: '',
            shortCode: '',
            faxNumber: '',
            regNo: '',
            gstId: '',
            address1: '',
            address2: '',
            address3: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            contacts: [{ name: '', email: '', contactNumber: '', selected: false }]
        });

        const addContact = () => {
            if (form.contacts.length < 3) {
                form.contacts.push({ name: '', email: '', contactNumber: '', selected: false });
            }
        };

        const handleSubmit = () => {
            const selectedContacts = form.contacts.filter((c) => c.selected);
            console.log('Information Submitted:', { ...form, selectedContacts });
            emit('submit', { ...form, selectedContacts });
            close();
        };

        return { form, handleSubmit, close, addContact };
    }
});
</script>

<template>
    <Dialog :visible="visible" @update:visible="(val) => $emit('update:visible', val)" modal header="Create Information" :style="{ width: '70vw' }">
        <div class="space-y-4">
            <!-- Basic Info (3 columns) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label>Name *</label>
                    <input type="text" v-model="form.name" placeholder="Enter name (e.g., John Doe)" class="border p-2 w-full rounded" />
                </div>
                <div>
                    <label>Short Code</label>
                    <input type="text" v-model="form.shortCode" placeholder="Enter short code (e.g., JD123)" class="border p-2 w-full rounded" />
                </div>
                <div>
                    <label>Fax Number</label>
                    <input type="text" v-model="form.faxNumber" placeholder="Enter fax number (e.g., 123-456-7890)" class="border p-2 w-full rounded" />
                </div>

                <div>
                    <label>Reg No</label>
                    <input type="text" v-model="form.regNo" placeholder="Enter reg no (e.g., ABC1234)" class="border p-2 w-full rounded" />
                </div>
                <div>
                    <label>GST Id</label>
                    <input type="text" v-model="form.gstId" placeholder="Enter GST id (e.g., 123456789)" class="border p-2 w-full rounded" />
                </div>
                <div></div>
                <!-- 空占位 -->
            </div>

            <!-- Address (3 columns) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label>Address 1</label>
                    <input type="text" v-model="form.address1" placeholder="Enter address 1" class="border p-2 w-full rounded" />
                </div>
                <div>
                    <label>Address 2</label>
                    <input type="text" v-model="form.address2" placeholder="Enter address 2" class="border p-2 w-full rounded" />
                </div>
                <div>
                    <label>Address 3</label>
                    <input type="text" v-model="form.address3" placeholder="Enter address 3" class="border p-2 w-full rounded" />
                </div>

                <div>
                    <label>City</label>
                    <input type="text" v-model="form.city" placeholder="Enter city (e.g., Kuala Lumpur)" class="border p-2 w-full rounded" />
                </div>
                <div>
                    <label>State</label>
                    <input type="text" v-model="form.state" placeholder="Enter state (e.g., Selangor)" class="border p-2 w-full rounded" />
                </div>
                <div>
                    <label>Postcode</label>
                    <input type="text" v-model="form.postcode" placeholder="Enter postcode (e.g., 12345)" class="border p-2 w-full rounded" />
                </div>

                <div class="md:col-span-3">
                    <label>Country</label>
                    <input type="text" v-model="form.country" placeholder="Select country" class="border p-2 w-full rounded" />
                </div>
            </div>

            <div>
                <label>Contact Persons <button v-if="form.contacts.length < 3" @click="addContact" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Add Contact Person</button></label>
                <div v-for="(contact, idx) in form.contacts" :key="idx" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 items-end">
                    <div>
                        <label>Name</label>
                        <input type="text" v-model="contact.name" placeholder="Contact Name" class="border p-2 w-full rounded" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" v-model="contact.email" placeholder="Email" class="border p-2 w-full rounded" />
                    </div>
                    <div>
                        <label>Contact Number </label>
                        <input type="text" v-model="contact.contactNumber" placeholder="Phone" class="border p-2 w-full rounded" />
                    </div>
                </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end space-x-2 mt-4">
                <button @click="close" class="border px-3 py-1 rounded">Cancel</button>
                <button @click="handleSubmit" class="bg-blue-500 text-white px-3 py-1 rounded">Submit</button>
            </div>
        </div>
    </Dialog>
</template>
