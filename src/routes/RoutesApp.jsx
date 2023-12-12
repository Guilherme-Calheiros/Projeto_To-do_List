import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import Signup from "../components/pages/Signup";
import Signin from "../components/pages/Signin";
import UseAuthContext from "../hooks/UseAuthContext";

const Private = ({ Item }) => {
    const { signed } = UseAuthContext();

    return signed > 0 ? <Item /> : <Signin />;
}

const RoutesApp = () => {
    return(
        <Router>
            <>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home}/> } />
                    <Route path="/" element={<Signin />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="*" element={<Signin />} />
                </Routes>
            </>
        </Router>
    );
};

export default RoutesApp;