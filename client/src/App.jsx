import './App.css'
import Navbar from "./component/Navbar"
import Footer from './component/Footer'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom"
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Account from './pages/Account'
import Profile from './pages/Profile'
import ProvideLoan from './pages/ProvideLoan'
import ReceiveLoan from './pages/ReceiveLoan'
import AccountType from './pages/AccountType'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/account' element={<Account />} />
        <Route path='/profile/:accountHolder' element={<Profile />} />
        <Route path='/loan/provide' element={<ProvideLoan />} />
        <Route path='/loan/receive' element={<ReceiveLoan />} />
        <Route path='/type' element={<AccountType />} />


      </Routes>

      <Footer />
    </>
  )
}

export default App
