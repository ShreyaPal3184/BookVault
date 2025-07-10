import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './Components/UserContext';
import { Footer } from './Components/Common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Books from './Components/UserComponents/Books';
import MyBooks from "./Components/UserComponents/MyBooks";
import AboutUs from './Components/UserComponents/AboutUs';
import AdminHomepage from './Components/AdminComponents/AdminHomePage';
import AdminDashboard from './Components/AdminComponents/AdminDashboard';
import RentedBooksPage from './Components/AdminComponents/RentedBooksPage';
import UsersPage from './Components/AdminComponents/UsersPage';
import BooksPage from './Components/AdminComponents/BooksPage';
import CurrentlyRentedPage from './Components/AdminComponents/CurrentlyRentedBooks';
import UserManagement from './Components/AdminComponents/UserManagement';
import BookManagement from './Components/AdminComponents/BookManagement';
import { NavigationBar } from './Components/Common/NavigationBar';
import { Book } from 'lucide-react';

function App() {
  return (
    <React.Fragment>
      <UserProvider>
        <Router>
        <NavigationBar />
          {/* <NavigationBar /> */}
            <div className="App">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/books" element={<Books />} />
                <Route exact path="/mybooks" element={<MyBooks />} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/about" element={<AboutUs />} />
                <Route exact path="/admin" element={<AdminHomepage />} />
                <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
                <Route exact path="/rented-count" element={<RentedBooksPage />} />
                <Route exact path="/users" element={<UsersPage />} />
                <Route exact path="/books-get" element={<BooksPage />} />
                <Route exact path="/currently-rented" element={<CurrentlyRentedPage />} />
                <Route exact path="/admin/user-management" element={<UserManagement />} />                
                <Route exact path="/admin/book-management" element={<BookManagement />} />                
              </Routes>
            </div>
        </Router>
      </UserProvider>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
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
