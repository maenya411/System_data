<script setup>
import { ref, computed } from 'vue'
import Sidebar from '@/components/sidebar.vue'

import AddEmailModal from '@/components/AddEmailModal.vue'
import EmailAnalytics from '@/components/EmailAnalytics.vue'
import EmailTable from '@/components/EmailTable.vue'
import { useEmails } from '@/composables/useEmails.js'

const { emails, addOrUpdateEmail, deleteEmail } = useEmails()

const showModal = ref(false)
const editEmailData = ref(null)
const search = ref('')

const filteredEmails = computed(() =>
  emails.value.filter(e =>
    e.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const openAddModal = () => {
  editEmailData.value = null
  showModal.value = true
}

const openEditModal = (email) => {
  editEmailData.value = email
  showModal.value = true
}

const saveEmail = (email) => {
  addOrUpdateEmail(email)
}
</script>

<template>
  <div class="flex min-h-screen bg-black text-gray-100">

    <!-- SIDEBAR -->
    <Sidebar />

    <!-- MAIN CONTENT -->
    <div class="flex-1 flex flex-col">

      <!-- NAVBAR -->
      <Navbar />

      <!-- PAGE CONTENT -->
      <main class="flex-1 p-6 flex flex-col gap-6">

        <!-- TOP BAR -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Add Email Button -->
          <button
            @click="openAddModal"
            class="bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-6 py-2.5 rounded-xl shadow-lg transition-all duration-300"
          >
            + Add Email
          </button>

          <!-- Search -->
          <input
            v-model="search"
            type="text"
            placeholder="Search by name..."
            class="bg-gray-900 border border-gray-700 px-4 py-2 rounded-xl text-white placeholder-gray-500 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <!-- Analytics & Stats -->
        <div class="flex flex-col md:flex-row gap-6">

          <!-- EMAIL ANALYTICS -->
          <div class="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex-1">
            <EmailAnalytics :emails="emails" />
          </div>

          <!-- STATS -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">

            <!-- Total -->
            <div class="bg-gray-900 p-6 rounded-2xl border-l-4 border-blue-500 shadow-xl">
              <h3 class="text-sm text-gray-400">Total Emails</h3>
              <p class="text-3xl font-bold text-white mt-2">{{ emails.length }}</p>
            </div>

            <!-- Active -->
            <div class="bg-gray-900 p-6 rounded-2xl border-l-4 border-green-500 shadow-xl">
              <h3 class="text-sm text-gray-400">Active Emails</h3>
              <p class="text-3xl font-bold text-green-400 mt-2">{{ emails.filter(e=>e.status==='Active').length }}</p>
            </div>

            <!-- Inactive -->
            <div class="bg-gray-900 p-6 rounded-2xl border-l-4 border-yellow-500 shadow-xl">
              <h3 class="text-sm text-gray-400">Inactive Emails</h3>
              <p class="text-3xl font-bold text-yellow-400 mt-2">{{ emails.filter(e=>e.status==='Inactive').length }}</p>
            </div>

            <!-- Exited -->
            <div class="bg-gray-900 p-6 rounded-2xl border-l-4 border-red-500 shadow-xl">
              <h3 class="text-sm text-gray-400">Exited Emails</h3>
              <p class="text-3xl font-bold text-red-400 mt-2">{{ emails.filter(e=>e.status==='Exited').length }}</p>
            </div>

            <!-- Retired -->
            <div class="bg-gray-900 p-6 rounded-2xl border-l-4 border-orange-500 shadow-xl">
              <h3 class="text-sm text-gray-400">Retired Emails</h3>
              <p class="text-3xl font-bold text-orange-400 mt-2">{{ emails.filter(e=>e.status==='Retired').length }}</p>
            </div>

          </div>
        </div>

        <!-- EMAIL TABLE -->
        <div class="bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-5">
          <EmailTable
            :emails="filteredEmails"
            @edit="openEditModal"
            @delete="deleteEmail"
          />
        </div>

        <!-- MODAL -->
        <AddEmailModal
          :show="showModal"
          :emailData="editEmailData"
          @close="showModal = false"
          @save="saveEmail"
        />

      </main>

      <!-- FOOTER -->
      <footer class="bg-gray-950 text-gray-400 text-center py-4 border-t border-gray-800">
        @maenyaclinton2026. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
</style>