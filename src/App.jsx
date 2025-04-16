import { useContext } from 'react';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import TacotruckList from './components/TacotruckList/TacotruckList';
import * as tacotruckService from './services/tacotruckService';
import TacotruckDetails from './components/TacotruckDetails/TacotruckDetails';
import TacotruckForm from './components/TacotruckForm/TacotruckForm';
import { UserContext } from './contexts/UserContext';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';


const App = () => {

  const navigate = useNavigate();

  const handleAddTacotruck = async (tacotruckFormData) => {
    // console.log('tacotruckFormData', tacotruckFormData);
    const newTacotruck = await tacotruckService.create(tacotruckFormData);
    setTacotrucks([newTacotruck, ...tacotrucks]);
    navigate('/tacotrucks');
  };


  const handleDeleteTacotruck = async (tacotruckId) => {
    const deletedTacotruck = await tacotruckService.deleteTacotruck(tacotruckId);
    // Filter state using deletedTacotruck._id:
    setTacotrucks(tacotrucks.filter((tacotruck) => tacotruck._id !== deletedTacotruck._id));
    navigate('/tacotrucks');
  };

  const handleUpdateTacotruck = async (tacotruckId, tacotruckFormData) => {
    console.log('tacotruckId:', tacotruckId);
    console.log('tacotrucks:', tacotrucks); // Log the state of tacotrucks
  
    const updatedTacotruck = await tacotruckService.update(tacotruckId, tacotruckFormData);
  
    if (!updatedTacotruck) {
      console.error('Error: Updated tacotruck is undefined or null');
      return;
    }
  
    // Ensure no undefined tacotrucks in the map function
    setTacotrucks(
      tacotrucks.map((tacotruck) => {
        if (tacotruck && tacotruck._id === tacotruckId) {
          return updatedTacotruck;
        }
        return tacotruck;
      })
    );
  
    navigate(`/tacotrucks/${tacotruckId}`);
  };
  

  const [tacotrucks, setTacotrucks] = useState([]);
  // src/App.jsx
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   const fetchAllTacotrucks = async () => {
  //     const tacotrucksData = await tacotruckService.index();
  //     // console log to verify data in the console
  //     // console.log('tacotrucksData:', tacotrucksData);
  //     setTacotrucks(tacotrucksData);
  //   };
  //   if (user) fetchAllTacotrucks();
  //   // only fetch tacotrucks when a user is logged in
  // }, [user]); // adding user dependency because the effect depends on the user to run
 
  useEffect(() => {
    const fetchAllTacotrucks = async () => {
      const tacotrucksData = await tacotruckService.index();
      console.log('Fetched taco trucks:', tacotrucksData); // Check this log
      setTacotrucks(tacotrucksData);
    };
    fetchAllTacotrucks();
  }, []);
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/tacotrucks/new'
          element={<TacotruckForm handleAddTacotruck={handleAddTacotruck} />}
        />
        <Route
          path='/tacotrucks/:tacotruckId/edit'
          element={<TacotruckForm handleUpdateTacotruck={handleUpdateTacotruck} />}
        />
        <Route path='/tacotrucks/new' element={<h1>New Tacotruck</h1>} />
        <Route
          path='/tacotrucks/:tacotruckId'
          element={<TacotruckDetails handleDeleteTacotruck={handleDeleteTacotruck} />}
        />
        <Route path='/tacotrucks' element={<TacotruckList tacotrucks={tacotrucks} />} />
        {/* <Route path='/' element={user ? <Dashboard /> : <Landing />} /> */}
        <Route path='/' element={user ? <Dashboard /> : <Landing tacotrucks={tacotrucks} />} />

        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/tacotrucks' element={<TacotruckList />} />
          </>
        ) : (
          <>
            <Route
              path='/tacotrucks/:tacotruckId/edit'
              element={<TacotruckForm />}
            />
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );

};

export default App;
