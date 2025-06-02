<template>
  <div class="relative h-full">
    <div ref="mapContainer" class="h-full w-full rounded-lg overflow-hidden"></div>
    <div class="absolute bottom-4 right-4 z-[1000] space-y-2">
      <button 
        @click="centerMap"
        class="p-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors shadow-lg"
        title="Center map"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({ 
  chargers: Array 
});

const emit = defineEmits(['select']);
const mapContainer = ref(null);
let map = null;
let markers = [];

// Custom marker icon
const createCustomIcon = (status) => {
  const color = status === 'Active' ? '#10b981' : '#ef4444';
  return L.divIcon({
    html: `
      <div class="marker-container">
        <div class="marker-dot" style="--marker-color: ${color}"></div>
        <div class="marker-pulse" style="--marker-color: ${color}"></div>
      </div>
    `,
    className: 'custom-marker'
  });
};

function initMap() {
  if (mapContainer.value && !map) {
    map = L.map(mapContainer.value, {
      zoomControl: false,
      attributionControl: false
    }).setView([20.5937, 78.9629], 5);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    // Add zoom control to the top-right
    L.control.zoom({
      position: 'topright'
    }).addTo(map);
    
    updateMarkers();
  }
}

function updateMarkers() {
  // Remove existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];
  
  // Add new markers
  if (props.chargers) {
    props.chargers.forEach(station => {
      if (station.latitude && station.longitude) {
        const marker = L.marker(
          [station.latitude, station.longitude],
          { icon: createCustomIcon(station.status) }
        )
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${station.name}</h3>
            <p class="text-sm text-slate-400">${station.connectorType} · ${station.powerOutput}kW</p>
          </div>
        `, {
          className: 'custom-popup'
        })
        .on('click', () => emit('select', station));
        
        markers.push(marker);
      }
    });
  }
}

function centerMap() {
  if (map && markers.length > 0) {
    const bounds = L.featureGroup(markers).getBounds();
    map.fitBounds(bounds, { padding: [50, 50] });
  }
}

watch(() => props.chargers, updateMarkers, { deep: true });

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style>
.custom-marker {
  width: 24px !important;
  height: 24px !important;
  margin-left: -12px !important;
  margin-top: -12px !important;
  background: transparent !important;
  border: none !important;
}

.marker-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.marker-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: var(--marker-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--marker-color);
}

.marker-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: var(--marker-color);
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

/* Custom popup styling */
.custom-popup .leaflet-popup-content-wrapper {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #f8fafc;
}

.custom-popup .leaflet-popup-tip {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(8px);
}

.custom-popup .leaflet-popup-content {
  margin: 8px 12px;
  line-height: 1.4;
}

/* Zoom control styling */
.leaflet-control-zoom {
  border: none !important;
  margin: 15px !important;
}

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  background: rgba(30, 41, 59, 0.95) !important;
  backdrop-filter: blur(8px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #f8fafc !important;
  width: 32px !important;
  height: 32px !important;
  line-height: 30px !important;
  font-size: 16px !important;
  transition: all 0.2s ease !important;
}

.leaflet-control-zoom-in:hover,
.leaflet-control-zoom-out:hover {
  background: rgba(51, 65, 85, 0.95) !important;
  color: white !important;
}

.leaflet-control-zoom-in {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
}

.leaflet-control-zoom-out {
  border-bottom-left-radius: 8px !important;
  border-bottom-right-radius: 8px !important;
}
</style>