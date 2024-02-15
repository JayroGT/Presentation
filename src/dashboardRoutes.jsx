//  React, hooks y componentes de React
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// dashboard
import HomeDashboard from './Dashboard de Administradores/HomeDashboard.jsx';
import CreateCategory from './Dashboard de Administradores/Creation/CreateCategory.jsx';
import CreateProduct from './Dashboard de Administradores/Creation/CreateProduct.jsx';

import ModificationProduct from './Dashboard de Administradores/Modification/ModificationProduct.jsx';
import AdminUsers from './Dashboard de Administradores/AdminUsers.jsx';

const DashboardRoutes = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
 
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch('https://animaliashop-backend.onrender.com/users');
          const users = await response.json();
          const authenticatedUser = users.find(u => u.email === user.email);
          if(authenticatedUser){
            setIsAdmin( authenticatedUser.isAdmin);
         }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoadingUser(false);
        }
      } else {
      
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, user]);

  if (isLoading || loadingUser) {
    return <div>Loading...</div>;
  }

  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
        <Route path="/" element={<AdminUsers />}/>
        <Route path="/creationCategory" element={<CreateCategory />} />
        <Route path="/creationProduct" element={<CreateProduct />} />
        
       <Route path="/modifications/product/:id" element={<ModificationProduct />} />
        
        <Route path="/HomeDashboard" element={<HomeDashboard />} />
    </Routes>
  );
};

export default DashboardRoutes;
