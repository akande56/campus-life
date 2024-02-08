import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/Pages/LandingPage/Homepage'
import Dashboard from './Components/Pages/Dashboard/Dashboard'
import ProfilePage from './Components/Pages/Profile/Profile'
import UploadsPage from './Components/Pages/Uploads/Uploads'
import Registration from './Components/Pages/Auth/SignUp/SignUp'
import SharedLayout from './Components/Pages/Dashboard/SharedLayout'
import HundredLevelFiles from './Components/Sections/Cards/HundredLevel'
import TwoHundredLevelFiles from './Components/Pages/Files/200Level'
import PasswordReset from './Components/Pages/Auth/PasswordReset/PasswordsReset'
import ForgotPassword from './Components/Pages/Auth/PasswordReset/ForgotPassword'
import Login from './Components/Pages/Auth/Login/Login'

function App() {

  return (
    <Box>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='dashboard' element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard/:userId' element={<ProfilePage />} />
          <Route path='my-uploads' element={<UploadsPage />} />
          <Route path="year-one" element={<UploadsPage />} />
          <Route path="100-level-first-semester" element={<HundredLevelFiles />} />
          <Route path="100-level-second-semester" element={<HundredLevelFiles />} />
          <Route path="200-level-first-semester" element={<TwoHundredLevelFiles />} />
          <Route path="200-level-second-semester" element={<TwoHundredLevelFiles />} />
        </Route>
        <Route path='/sign-up' element={<Registration />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='password-reset' element={<ForgotPassword />} />
        <Route path='new-password' element={<PasswordReset />} />
      </Routes>
    </Box>
  )
}

export default App
