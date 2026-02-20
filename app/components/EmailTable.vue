<script setup>
const props = defineProps({ emails:Array })
const emit = defineEmits(['edit','delete'])
</script>

<template>
  <div class="overflow-x-auto bg-graylight rounded-xl shadow">
    <table class="min-w-full text-white">
      <thead class="bg-darkbrown text-white">
        <tr>
          <th class="px-4 py-2 text-left">Name</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Dept</th>
          <th class="px-4 py-2 text-left">PF Number</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-left">Retired</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="email in emails" :key="email.id" class="hover:bg-gray-700 transition-colors cursor-pointer">
          <td class="px-4 py-2">{{ email.name }}</td>
          <td class="px-4 py-2">{{ email.email }}</td>
          <td class="px-4 py-2">{{ email.dept }}</td>
          <td class="px-4 py-2 text-blue-400 font-semibold">{{ email.pfNumber || '-' }}</td>
          <td class="px-4 py-2">{{ email.status }}</td>
          <td class="px-4 py-2 text-yellow-400 font-semibold">{{ email.retired ? 'Yes' : 'No' }}</td>
          <td class="px-4 py-2">
            <button @click="$emit('edit', email)" class="text-blue-400 hover:text-blue-500 mr-2">Edit</button>
            <button @click="$emit('delete', email.id)" class="text-red-500 hover:text-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
