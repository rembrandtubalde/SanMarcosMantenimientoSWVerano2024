import React from 'react';
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { GlobalStyle } from './theme';

import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Schedule } from './pages/Schedule';
import { Favorites } from './pages/Favorites';
import { Settings } from './pages/Settings';
import { Place } from './pages/Place';
import { Plan } from './pages/Plan';

import './index.css';

const App = () => {
  const theme = useSelector(state => state.theme);

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='inicio'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path='buscar' element={<Search />}/>
            <Route path='mis-planes' element={<Schedule />} />
            <Route path='favoritos' element={<Favorites />} />
            <Route path='mi-perfil' element={<Settings />} />
            <Route path='buscar/:place_id' element={<Place />} />
            <Route path='crear-plan/:place_id' element={<Plan />} />
          </Route>
          <Route path='registro' element={<Register />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;