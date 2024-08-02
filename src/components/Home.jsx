import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Home() {
  const [formData, setFormData] = useState({
    userid: '',
    collegeemail: '',
    collegerollno: '',
    arrnum: '',
    arralp: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert the comma-separated strings into arrays
    const arrnumArray = formData.arrnum.split(',').map(Number);
    const arralpArray = formData.arralp.split(',');

    const dataToSend = {
      ...formData,
      arrnum: arrnumArray,
      arralp: arralpArray,
    };

    // Log form data or send it as JSON
    console.log(JSON.stringify(dataToSend));

    // Navigate to the filter page with the form data
    navigate('/filter', { state: { data: dataToSend } });
  };
  
  const handleNavigateToFilter = () => {
    // Navigate to the filter page without any specific data
    navigate('/filter');
  };

  return (
    <div className='w-[90%] h-[100vh] m-auto flex justify-center items-center bg-slate-700'>
      <form onSubmit={handleSubmit}>
        <div className='Formcontainer'>
          <label>USERID:</label>
          <input type="text" name="userid" value={formData.userid} onChange={handleChange} />

          <label>College Email:</label>
          <input type="email" name="collegeemail" value={formData.collegeemail} onChange={handleChange} />

          <label>College RollNO:</label>
          <input type="text" name="collegerollno" value={formData.collegerollno} onChange={handleChange} />

          <label>Array Of Num:</label>
          <input type="text" name="arrnum" value={formData.arrnum} onChange={handleChange} />

          <label>Array of alp:</label>
          <input type="text" name="arralp" value={formData.arralp} onChange={handleChange} />

          <button type="submit">Submit</button>
          <button onClick={handleNavigateToFilter}>Go to Filter Page</button>
        </div>
      </form>
    </div>
  );
}

export default Home;
