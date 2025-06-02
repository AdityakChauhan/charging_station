<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              ChargingStation
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="logout" class="btn btn-secondary">
              <span class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8 space-y-8">
      <!-- Stats Overview -->
      <div class="relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>
        <!-- Decorative pattern -->
        <div class="absolute inset-0 bg-grid-gray-900/[0.02]"></div>
        <div class="relative grid grid-cols-4 divide-x divide-gray-200">
          <div class="p-6 flex items-center space-x-4 hover:bg-white/50 transition-colors">
            <div class="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Stations</p>
              <p class="text-2xl font-bold text-gray-900 tracking-tight">{{ chargers.length }}</p>
            </div>
          </div>
          <div class="p-6 flex items-center space-x-4 hover:bg-white/50 transition-colors">
            <div class="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">Active</p>
              <p class="text-2xl font-bold text-gray-900 tracking-tight">{{ chargers.filter(c => c.status === 'Active').length }}</p>
            </div>
          </div>
          <div class="p-6 flex items-center space-x-4 hover:bg-white/50 transition-colors">
            <div class="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">Inactive</p>
              <p class="text-2xl font-bold text-gray-900 tracking-tight">{{ chargers.filter(c => c.status === 'Inactive').length }}</p>
            </div>
          </div>
          <div class="p-6 flex items-center space-x-4 hover:bg-white/50 transition-colors">
            <div class="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Power</p>
              <div class="flex items-baseline space-x-1">
                <p class="text-2xl font-bold text-gray-900 tracking-tight">
                  {{ Math.round(chargers.reduce((acc, curr) => acc + curr.powerOutput, 0) / chargers.length) }}
                </p>
                <span class="text-sm font-medium text-gray-500">kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-bold text-gray-900 tracking-tight">Filters</h2>
              <p class="mt-1 text-sm text-gray-500">Filter charging stations by status, type, and power output</p>
            </div>
            <button class="btn btn-secondary text-sm group" @click="resetFilters">
              <span class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                </svg>
                <span>Reset Filters</span>
              </span>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select v-model="filters.status" class="input">
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Connector Type</label>
              <select v-model="filters.connectorType" class="input">
                <option value="">All Types</option>
                <option value="Type2">Type2</option>
                <option value="CCS">CCS</option>
                <option value="CHAdeMO">CHAdeMO</option>
                <option value="Tesla">Tesla</option>
                <option value="GB/T">GB/T</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Min Power</label>
              <input 
                v-model.number="filters.minPower" 
                type="number" 
                placeholder="Min Power (kW)" 
                class="input"
              >
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Max Power</label>
              <input 
                v-model.number="filters.maxPower" 
                type="number" 
                placeholder="Max Power (kW)" 
                class="input"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div class="space-y-8">
          <ChargerForm 
            :charger="selectedCharger" 
            @save="saveCharger"
            @cancel="selectedCharger = null"
          />
          <ChargerTable 
            :chargers="filteredChargers" 
            @edit="editCharger"
            @delete="deleteCharger"
          />
        </div>
        
        <!-- Right Column (Map) -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[calc(100vh-2rem)]">
          <MapView 
            :chargers="filteredChargers"
            @select="selectCharger"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import axios from '../utils/axios';
import ChargerForm from '../components/ChargerForm.vue';
import ChargerTable from '../components/ChargerTable.vue';
import MapView from '../components/MapView.vue';

const router = useRouter();
const auth = useAuthStore();
const chargers = ref([]);
const selectedCharger = ref(null);
const filters = ref({
  status: '',
  connectorType: '',
  minPower: '',
  maxPower: ''
});

// Computed filtered chargers
const filteredChargers = computed(() => {
  return chargers.value.filter(c => {
    if (filters.value.status && c.status !== filters.value.status) return false;
    if (filters.value.connectorType && c.connectorType !== filters.value.connectorType) return false;
    if (filters.value.minPower && c.powerOutput < filters.value.minPower) return false;
    if (filters.value.maxPower && c.powerOutput > filters.value.maxPower) return false;
    return true;
  });
});

// CRUD Operations
async function fetchChargers() {
  try {
    const response = await axios.get('/stations');
    chargers.value = response.data.data;
  } catch (error) {
    console.error('Error fetching chargers:', error);
  }
}

async function saveCharger(data) {
  try {
    if (data.id) {
      await axios.put(`/stations/${data.id}`, data);
    } else {
      await axios.post('/stations', data);
    }
    await fetchChargers();
    selectedCharger.value = null;
  } catch (error) {
    console.error('Error saving charger:', error);
  }
}

async function deleteCharger(id) {
  try {
    await axios.delete(`/stations/${id}`);
    await fetchChargers();
  } catch (error) {
    console.error('Error deleting charger:', error);
  }
}

function editCharger(charger) {
  selectedCharger.value = { ...charger };
}

function selectCharger(charger) {
  selectedCharger.value = { ...charger };
}

function resetFilters() {
  filters.value = {
    status: '',
    connectorType: '',
    minPower: '',
    maxPower: ''
  };
}

async function logout() {
  await auth.logout();
  router.push('/login');
}

onMounted(fetchChargers);
</script>

<style scoped>
.bg-grid-gray-900 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}

.input {
  @apply w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 
         placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
         shadow-sm transition duration-150;
}

.btn {
  @apply inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-150
         focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm;
}

.btn-primary {
  @apply bg-blue-600 text-white border border-transparent
         hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500;
}

.btn-secondary {
  @apply bg-white text-gray-700 border border-gray-300
         hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 
         active:bg-blue-100 focus:ring-blue-500;
}

/* Add new button variations */
.btn-danger {
  @apply bg-white text-red-600 border border-red-200
         hover:bg-red-50 hover:border-red-600 active:bg-red-100 
         focus:ring-red-500;
}

.btn-success {
  @apply bg-white text-green-600 border border-green-200
         hover:bg-green-50 hover:border-green-600 active:bg-green-100 
         focus:ring-green-500;
}

/* Add icon button style */
.btn-icon {
  @apply p-2 rounded-lg border border-gray-200 bg-white text-gray-500
         hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 
         active:bg-blue-100 transition-all shadow-sm;
}
</style>