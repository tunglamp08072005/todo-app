import './App.css';
import { useEffect, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Active from './components/Active';
import Completed from './components/Completed';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';

import axios from './Axios/axios';

import TaskContext from './context/TaskContext';
import TokenContext from './context/TokenContext';

import taskReducer from './reducer/taskReducer';
import tokenReducer from './reducer/tokenReducer';
import userReducer from './reducer/userReducer';

function App() {
  const token = JSON.parse(localStorage.getItem('authToken'));
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [user, userDispatch] = useReducer(userReducer, {});

  // ✅ Lấy thông tin người dùng
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user/getUser', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        userDispatch({ type: 'SET_USER', payload: res.data.user });
      } catch (error) {
        console.error('Fetch User Error:', error);
        tokenDispatch({ type: 'UNSET_TOKEN' });
      }
    };

    if (userToken) {
      fetchUser();
    }
  }, [userToken]);

  // ✅ Lấy danh sách công việc
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/task/getTask', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        dispatch({ type: 'SET_TASK', payload: res.data });
      } catch (error) {
        console.error('Fetch Tasks Error:', error);
      }
    };

    if (userToken) {
      fetchTasks();
    }
  }, [userToken]);

  return (
    <BrowserRouter>
      <TokenContext.Provider value={{ userToken, tokenDispatch, user, userDispatch }}>
        <TaskContext.Provider value={{ tasks, dispatch }}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route
                index
                element={userToken ? <Layout /> : <Login />}
              />
              <Route path="/active" element={userToken ? <Active /> : <Login />} />
              <Route path="/completed" element={userToken ? <Completed /> : <Login />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
            </Route>
          </Routes>
        </TaskContext.Provider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;
