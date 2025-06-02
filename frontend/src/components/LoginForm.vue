<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900">Sign in</h2>
        <p class="mt-2 text-sm text-gray-600">Enter your credentials to continue</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="login" class="space-y-5">
        <!-- Email field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input 
            v-model="email" 
            type="email" 
            class="input"
            placeholder="you@example.com" 
            required
          />
        </div>

        <!-- Password field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input 
            v-model="password" 
            type="password" 
            class="input"
            placeholder="Enter your password" 
            required
          />
        </div>

        <!-- Error message -->
        <div 
          v-if="error" 
          class="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Submit button -->
        <button 
          type="submit" 
          class="btn btn-primary w-full flex items-center justify-center gap-2"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const auth = useAuthStore();
const router = useRouter();

async function login() {
  try {
    loading.value = true;
    error.value = '';
    const success = await auth.login(email.value, password.value);
    if (success) {
      router.push('/dashboard');
    } else {
      error.value = 'Invalid email or password';
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out forwards;
}
</style>