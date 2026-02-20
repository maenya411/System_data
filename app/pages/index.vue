<script setup>
import { ref, computed } from 'vue'
import AddEmailModal from '@/components/AddEmailModal.vue'
import EmailAnalytics from '@/components/EmailAnalytics.vue'
import EmailTable from '@/components/EmailTable.vue'
import { useEmails } from '@/composables/useEmails.js'

const { emails, addOrUpdateEmail, deleteEmail } = useEmails()

const showModal = ref(false)
const editEmailData = ref(null)
const search = ref('')

// Safe filter
const filteredEmails = computed(() =>
  emails.value.filter(e =>
    (e.name || '').toLowerCase().includes(search.value.toLowerCase())
  )
)

// Stats
const totalEmails = computed(() => emails.value.length)
const activeEmails = computed(() =>
  emails.value.filter(e => e.status === 'Active').length
)
const inactiveEmails = computed(() =>
  emails.value.filter(e => e.status === 'Inactive').length
)
const exitedEmails = computed(() =>
  emails.value.filter(e => e.status === 'Exited').length
)
const retiredEmails = computed(() =>
  emails.value.filter(e => e.status === 'Retired').length
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
  <!-- Layout already contains Navbar + Sidebar + Footer -->
<Navbar/>
  <Sidebar/>
  <div class="min-h-screen bg-black text-gray-100 animate-fadeIn">
    <div class="p-6 space-y-8">

      <!-- TOP BAR -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">

        <!-- Add Button -->
        <button
          @click="openAddModal"
          class="bg-linear-to-r from-orange-600 to-orange-500
                 hover:from-orange-500 hover:to-orange-400
                 text-white px-6 py-2.5 rounded-xl
                 shadow-lg hover:shadow-orange-500/30
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:scale-[1.02]
                 active:scale-95">
          + Add Email
        </button>

        <!-- Search -->
        <input
          v-model="search"
          type="text"
          placeholder="Search by name..."
          class="bg-gray-900 border border-gray-700 px-4 py-2 rounded-xl
                 text-white placeholder-gray-500
                 transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-orange-500
                 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20
                 hover:border-gray-500
                 w-full md:w-1/3"
        />
      </div>

      <!-- ANALYTICS + STATS -->
      <div class="flex flex-col md:flex-row gap-6">

        <!-- ANALYTICS -->
        <div class="bg-gray-900 border border-gray-800 p-5 rounded-2xl
                    shadow-xl transition-all duration-300
                    hover:shadow-2xl hover:shadow-purple-500/20
                    hover:-translate-y-1">
          <EmailAnalytics :emails="emails" />
        </div>

        <!-- STATS -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">

          <!-- TOTAL -->
          <div class="bg-gray-900 p-6 rounded-2xl
                      border border-gray-800 border-l-4 border-l-blue-500
                      shadow-xl hover:shadow-blue-500/20
                      transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-sm text-gray-400">Total Emails</h3>
            <p class="text-3xl font-bold text-white mt-2">
              {{ totalEmails }}
            </p>
          </div>

          <!-- ACTIVE -->
          <div class="bg-gray-900 p-6 rounded-2xl
                      border border-gray-800 border-l-4 border-l-green-500
                      shadow-xl hover:shadow-green-500/20
                      transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-sm text-gray-400">Active Emails</h3>
            <p class="text-3xl font-bold text-green-400 mt-2">
              {{ activeEmails }}
            </p>
          </div>

          <!-- INACTIVE -->
          <div class="bg-gray-900 p-6 rounded-2xl
                      border border-gray-800 border-l-4 border-l-yellow-500
                      shadow-xl hover:shadow-yellow-500/20
                      transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-sm text-gray-400">Inactive Emails</h3>
            <p class="text-3xl font-bold text-yellow-400 mt-2">
              {{ inactiveEmails }}
            </p>
          </div>

          <!-- EXITED -->
          <div class="bg-gray-900 p-6 rounded-2xl
                      border border-gray-800 border-l-4 border-l-red-600
                      shadow-xl hover:shadow-red-500/20
                      transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-sm text-gray-400">Exited Emails</h3>
            <p class="text-3xl font-bold text-red-400 mt-2">
              {{ exitedEmails }}
            </p>
          </div>

          <!-- RETIRED -->
          <div class="bg-gray-900 p-6 rounded-2xl
                      border border-gray-800 border-l-4 border-l-orange-500
                      shadow-xl hover:shadow-orange-500/20
                      transition-all duration-300 hover:-translate-y-1">
            <h3 class="text-sm text-gray-400">Retired Emails</h3>
            <p class="text-3xl font-bold text-orange-400 mt-2">
              {{ retiredEmails }}
            </p>
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