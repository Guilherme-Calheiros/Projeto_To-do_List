import { useState } from "react";
import Input from "../Input.jsx"
import Button from "../Button.jsx"
import Image from "../Image.jsx";
import CardAcesso from "../CardAcesso.jsx";
import LogoMobile from "../../assets/Logo.png";
import LogoDesktop from "../../assets/Logo_desktop.png";
import Checklist_boy from '../../assets/Checklist_boy.png';
import { Link, useNavigate } from "react-router-dom";
import UseAuthContext from "../../hooks/UseAuthContext";

const Login = () => {
    const { signin } = UseAuthContext();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [error, setError] = useState("")
    
    const handleLogin = () => {
        if (!email || !senha) {
            setError("Preencha todos os campos")
            return
        }

        signin(email, senha).then((res) => {
            if (res.token) {
                navigate("/home")
            } else {
                setError(res)
            }
        })

        
    }

    return (
        <div className="flex">
            <div className="hidden dark:bg-[#1e1e1e] lg:flex lg:flex-col justify-center items-center p-4 w-2/4">
                <div className="hidden sm:block">
                    <Image src={LogoDesktop} alt="Logo"/>
                </div>
                <div className="hidden sm:block">
                    <Image src={Checklist_boy} h="624px"/>
                </div>
            </div>
            <div className="bg-primary-300 h-screen p-2 w-full lg:w-2/4 ml-auto flex flex-col justify-center items-center">
                <div className="lg:hidden mb-14">
                    <Image src={LogoMobile}/> 
                </div>
                <CardAcesso text="Login">
                    <Input 
                        type="email"
                        placeholder={"Digite seu E-mail"}
                        value={email}
                        onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />
                    <Input 
                        type="password"
                        placeholder={"Digite sua Senha"}
                        value={senha}
                        onChange={(e) => [setSenha(e.target.value), setError("")]}
                    />
                    { error && <p className="text-red-700 p-3">{error}</p>}
                    <Button text="Entrar" onClick={handleLogin}/>
                    <span className="text-gray-400 text-center">
                        <p>Não tem uma conta? <strong><Link to="/signup">Registre-se</Link></strong></p>
                    </span>
                </CardAcesso>
            </div>
        </div>
    )
}

export default Login;