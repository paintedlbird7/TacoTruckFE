// src/components/TacotruckForm/TacotruckForm.jsx
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import * as tacotruckService from '../../services/tacotruckService';

const TacotruckForm = (props) => {
     // Destructure tacotruckId from the useParams hook, and console log it
  const { tacotruckId } = useParams();
  console.log(tacotruckId);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
  });

  const handleChange = (evt) => {
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
    return () => setFormData({ title: '', text: '', category: 'News' });
  }, [tacotruckId]);


  return (
    <main>
      <h1>{tacotruckId ? 'Edit Tacotruck' : 'New Tacotruck'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
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
        <label htmlFor='category-input'>Category</label>
        <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='News'>News</option>
          <option value='Games'>Games</option>
          <option value='Music'>Music</option>
          <option value='Movies'>Movies</option>
          <option value='Sports'>Sports</option>
          <option value='Television'>Television</option>
        </select>
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default TacotruckForm;
