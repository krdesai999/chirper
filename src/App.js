import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Auth } from "./components/Auth";
import Blogs from "./components/content/blogs";
import LoginForm from "./components/form/LoginForm";
import SignUpForm from "./components/form/Signup";
import Redirect from "./components/utils/Redirect";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <Auth>
          <Home />
        </Auth>
      }
    >
      <Route index element={<Redirect />} />
      {/* Blogs pages */}
      <Route path="blogs" element={<Blogs />} />
      {/* Authentication pages */}
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="signUp" element={<SignUpForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
