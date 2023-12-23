import PocketBase from 'pocketbase';
import { createContext , useEffect, useState} from "react";

export const AuthContext = createContext({});
const url ='https://to-do.pockethost.io/'

const pb = new PocketBase(url);

export const AuthProvider = ({ children }) => {
    const [user , setUser] = useState();

    useEffect(() => {
        const userAuthData = JSON.parse(localStorage.getItem('authData'));
        
        console.log(userAuthData)
        console.log(pb.authStore)

        setUser(userAuthData)

        // const userToken = localStorage.getItem('user_token');
        // const usersStorage = localStorage.getItem('user_db');

        // if (userToken && usersStorage){
        //     const hasUser = JSON.parse(usersStorage)?.filter(
        //         (user) => user.email === JSON.parse(userToken).email
        //     );

        //     if (hasUser) setUser(hasUser[0]);
        // }
    }, []);

    const signin = async (email, password) => {
        
        const authData = await pb.collection('users').authWithPassword(
            email,
            password,
        );
        localStorage.setItem('authData', JSON.stringify(authData));
        return authData

        // const usersStorage = JSON.parse(localStorage.getItem('user_db'));

        // const hasUser = usersStorage?.filter((user) => user.email === email);

        // if(hasUser?.length) {
        //     if(hasUser[0].email === email && hasUser[0].password === password) {
        //         const token = Math.random().toString(36).substring(2);
        //         localStorage.setItem('user_token', JSON.stringify({ email, token }));
        //         setUser( {email, password })
        //         return
        //     } else {
        //         return "E-mail ou senha incorretos"
        //     }
        // } else {
        //     return "Usuário não cadastrado"
        // }
    }

    const signup = async (email, password, senhaConf) => {
        // example create data
        const data = {
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": senhaConf,
        };

        const record = await pb.collection('users').create(data);
        return record ? true : false;

        // const usersStorage = JSON.parse(localStorage.getItem('user_db'));

        // const hasUser = usersStorage?.filter((user) => user.email === email);

        // if (hasUser?.length){
        //     return "Já existe uma conta com este E-mail"
        // }

        // let newUser;

        // if (usersStorage) {
        //     newUser = [...usersStorage, { email, password }];
        // } else {
        //     newUser = [{ email, password }];
        // }

        // localStorage.setItem('user_db', JSON.stringify(newUser));

        // return;
    };

    const signout = () => {
        pb.authStore.clear()
        // setUser(null)
        localStorage.removeItem('authData')

    };

    return (
        <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }}>
            {children}
        </AuthContext.Provider>
    )
}