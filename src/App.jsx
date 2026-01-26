import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import WorkingDashboard from './WorkingDashboard'
import MyTasks from './pages/employee/MyTasks'
import CheckInOutSimple from './pages/employee/CheckInOutSimple'
import MyLocation from './pages/employee/MyLocation'
import MyProfileSimple from './pages/employee/MyProfileSimple'
import ManageEmployees from './pages/admin/ManageEmployees'

// Auth Pages
import LoginPortal from './pages/auth/LoginPortal'
import SignupPortal from './pages/auth/SignupPortal'
import AdminLogin from './pages/auth/AdminLogin'
import HRLogin from './pages/auth/HRLogin'
import EmployeeLogin from './pages/auth/EmployeeLogin'
import AdminSignup from './pages/auth/AdminSignup'
import HRSignup from './pages/auth/HRSignup'
import EmployeeSignup from './pages/auth/EmployeeSignup'

// HR Pages
import EmployeeRecords from './pages/hr/EmployeeRecords'
import AttendanceReports from './pages/hr/AttendanceReports'
import Performance from './pages/hr/Performance'
import Analytics from './pages/hr/Analytics'

// Admin Pages
import SystemReports from './pages/admin/SystemReports'
import SystemSettings from './pages/admin/SystemSettings'
import UserManagement from './pages/admin/UserManagement'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPortal />} />
        <Route path="/signup" element={<SignupPortal />} />
        
        {/* Role-specific Login Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/hr" element={<HRLogin />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        
        {/* Role-specific Signup Routes */}
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/signup/hr" element={<HRSignup />} />
        <Route path="/signup/employee" element={<EmployeeSignup />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/:role" element={<WorkingDashboard />} />
        
        {/* Employee Routes */}
        <Route path="/employee/mytasks" element={<MyTasks />} />
        <Route path="/employee/checkinout" element={<CheckInOutSimple />} />
        <Route path="/employee/mylocation" element={<MyLocation />} />
        <Route path="/employee/myprofile" element={<MyProfileSimple />} />
        
        {/* Admin Routes */}
        <Route path="/admin/manage-employees" element={<ManageEmployees />} />
        <Route path="/admin/system-reports" element={<SystemReports />} />
        <Route path="/admin/system-settings" element={<SystemSettings />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        
        {/* HR Routes */}
        <Route path="/hr/employee-records" element={<EmployeeRecords />} />
        <Route path="/hr/attendance-reports" element={<AttendanceReports />} />
        <Route path="/hr/performance" element={<Performance />} />
        <Route path="/hr/analytics" element={<Analytics />} />
        
        {/* Home Route */}
        <Route path="/" element={<LoginPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
