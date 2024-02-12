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

export const fetchPetOwner = async (baseUrl, token, addressId) => {
  try {
    const result = await axios.get(
      `${baseUrl}/recorder/getByData/table/pet_owner/from/addressId/`,
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
