import axios from "axios";

export const fetchAddress = async (baseUrl, token) => {
  try {
    const result = await axios.get(
      `${baseUrl}/recorder/getByData/table/address/from/subdistrictId/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchAllAddress = async (baseUrl, token) => {
  try {
    const result = await axios.get(
      `${baseUrl}/recorder/get/address`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchAllPetOwner = async (baseUrl, token) => {
  try {
    const result = await axios.get(
      `${baseUrl}/recorder/get/pet_owner`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchAllPet = async (baseUrl, token) => {
  try {
    const result = await axios.get(
      `${baseUrl}/recorder/get/pet`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchAllUnregisterPet = async (baseUrl, token) => {
  try {
    const result = await axios.get(
      `${baseUrl}/recorder/get/unregistered`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};



export const fetchNature = async (baseUrl, token) => {
  try {
    const result = await axios.get(`${baseUrl}/recorder/get/nature`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchLocation = async (baseUrl, token) => {
  try {
    const result = await axios.get(`${baseUrl}/recorder/get/location`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
