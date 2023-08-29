import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Blogs from './components/content/blogs';
import LoginForm from './components/form/LoginForm';
import AuthLayout from './layout/AuthLayout';
import Home from "./pages/Home";
import NotFound from './pages/NotFound';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Auth>
      <Route index path="/" element={<Home />}>
        {/* Blogs pages */}
        <Route index path="blogs" element={<Blogs />}></Route>
        {/* Authentication pages */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="signUp" element={<LoginForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Auth>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
