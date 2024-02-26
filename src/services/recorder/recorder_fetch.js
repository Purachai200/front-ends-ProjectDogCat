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

export const fetchPetOwner = async (baseUrl, token, addressData) => {
  try {
    const petOwners = {};

    for (const address of addressData) {
      const result = await axios.get(
        `${baseUrl}/recorder/getMatch/table/pet_owner/from/addressId/${address.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      petOwners[address.id] = result.data;
    }
    
    const petOwnersArray = Object.values(petOwners);
    // console.log(petOwnersArray);
    
    return petOwnersArray;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchPet = async (baseUrl, token, petOwnerData) => {
  try {
    const petData = [];

    for (const owners of petOwnerData) {
      for (const petOwner of owners) {
        const result = await axios.get(
          `${baseUrl}/recorder/getMatch/table/pet/from/petOwnerId/${petOwner.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // เพิ่มข้อมูลเข้าไปใน petData โดยใช้ spread operator
        petData.push(...result.data);
      }
    }

    // console.log(petData);
    
    return petData;
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


export const fetchSubAddress = async (baseUrl, token, user) => {
  try {
      const result = await axios.get(
        `${baseUrl}/recorder/getMatch/table/subdistrict/from/id/${user.subdistrictId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return result.data
  } catch (err) {
    console.error(err);
    return [];
  }
};