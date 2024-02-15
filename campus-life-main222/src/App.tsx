import { Box } from '@chakra-ui/react'
import { Route, Routes, } from 'react-router-dom'
import HomePage from './Components/Pages/LandingPage/Homepage'
import Dashboard from './Components/Pages/Dashboard/Dashboard'
import UploadsPage from './Components/Pages/Uploads/Uploads'
import Registration from './Components/Pages/Auth/SignUp/SignUp'
import SharedLayout from './Components/Pages/Dashboard/SharedLayout'
import HundredLevelFiles from './Components/Sections/Cards/HundredLevel'
import TwoHundredLevelFiles from './Components/Pages/Files/200Level'
import PasswordReset from './Components/Pages/Auth/PasswordReset/PasswordsReset'
import ForgotPassword from './Components/Pages/Auth/PasswordReset/ForgotPassword'
import Login from './Components/Pages/Auth/Login/Login'
import AllFilesPage from './Components/Pages/Files/AllFilesPage'
import ComingSoonPage from './Components/Pages/ComingSoon/ComingSoonPage'
import ReadOnlyProfilePage from './Components/Pages/Profile/ReadOnlyProfilePage'
import EditModeProfilePage from './Components/Pages/Profile/EditModeProfilePage'
import { RequireAuth } from './Components/Core/Auth/RequireAuth'

function App() {

  return (
    <Box>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='dashboard' element={<SharedLayout />}>
          <Route index element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path='dashboard/:userId' element={
            <RequireAuth>
              <EditModeProfilePage />
            </RequireAuth>
          } />
          <Route path='my-uploads' element={
            <RequireAuth>
              <UploadsPage />
            </RequireAuth>
          }
          />
          <Route path="year-one" element={
            <RequireAuth>
              <UploadsPage />
            </RequireAuth>
          }
          />
          <Route path='all-files' element={
            <RequireAuth>
              <AllFilesPage />
            </RequireAuth>
          }
          />
          <Route path="100-level-first-semester" element={
            <RequireAuth>
              <HundredLevelFiles />
            </RequireAuth>
          }
          />
          <Route path="100-level-second-semester" element={
            <RequireAuth>
              <HundredLevelFiles />
            </RequireAuth>
          }
          />
          <Route path="200-level-first-semester" element={
            <RequireAuth>
              <TwoHundredLevelFiles />
            </RequireAuth>
          }
          />
          <Route path="200-level-second-semester" element={
            <RequireAuth>
              <TwoHundredLevelFiles />
            </RequireAuth>
          }
          />
          <Route path="profile" element={
            <RequireAuth>
              <EditModeProfilePage />
            </RequireAuth>
          }
          />
          <Route path="starred" element={
            <RequireAuth>
              <ComingSoonPage />
            </RequireAuth>

          }
          />
          <Route path="file-request" element={
            <RequireAuth>
              <ComingSoonPage />
            </RequireAuth>
          }
          />
          <Route path="shared" element={
            <RequireAuth>
              <ComingSoonPage />
            </RequireAuth>
          }
          />
          <Route path="deleted" element={
            <RequireAuth>
              <ComingSoonPage />
            </RequireAuth>
          }
          />
        </Route> : (

        <Route path='/sign-up' element={<Registration />} />
        <Route path='/user/isaac-yerima' element={<ReadOnlyProfilePage />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='password-reset' element={<ForgotPassword />} />
        <Route path='new-password' element={<PasswordReset />} />
      </Routes>
    </Box>
  )
}

export default App
