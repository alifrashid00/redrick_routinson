import { useContext, useState } from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from "./pages/login/Login";
import StudentHome from "./pages/home/StudentHome";
import TeacherHome from "./pages/home/TeacherHome";
import AdminHome from './pages/home/AdminHome';
import ForgotPassword from './pages/login/ForgotPassword';
import StudentDashboard from "./pages/home/dashboards/StudentDashbord.jsx";
import {ChakraProvider} from "@chakra-ui/react";




function App() {
  
  const{currentUser ,role} = useContext(AuthContext)

  const RequireAuth = ({children, allowedRoles})=>{
    if(!currentUser){
      return<Navigate to="/login"/>;
    }
    if(!allowedRoles.includes(role)){
      return<Navigate to="/login"/>;
    }
    return children;
  }

  console.log(currentUser)

  return (
    <ChakraProvider>
     <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
              path="/admin-home"
              element={
                <RequireAuth allowedRoles={["admin"]}>
                  <AdminHome/>
                </RequireAuth>

              }
        />
        
        <Route
              path="/teacher-home"
              element={
                <RequireAuth allowedRoles={["teacher"]}>
                  <TeacherHome/>
                </RequireAuth>

              }
        />
        <Route path="/student-home" element={
            <RequireAuth allowedRoles={["student"]}>
                  <StudentHome/>
                </RequireAuth>

              }
        >
            <Route path="/student-home/student-dashboard" element={
                <RequireAuth allowedRoles={["student"]}>
                    <StudentDashboard/>
                </RequireAuth>
            }/>

        </Route>

      </Routes>
    </Router>

    </ChakraProvider>
  )
}

export default App
