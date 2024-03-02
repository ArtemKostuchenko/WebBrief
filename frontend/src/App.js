import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Index from './pages';
import BriefIndex from './pages/panel/briefs';
import PanelIndex from './pages/panel';
import PanelHome from './pages/panel/home';
import { AlertMessage } from './components/AlertMessage';
import { AppContext } from './contexts/app';
import { useEffect, useState } from 'react';
import Login from './pages/login';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from './store/slices/userSlice';
import { validAuth } from './utils/functions';
import Brief from './pages/panel/briefs/brief';
import EditBrief from './pages/panel/briefs/edit';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const showAlertMessage = (message, type = 'success') => {
    setShowMessage(true);
    setMessage(message);
    setSeverity(type);
  }

  const authUser = async () => {
    const user = await validAuth();
    if (user) {
      dispatch(setUser({
        username: user.username,
        isAdmin: user.isAdmin,
      }));
      setLoading(true);
    }
  }

  useEffect(() => {
    authUser();
    const interval = setInterval(async () => {
      const user = await validAuth();
      if (!user) {
        dispatch(clearUser());
      }
    }, 15 * 60 * 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <Router>
      <AppContext.Provider value={{ showAlertMessage, isLoading: loading, openBackDrop, setOpenBackDrop }}>
        <AlertMessage open={showMessage} setOpen={setShowMessage} message={message} severity={severity} />
        <Backdrop
          sx={{ color: '#fff'}}
          open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/panel' element={<PanelIndex />}>
            <Route index element={<PanelHome />} />
            <Route path='briefs' element={<BriefIndex />} />
          </Route>
          <Route path='/panel/briefs/:id' element={<Brief />} />
          <Route path='/panel/briefs/:id/edit' element={<EditBrief />} />

          <Route path='/login' element={<Login />} />
        </Routes>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
