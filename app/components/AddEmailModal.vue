<script setup>
import { ref, watch } from 'vue'
import { useEmails } from '@/composables/useEmails.js'

// Props & Emits
const props = defineProps({ show: Boolean, emailData: Object })
const emit = defineEmits(['close','save'])

// Composable for global email state
const { addOrUpdateEmail } = useEmails()

// Form state
const form = ref({
  id: null,
  name: '',
  email: '',
  pfNumber: '',
  dept: '',
  status: 'Active'
})

// Watch for edit mode
watch(
  () => props.emailData,
  val => {
    form.value = val
      ? { ...val } // edit existing
      : { id: Date.now(), name:'', email:'', pfNumber:'', dept:'', status:'Active' } // new
  },
  { immediate: true }
)

// Submit form
const submitForm = () => {
  if(!form.value.name || !form.value.email || !form.value.dept || !form.value.pfNumber){
    alert('Fill all fields including PF Number'); 
    return
  }

  // Save or update via composable (reactive, shared)
  addOrUpdateEmail({ ...form.value })

  emit('save', form.value)
  emit('close')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
    <div class="bg-gray-900 w-full max-w-md p-6 rounded-2xl shadow-xl">
      <h2 class="text-xl font-bold mb-4">{{ emailData ? 'Edit Client' : 'Add New Client' }}</h2>

      <div class="space-y-4">
        <!-- Full Name -->
        <input v-model="form.name" placeholder="Full Name" class="w-full px-4 py-2 border rounded-xl bg-gray-800 text-white"/>

        <!-- Email -->
        <input v-model="form.email" type="email" placeholder="Email Address" class="w-full px-4 py-2 border rounded-xl bg-gray-800 text-white"/>

        <!-- PF Number -->
        <input v-model="form.pfNumber" type="text" placeholder="PF Number" class="w-full px-4 py-2 border rounded-xl bg-gray-800 text-white"/>

        <!-- Department -->
        <select v-model="form.dept" class="w-full px-4 py-2 border rounded-xl bg-gray-800 text-white">
          <option disabled value="">Select Department</option>
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Marketing</option>
          <option>Operations</option>
        </select>

        <!-- Status -->
        <select v-model="form.status" class="w-full px-4 py-2 border rounded-xl bg-gray-800 text-white">
          <option>Active</option>
          <option>Inactive</option>
          <option>Exited</option>
          <option>Retired</option>
        </select>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition">Cancel</button>
        <button @click="submitForm" class="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl text-white transition">Save</button>
      </div>
    </div>
  </div>
</template>