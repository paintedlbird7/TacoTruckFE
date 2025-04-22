// src/components/TacotruckForm/TacotruckForm.jsx
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import * as tacotruckService from '../../services/tacotruckService';

const TacotruckForm = (props) => {
  // Destructure tacotruckId from the useParams hook, and console log it
  const { tacotruckId } = useParams();
  console.log(tacotruckId);
  const [formData, setFormData] = useState({
    // title: '',
    // text: '',
    name: '',
    location: '',
    description: '',
    // category: 'News',
  });

  const handleChange = (evt) => {
    console.log(`Changing ${evt.target.name} to ${evt.target.value}`);
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('Submitting form with:', formData); // ✅ Add this
    if (tacotruckId) {
      props.handleUpdateTacotruck(tacotruckId, formData);
    } else {
      props.handleAddTacotruck(formData);
    }
  };


  useEffect(() => {
    const fetchTacotruck = async () => {
      const tacotruckData = await tacotruckService.show(tacotruckId);
      setFormData(tacotruckData);
    };
    if (tacotruckId) fetchTacotruck();
    return () => setFormData({
      // title: '', 
      text: '',
      // category: 'News' 
      name: '', location: '', description: '' 
    });
  }, [tacotruckId]);


  return (
    <main>
      <h1>{tacotruckId ? 'Edit Tacotruck' : 'New Tacotruck'}</h1>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        {/* <label htmlFor='category-input'>Category</label> */}
        {/* <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        > */}
        {/* <option value='News'>News</option>
          <option value='Games'>Games</option>
          <option value='Music'>Music</option>
          <option value='Movies'>Movies</option>
          <option value='Sports'>Sports</option>
          <option value='Television'>Television</option> */}
        {/* </select> */}
        <label htmlFor='name-input'>Name</label>
        <input
          required
          type='text'
          name='name'
          id='name-input'
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor='location-input'>Location</label>
        <input
          required
          type='text'
          name='location'
          id='location-input'
          value={formData.location}
          onChange={handleChange}
        />

        <label htmlFor='description-input'>Description</label>
        <textarea
          required
          name='description'
          id='description-input'
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />

        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default TacotruckForm;
