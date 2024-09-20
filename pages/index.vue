<template>
    <div class="container">
      <h1>Met Museum Search Results</h1>
  
      <!-- Date range input for Start Date and End Date -->
      <div class="date-range">
        <div class="date-input">
          <label for="start-date">Start Date</label>
          <input id="start-date" v-model="startDate" type="date" />
        </div>
  
        <div class="date-input">
          <label for="end-date">End Date</label>
          <input id="end-date" v-model="endDate" type="date" />
        </div>
  
        <button @click="fetchResults" class="btn-search">Search</button>
      </div>
  
      <SearchResult :results="searchResults" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getModifiedObjects, getObjectDetails } from '~/services/metApi';
  import SearchResult from '~/components/SearchResult.vue';
  
  const searchResults = ref([]);
  const startDate = ref('');
  const endDate = ref('');
  const selectedDepartment = ref('');
  
  const fetchResults = async () => {
    if (!startDate.value || !endDate.value) return;
  
    const formattedStartDate = new Date(startDate.value).toISOString().split('T')[0];
    const formattedEndDate = new Date(endDate.value).toISOString().split('T')[0];
  
    try {
      const { objectIDs } = await getModifiedObjects(formattedStartDate, formattedEndDate);
      if (!objectIDs || objectIDs.length === 0) {
        searchResults.value = [];
        return;
      }
      const results = await Promise.all(
        objectIDs.slice(0, 10).map(id => getObjectDetails(id))
      );
      searchResults.value = results.filter(r => r);
    } catch (error) {
      searchResults.value = [];
    }
  };
  
  const filterResults = () => {
    if (!selectedDepartment.value) {
      fetchResults(); // Show all departments
    } else {
      searchResults.value = searchResults.value.filter(item => item.department === selectedDepartment.value);
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 2.8rem;
    margin-bottom: 30px;
    color: #333;
  }
  
  .date-range {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .date-input {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  label {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #444;
  }
  
  input[type="date"] {
    padding: 12px 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    background-color: #ffffff;
    width: 180px;
    font-size: 1rem;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  input[type="date"]:focus {
    outline: none;
    border-color: #0078d4;
    box-shadow: 0px 4px 10px rgba(0, 120, 212, 0.3);
  }
  
  .btn-search {
    padding: 14px 35px;
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .btn-search:hover {
    background-color: #005bb5;
    transform: translateY(-3px);
    box-shadow: 0px 8px 15px rgba(0, 91, 181, 0.4);
  }
  
  .department-filter {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  
  select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 220px;
    font-size: 1rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;
  }
  
  select:focus {
    outline: none;
    border-color: #0078d4;
  }
  
  @media (max-width: 768px) {
    .date-range {
      flex-direction: column;
      gap: 15px;
    }
  
    .btn-search {
      width: 100%;
    }
  }
  </style>
  