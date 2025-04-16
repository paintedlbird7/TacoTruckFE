// src/services/tacotruckService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tacotrucks`;
// TODO: do User stories for trello AAU, under component hierarchy diagram
// TODO:



const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

const show = async (tacotruckId) => {
    try {
      const res = await fetch(`${BASE_URL}/${tacotruckId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
const create = async (tacotruckFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tacotruckFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
// src/services/tacotruckService.js

const createComment = async (tacotruckId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${tacotruckId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
const deleteTacotruck = async (tacotruckId) => {
    try {
      const res = await fetch(`${BASE_URL}/${tacotruckId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  

const update = async(tacotruckId, tacotruckFormData) => {
// async function update(tacotruckId, tacotruckFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${tacotruckId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tacotruckFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  export {
    index,
    show,
    create,
    createComment,
    deleteTacotruck,
    update,
  };
  
  
  
  
  