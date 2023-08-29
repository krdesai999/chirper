import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Blogs from './components/content/blogs';
import LoginForm from './components/form/LoginForm';
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route index path='/' element={<Home />}>
      <Route index element={ <Blogs />} />
      <Route path='login' element={<LoginForm />} />
      <Route path="signUp" element={<LoginForm />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
