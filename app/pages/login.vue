<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const loginAsAdmin = () => {
  localStorage.setItem('isAdminLoggedIn', 'true')
  router.push('/') // redirect to dashboard
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-black text-gray-100">
    <div class="bg-gray-900 p-10 sm:p-8 px-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">

      <h1 class="text-3xl font-bold mb-8 text-center text-white">
        Admin Login
      </h1>

      <button 
        type="button"
        @click="loginAsAdmin"
        aria-label="Login as admin"
        class="w-full bg-orange-600 hover:bg-orange-700 
               text-white px-4 py-3 rounded-xl 
               transition duration-300 font-semibold shadow-lg
               focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1">
        Login as Admin
      </button>

    </div>
  </div>
</template>