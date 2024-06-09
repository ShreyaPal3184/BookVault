import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import { Home } from './Home';
import Books from './Components/Books';
import MyBooks from "./Components/MyBooks";
import { UserProvider } from './Components/UserContext';
import Register from './Components/Register';
import { Layout } from './Components/Common/Layout';
import { NavigationBar } from './Components/Common/NavigationBar';
import { Jumbotron } from './Components/Common/Jumbotron';
import { Footer } from './Components/Common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <React.Fragment>
      <UserProvider>
        <Router>
          <NavigationBar />
          <Jumbotron />
          <Layout>
            <div className="App">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/books" element={<Books />} />
                <Route exact path="/mybooks" element={<MyBooks />} />
                <Route exact path="/register" element={<Register/>} />
              </Routes>
            </div>
          </Layout>
        </Router>
      </UserProvider>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </React.Fragment>
  );
}

export default App;
