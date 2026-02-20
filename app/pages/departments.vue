<script setup>
import { computed } from 'vue'
import { useEmails } from '@/composables/useEmails.js'

const { emails } = useEmails()

/* Build Departments from Emails (Reactive & Safe) */
const departments = computed(() => {
  if (!emails.value) return []

  const map = {}

  emails.value.forEach(email => {
    const deptName = email.dept || "Unassigned"

    if (!map[deptName]) {
      map[deptName] = {
        id: deptName,
        name: deptName,
        total: 0,
        active: 0,
        inactive: 0,
        exited: 0,
        retired: 0
      }
    }

    map[deptName].total++

    if (email.status === "Active") map[deptName].active++
    if (email.status === "Inactive") map[deptName].inactive++
    if (email.status === "Exited") map[deptName].exited++
    if (email.status === "Retired") map[deptName].retired++
  })

  return Object.values(map)
})

/* Toggle Retirement Status (Affects All Emails in Department) */
const toggleRetired = (deptName) => {
  if (!window.confirm(`Toggle retirement status for "${deptName}" department?`)) return

  emails.value.forEach(email => {
    if (email.dept === deptName) {
      email.status = email.status === "Retired" ? "Active" : "Retired"
    }
  })
}

/* Delete Department (Removes All Emails in That Department) */
const deleteDepartment = (deptName) => {
  if (!window.confirm(`Delete "${deptName}" department and all its emails?`)) return

  const filtered = emails.value.filter(email => email.dept !== deptName)
  emails.value.splice(0, emails.value.length, ...filtered)
}
</script>

<template>
  <div class="bg-[#0f172a] min-h-screen text-gray-200 p-6">

    <!-- Page Title -->
    <h1 class="text-3xl font-bold mb-4 text-orange-400">
      Departments Management
    </h1>

    <!-- Total Departments -->
    <p class="mb-6 text-gray-400">
      Total Departments: <span class="font-semibold text-white">{{ departments.length }}</span>
    </p>

    <!-- Table -->
    <div class="bg-[#1e293b] rounded-2xl shadow-lg p-6 overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-[#111827] text-orange-400">
          <tr>
            <th class="p-3">Department</th>
            <th class="p-3">Total</th>
            <th class="p-3">Active</th>
            <th class="p-3">Inactive</th>
            <th class="p-3">Exited</th>
            <th class="p-3">Retired</th>
            <th class="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="dep in departments"
            :key="dep.id"
            class="border-b border-gray-700 hover:bg-[#1a2536] transition-all duration-200"
          >
            <td class="p-3 font-medium">{{ dep.name }}</td>
            <td class="p-3 text-white">{{ dep.total }}</td>
            <td class="p-3 text-green-400 font-semibold">{{ dep.active }}</td>
            <td class="p-3 text-red-400 font-semibold">{{ dep.inactive }}</td>
            <td class="p-3 text-gray-400 font-semibold">{{ dep.exited }}</td>
            <td class="p-3 text-yellow-400 font-semibold">{{ dep.retired }}</td>
            <td class="p-3 text-right space-x-2">
              <button
                @click="toggleRetired(dep.name)"
                title="Toggle all members in this department between Active/Retired"
                class="bg-yellow-500 px-4 py-1 rounded-xl hover:bg-yellow-600 shadow-md text-black font-semibold transition duration-200"
              >
                Toggle Retire
              </button>

              <button
                @click="deleteDepartment(dep.name)"
                title="Delete this department and all its members"
                class="bg-red-600 px-4 py-1 rounded-xl hover:bg-red-700 shadow-md text-white font-semibold transition duration-200"
              >
                Delete
              </button>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="departments.length === 0">
            <td colspan="7" class="text-center p-6 text-gray-400">
              No departments available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>