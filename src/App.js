import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Dashboard from './componant/Dashboard';
import Setting from './componant/Setting';
import Login from './componant/Login';
import Manageballot from './componant/Manageballot';
import Addballot from './componant/Addballot';
import Managevoter from './componant/Managevoter';
import Addvoter from './componant/Addvoter';
import Managecandidate from './componant/Managecandidate';
import Addcandidate from './componant/Addcandidate';
import Profile from './componant/Profile';
import Menu from './componant/Menu';
import Footer from './componant/Footer';
import Result from './componant/Result';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [login, setLogin] = useState(false);
  const [clientData, setClientData] = useState();

  const loginCheck = () => {
    const token = localStorage.getItem("token");
    try {
      // api call
      if (token) {
        fetchData();
      }
    } catch (error) {

    }
  }

  function fetchData() {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:8080/admin/alldata", {
      token: token
    }).then((data) => {
      setLogin(true);
      setClientData(data.data)
      console.log(data.status);
    })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loginCheck()
  }, [])

  return (
    login && clientData ?
      <>
        <Router>
          <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
            <Menu />

            <Routes>
              <Route path="/" element={<Dashboard data={clientData} />} />
              <Route path="/setting" element={<Setting data={clientData} fetchData={fetchData} />} />
              <Route path="/profile" element={<Profile data={clientData} fetchData={fetchData} />} />
              <Route path="/manageballot" element={<Manageballot clientData={clientData} />} />
              <Route path="/addballot" element={<Addballot />} />
              <Route path="/managevoter" element={<Managevoter />} />
              <Route path="/addvoter" element={<Addvoter />} />
              <Route path="/managecandidate" element={<Managecandidate />} />
              <Route path="/addcandidate" element={<Addcandidate />} />
              <Route path="/result" element={<Result />} />
              <Route path="/*" element={<Navigate from="/*" to={'/'} />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </>
      :
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Navigate from="/*" to={'/'} />} />
        </Routes>
      </Router>
  );
}

export default App;
