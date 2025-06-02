<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ isEdit ? 'Edit Charger' : 'Add New Charger' }}</h3>
        <button v-if="isEdit" @click="$emit('cancel')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Station Name</label>
        <input 
          v-model="form.name" 
          placeholder="Enter station name" 
          class="input" 
          required 
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Latitude</label>
          <input 
            v-model.number="form.latitude" 
            type="number" 
            step="0.000001"
            placeholder="Enter latitude" 
            class="input" 
            required 
          />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Longitude</label>
          <input 
            v-model.number="form.longitude" 
            type="number" 
            step="0.000001"
            placeholder="Enter longitude" 
            class="input" 
            required 
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select v-model="form.status" class="input" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Power Output (kW)</label>
          <input 
            v-model.number="form.powerOutput" 
            type="number" 
            min="0"
            step="0.1"
            placeholder="Enter power output" 
            class="input" 
            required 
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Connector Type</label>
        <select v-model="form.connectorType" class="input" required>
          <option value="Type2">Type2</option>
          <option value="CCS">CCS</option>
          <option value="CHAdeMO">CHAdeMO</option>
          <option value="Tesla">Tesla</option>
          <option value="GB/T">GB/T</option>
        </select>
      </div>

      <div class="flex items-center justify-end space-x-3 pt-4">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="btn btn-secondary"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          class="btn btn-primary"
        >
          {{ isEdit ? 'Update Charger' : 'Add Charger' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  charger: {
    type: Object,
    default: () => ({
      name: '',
      latitude: '',
      longitude: '',
      status: 'Active',
      powerOutput: '',
      connectorType: 'Type2'
    })
  }
});

const emit = defineEmits(['save', 'cancel']);

const form = ref({ ...props.charger });
const isEdit = ref(!!form.value.id);

watch(() => props.charger, (newVal) => {
  form.value = { ...newVal };
  isEdit.value = !!newVal?.id;
}, { deep: true });

function handleSubmit() {
  emit('save', form.value);
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 
         placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
         shadow-sm transition duration-150;
}

.btn {
  @apply px-4 py-2 rounded-lg font-medium transition duration-150
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-blue-600 text-white shadow-sm
         hover:bg-blue-700 focus:ring-blue-500;
}

.btn-secondary {
  @apply bg-white text-gray-700 border border-gray-300 shadow-sm
         hover:bg-gray-50 focus:ring-gray-500;
}
</style>
