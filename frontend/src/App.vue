<template>
  <div class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

:root {
  --background: #F9FAFB;
  --surface: #FFFFFF;
  --surface-hover: #F3F4F6;
  --border: #E5E7EB;
  --text: #111827;
  --text-secondary: #6B7280;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --success: #059669;
  --danger: #dc2626;
}

body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--background);
  color: var(--text);
  line-height: 1.5;
}

/* Global button styles */
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-blue-500/50;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 active:bg-blue-800
         text-white shadow-sm;
}

.btn-secondary {
  @apply bg-white hover:bg-gray-50 active:bg-gray-100
         text-gray-700 border border-gray-300 shadow-sm;
}

/* Global input styles */
.input {
  @apply w-full px-4 py-2 bg-white border border-gray-300 rounded-lg
         text-gray-900 placeholder-gray-500
         focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
         transition-all duration-200 shadow-sm;
}

/* Card styles */
.card {
  @apply bg-white border border-gray-200 rounded-lg shadow-sm;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  @apply font-medium text-gray-900;
}

/* Table styles */
.table-container {
  @apply relative overflow-x-auto;
}

.table {
  @apply min-w-full divide-y divide-gray-200;
}

.table th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50;
}

.table td {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-700;
}

/* Badge styles */
.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.badge-success {
  @apply bg-green-100 text-green-800;
}

.badge-danger {
  @apply bg-red-100 text-red-800;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--surface);
}

::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}
</style>