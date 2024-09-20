<template>
    <div class="result-item">
      <img :src="item.primaryImageSmall || '/images/default.png'" alt="Item Image" @click="openLightbox(item.primaryImage)" />
  
      <div class="content" @click="openObject(item.objectURL)">
        <h3>{{ item.title || 'Not Available' }}</h3>
        <p>Date: {{ item.objectDate || 'Not Available' }}</p>
        <p>Department: {{ item.department || 'Not Available' }}</p>
        <p>Artist: {{ item.artistDisplayName || 'Not Available' }} ({{ item.artistNationality || 'Not Available' }})</p>
        <div v-if="item.tags && item.tags.length" class="tags">
  <span v-for="(tag, index) in item.tags.slice(0, 3)" :key="index">
    {{ tag.term }}
  </span>
</div>

      </div>
  
      <!-- Lightbox Modal -->
      <div v-if="isLightboxOpen" class="lightbox" @click="closeLightbox">
        <img :src="lightboxImage" alt="Full Image" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isLightboxOpen = ref(false);
  const lightboxImage = ref('');
  
  const openLightbox = (image) => {
    lightboxImage.value = image;
    isLightboxOpen.value = true;
  };
  
  const closeLightbox = () => {
    isLightboxOpen.value = false;
  };
  
  const openObject = (url) => {
    window.open(url, '_blank');
  };
  
  defineProps({
    item: {
      type: Object,
      default: () => ({})
    }
  });
  </script>
  
  <style scoped>
  .result-item {
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    transition: transform 0.2s;
  }
  
  .result-item:hover {
    transform: translateY(-5px);
  }
  
  .result-item img {
    max-width: 80px;
    cursor: pointer;
  }
  
  .result-item .content {
    flex: 1;
  }
  
  .result-item .tags {
    margin-top: 10px;
  }
  
  .tags span {
    background: #e0e0e0;
    padding: 5px;
    margin-right: 5px;
    border-radius: 4px;
  }
  
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  