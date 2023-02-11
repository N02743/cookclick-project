import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./script/useAuth"
import { useState, useEffect } from "react"
import { decodeToken } from "react-jwt"

import "./App.css"

import Navbar from "./components/Navbar"
import Gnavbar from "./components/Gnavbar"
import Staffbar from "./components/Staffbar"

import ProtectedRoute from "./components/ProtectedRoute"
import Protectedlogin from "./components/Protectedlogin"
import ProtectedStaffRoute from "./components/ProtectedStaffRoute"
import ProtectedOwnerRoute from "./components/ProtectedOwnerRoute"
import ProtectedOwnerStaff from "./components/ProtectedOwnerStaff"
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"

import Login from "./pages/Login"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Search from "./pages/Search"
import SearchRef from "./pages/SearchRef"
import Add from "./pages/Add"
import Ref from "./pages/Ref"
import Test from "./pages/Test"
import MenuId from "./pages/MenuId"
import Dashboard from "./pages/Staff/Dashboard"
import Approve from "./pages/Staff/Approve"
import User from "./pages/Staff/User"
import Menulist from "./pages/Menulist"
import Myfav from "./pages/Myfav"
import MemberReportPage from "./pages/Staff/MemberReport"
import MenuReportPage from "./pages/Staff/MenuReport"
import CommentReportPage from "./pages/Staff/CommentReport"
import StaffLogin from "./pages/Staff/StaffLogin"
import Ads from "./pages/Staff/Ads"
import AddAds from "./pages/Staff/AddAds"
import AddIng from "./pages/Staff/AddIng"

//test modal
import ReportUserModal from "./components/Report/Modal/ReportUser"
import ReportCommentModal from "./components/Report/Modal/ReportComment"
import ReportMenuModal from "./components/Report/Modal/ReportMenu"
import DeleteUserModal from "./components/Report/Modal/DeleteUser"
import DeleteCommentModal from "./components/Report/Modal/DeleteComment"
import DeleteMenuModal from "./components/Report/Modal/DeleteMenu"
import NewLogin from "./pages/NewLogin"

//* Non logged-in users cannot access ProtectedRoute pages

function App() {
  const [login, setlogin] = useState(0)
  const [ignore, setignore] = useState(false)
  const [udata, setudata] = useState("")
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    const UserData = decodeToken(token)
    setudata(UserData)
    let role = 0
    if (token === null) {
      role = 0
    } else {
      role = UserData.role
    }
    setlogin(role)
    setignore(true)
  }, [ignore])

  return (
    <>
      <Router basename="/cookclick-project">
        <AuthProvider>
          {login === 0 && <Gnavbar />}
          {login === 1 && <Navbar user={udata} onchangelogout={setignore} />}
          {login >= 2 && <Staffbar user={udata} onchangelogout={setignore} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/searchref"
              element={
                <ProtectedRoute>
                  <SearchRef />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <Add />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add/:uid/:mid"
              element={
                <ProtectedOwnerRoute>
                  <Add />
                </ProtectedOwnerRoute>
              }
            />
            {/* <Route
              path="/login"
              element={
                <Protectedlogin>
                  <Login onchangelogin={setignore} />
                </Protectedlogin>
              }
            /> */}
            <Route
              path="/login"
              element={
                <Protectedlogin>
                  <NewLogin onchangelogin={setignore} />
                </Protectedlogin>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Protectedlogin>
                  <SignUp />
                </Protectedlogin>
              }
            />
            <Route
              path="/ref"
              element={
                <ProtectedRoute>
                  <Ref />
                </ProtectedRoute>
              }
            />
            <Route path="/menuId/:uid/:mid" element={<MenuId status={0} />} />
            <Route
              path="/menuId/waiting/:uid/:mid"
              element={
                <ProtectedOwnerStaff>
                  <MenuId status={1} />
                </ProtectedOwnerStaff>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Mymenu"
              element={
                <ProtectedRoute>
                  <Menulist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Myfav"
              element={
                <ProtectedRoute>
                  <Myfav />
                </ProtectedRoute>
              }
            />
            <Route path="/staff/login" element={<StaffLogin />} />
            <Route
              path="/staff/dashboard"
              element={
                <ProtectedStaffRoute>
                  <Dashboard />
                </ProtectedStaffRoute>
              }
            />
            <Route
              path="/staff/add-ingredient"
              element={
                <ProtectedStaffRoute>
                  <AddIng />
                </ProtectedStaffRoute>
              }
            />
            {/* <Route
              path="/staff/approve"
              element={
                <ProtectedStaffRoute>
                  <Approve />
                </ProtectedStaffRoute>
              }
              /> */}
            <Route path="/staff/approve" element={<Approve />} />
            <Route
              path="/staff/User"
              element={
                <ProtectedAdminRoute>
                  <User />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/staff/report/members"
              element={
                <ProtectedStaffRoute>
                  <MemberReportPage />
                </ProtectedStaffRoute>
              }
            />
            <Route
              path="/staff/report/comments"
              element={
                <ProtectedStaffRoute>
                  <CommentReportPage />
                </ProtectedStaffRoute>
              }
            />
            <Route
              path="/staff/report/menus"
              element={
                <ProtectedStaffRoute>
                  <MenuReportPage />
                </ProtectedStaffRoute>
              }
            />
            <Route
              path="/staff/testmodal"
              element={
                <>
                  <ReportUserModal />
                  <ReportCommentModal />
                  <ReportMenuModal />
                </>
              }
            />
            <Route
              path="/staff/ads"
              element={
                <ProtectedStaffRoute>
                  <Ads />
                </ProtectedStaffRoute>
              }
            />
            <Route
              path="/staff/add-ads"
              element={
                <ProtectedStaffRoute>
                  <AddAds />
                </ProtectedStaffRoute>
              }
            />
            {/* <Route path="/staff/ads" element={<Ads />} />
            <Route path="/staff/add-ads" element={<AddAds />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
