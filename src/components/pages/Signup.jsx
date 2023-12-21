import { useState } from "react";
import Button from "../Button.jsx";
import Input from "../Input.jsx"
import Image from "../Image.jsx";
import CardAcesso from "../CardAcesso.jsx";
import LogoMobile from "../../assets/Logo.png";
import LogoDesktop from "../../assets/Logo_desktop.png";
import Checklist_boy from '../../assets/Checklist_boy.png';
import { Link, useNavigate } from "react-router-dom";
import UseAuthContext from "../../hooks/UseAuthContext";

const Cadastro = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConf, setSenhaConf] = useState("")
    const [error, setError] = useState("")

    const { signup } = UseAuthContext();
    const navigate = useNavigate();

    const handleCadastro = () => {
        if (!email || !senha || !senhaConf) {
            setError("Preencha todos os campos")
            return
        } else if (senha !== senhaConf){
            setError("As senhas não coincidem")
            return
        }

        const res = signup(email, senha)

        if (res){
            setError(res)
            return
        }

        alert("Usuário cadastrado com sucesso")
        navigate("/")
    }

    return(
        <div className="flex">
            <div className="hidden lg:flex lg:flex-col justify-center items-center p-4 w-2/4">
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
                <CardAcesso text="Cadastro">
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
                    <Input 
                        type="password"
                        placeholder={"Confirme sua Senha"}
                        value={senhaConf}
                        onChange={(e) => [setSenhaConf(e.target.value), setError("")]}
                    />
                    { error && <p className="text-red-700 p-3">{error}</p>}
                    <Button text="Entrar" onClick={handleCadastro}/>
                    <span className="text-gray-400 text-center">
                        <p>Já tem uma conta? <strong><Link to="/">Entrar</Link></strong></p>
                    </span>
                </CardAcesso>
            </div>
        </div>
    )
};

export default Cadastro;