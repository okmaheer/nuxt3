<template>
  <div class="search-results">
    <div class="header">
      <h2>Total Items: {{ filteredResults.length }}</h2>

      <div v-if="topDepartments.length" class="departments">
        <!-- Dropdown for the top 3 departments -->
        <select v-model="selectedDepartment" @change="filterByDepartment">
          <option value="">All Departments</option> <!-- Selecting this clears the filter -->
          <option v-for="department in topDepartments" :key="department" :value="department">
            {{ department }}
          </option>
        </select>
      </div>
    </div>

    <div class="cards">
      <div v-for="item in filteredResults" :key="item.objectID" class="card">
        <SearchResultItem :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import SearchResultItem from './SearchResultItem.vue';

const props = defineProps({
  results: {
    type: Array,
    required: true,
    default: () => []
  }
});

const filteredResults = ref([]);
const selectedDepartment = ref('');

watchEffect(() => {
  filteredResults.value = props.results;
});

const topDepartments = computed(() => {
  const departments = props.results.map(item => item.department).filter(Boolean);
  return [...new Set(departments)].slice(0, 3);  // Only the top 3 departments
});

const filterByDepartment = () => {
  if (selectedDepartment.value) {
    filteredResults.value = props.results.filter(item => item.department === selectedDepartment.value);
  } else {
    filteredResults.value = props.results; // Show all results when "All Departments" is selected
  }
};
</script>

<style scoped>
.search-results {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.departments {
  display: flex;
  gap: 15px;
}

select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 cards per row */
  gap: 20px;
}

.card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr; /* 1 card per row on smaller screens */
  }
}
</style>
