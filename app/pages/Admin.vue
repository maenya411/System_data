<script setup>
definePageMeta({ layout: 'blank' })

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmails } from '@/composables/useEmails.js'

const router = useRouter()

// --- Form fields ---
const email = ref('')
const password = ref('')
const pfNumber = ref('')
const department = ref('IT')
const status = ref('Active')
const rememberMe = ref(false)
const error = ref('')
const isSignUp = ref(false)

// --- Use composable ---
const { emails, addOrUpdateEmail } = useEmails()

// --- Departments and Status options ---
const departments = ['IT', 'Finance', 'HR', 'Operations', 'Marketing']
const statuses = ['Active', 'Inactive', 'Exited', 'Retired']

// --- Sign in ---
const loginAsUser = () => {
  const account = emails.value.find(a => a.email === email.value)
  if (!account) { error.value = 'No account found'; return }
  if (account.password !== password.value) { error.value = 'Incorrect password'; return }

  if (rememberMe.value) {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', email.value)
  } else {
    sessionStorage.setItem('isLoggedIn', 'true')
    sessionStorage.setItem('userEmail', email.value)
  }

  router.push('/') // dashboard
}

// --- Sign up ---
const createAccount = () => {
  if (!email.value || !password.value || !pfNumber.value) {
    error.value = 'Email, password, and PF Number are required'
    return
  }

  if (emails.value.find(a => a.email === email.value)) {
    error.value = 'Account exists. Please sign in.'
    return
  }

  addOrUpdateEmail({
    email: email.value,
    password: password.value,
    pfNumber: pfNumber.value,
    dept: department.value,
    status: status.value,
    name: email.value.split('@')[0]
  })

  // Reset form
  email.value = ''
  password.value = ''
  pfNumber.value = ''
  department.value = 'IT'
  status.value = 'Active'
  error.value = ''
  isSignUp.value = false
  alert('Account created! Please sign in.')
}

// --- Google login placeholder ---
const loginWithGoogle = () => {
  alert('Google login clicked! Implement OAuth backend to proceed.')
}
</script>

<template>
  <Navbar/>
  <Sidebar/>
  <div class="flex justify-center items-center min-h-screen bg-black text-gray-100 px-4">
    <div class="bg-gray-900 p-10 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">

      <h1 class="text-3xl font-bold mb-6 text-center text-white">
        {{ isSignUp ? 'Create Account' : 'Sign In' }}
      </h1>

      <!-- SIGNUP FORM -->
      <div v-if="isSignUp" class="space-y-4">
        <input type="email" v-model="email" placeholder="Email"
               class="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition hover:ring-orange-400"/>
        <input type="password" v-model="password" placeholder="Password"
               class="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition hover:ring-orange-400"/>
        <input type="text" v-model="pfNumber" placeholder="PF Number"
               class="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition hover:ring-orange-400"/>
        <select v-model="department"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition hover:ring-orange-400">
          <option v-for="dep in departments" :key="dep" :value="dep">{{ dep }}</option>
        </select>
        <select v-model="status"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition hover:ring-orange-400">
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>

        <div class="flex justify-between items-center">
          <label class="flex items-center gap-2 text-gray-300">
            <input type="checkbox" v-model="rememberMe" class="w-4 h-4 rounded focus:ring-orange-500"/> Remember Me
          </label>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        </div>

        <button @click="createAccount"
                class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1">
          Create Account
        </button>
      </div>

      <!-- SIGNIN FORM -->
      <div v-else class="space-y-4">
        <input type="email" v-model="email" placeholder="Email"
               class="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition hover:ring-orange-400"/>
        <input type="password" v-model="password" placeholder="Password"
               class="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition hover:ring-orange-400"/>

        <div class="flex justify-between items-center">
          <label class="flex items-center gap-2 text-gray-300">
            <input type="checkbox" v-model="rememberMe" class="w-4 h-4 rounded focus:ring-orange-500"/> Remember Me
          </label>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        </div>

        <button @click="loginAsUser"
                class="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-xl transition font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1">
          Sign In
        </button>
      </div>

      <!-- TOGGLE SIGNUP / LOGIN -->
      <p class="text-center text-gray-400 mt-4 text-sm">
        <span v-if="!isSignUp">Don't have an account?
          <button @click="isSignUp = true" class="text-green-400 hover:text-green-500 font-semibold transition">Create one</button>
        </span>
        <span v-else>Already have an account?
          <button @click="isSignUp = false" class="text-orange-400 hover:text-orange-500 font-semibold transition">Sign In</button>
        </span>
      </p>

    </div>
  </div>
</template>