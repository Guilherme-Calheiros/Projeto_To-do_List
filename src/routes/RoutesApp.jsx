import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/pages/Home";
import Signup from "../components/pages/Signup";
import Signin from "../components/pages/Signin";
import PocketBase from 'pocketbase';


const PrivateRoute = ({ element: Element }) => {
    const pb = new PocketBase('https://to-do.pockethost.io/');
    if(pb.authStore.isValid){
        return <Element />
    } else {
        return <Navigate to="/"/>;
    }
}

const RoutesApp = () => {
    return(
        <Router>
            <>
                <Routes>
                    <Route exact path="/home" element={<PrivateRoute element={Home}/> } />
                    <Route path="/" element={<Signin />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="*" element={<Signin />} />
                </Routes>
            </>
        </Router>
    );
};

export default RoutesApp;