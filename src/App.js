import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Error from "./Pages/Error";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { UserProvider, useUser } from "./Context";
import Loading from "./Pages/Loading";
import 'react-toastify/dist/ReactToastify.css';
import UserHeader from "./Components/UserHeader";
import UserInfo from "./Pages/UserInfo";
import AboutInfo from "./Components/AboutInfo";
import UsernameInfo from "./Components/UsernameInfo";
import EducationInfo from "./Components/EducationInfo";
import ExperienceInfo from "./Components/ExperienceInfo";
import ProjectInfo from "./Components/ProjectInfo";
import CertificationInfo from "./Components/CertificationInfo";
import SkillInfo from "./Components/SkillInfo";
import ContactInfo from "./Components/ContactInfo";
import ThemeInfo from "./Components/ThemeInfo";


function App() {
  const router = createBrowserRouter([
    {
      index: '/', element: <Header />,
      children: [
        { index: true, element: <Home /> },
        { path: "/sign-in", element: <SignIn /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/user-info", element: <UserInfo /> ,
          children:[
            {path:"general", element:<UsernameInfo/>},
            {path:"about",element:<AboutInfo/>},
            {path:"education",element:<EducationInfo/>},
            {path:"experience",element:<ExperienceInfo/>},
            {path:"projects",element:<ProjectInfo/>},
            {path:"certifications",element:<CertificationInfo/>},
            {path:"skills",element:<SkillInfo/>},
            {path:"contacts",element:<ContactInfo/>},
            {path:"themes",element:<ThemeInfo/>},
            // {path:"fonts",element:<FontInfo/>},
          ]
        },
      ],
    },
    {
      path: "/u/:username",
      element: <UserHeader />,
      children: [
        { path: "home", element: <Home /> },
        // { path: "education", element: <Education /> }
      ]
    },
    { path: "*", element: <Error /> }
  ]);

  return (
    <>
    <UserProvider>
      <RouterProvider router={router} >
      </RouterProvider>
    </UserProvider>
    </>
  );
}

export default App;
