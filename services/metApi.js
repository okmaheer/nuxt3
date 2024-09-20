// services/metApi.js
import axios from 'axios';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// services/metApi.js
export const getModifiedObjects = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/objects?metadataDateBegin=${startDate}&metadataDateEnd=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching modified objects:', error);
    return null;
  }
};


export const getObjectDetails = async (objectId) => {
  try {
    const response = await axios.get(`${BASE_URL}/objects/${objectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching object details:', error);
    return null;
  }
};
