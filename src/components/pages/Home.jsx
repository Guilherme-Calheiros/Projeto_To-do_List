import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";
import UseAuthContext from "../../hooks/UseAuthContext";

const Home = () => {

    const { signout } = UseAuthContext()
    const navigate = useNavigate()

    const handleSignout = () =>{
        signout()
        navigate("/")
    }

    return(
        <>
            <h1>Home</h1>
            <Button text="Sair" onClick={handleSignout}/>
        </>
    )
};

export default Home;