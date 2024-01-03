import PocketBase from 'pocketbase';
import { createContext , useEffect, useState} from "react";

export const AuthContext = createContext({});
const url ='https://to-do.pockethost.io/'

const pb = new PocketBase(url).autoCancellation(false);

export const AuthProvider = ({ children }) => {
    const [user , setUser] = useState();

    useEffect(() => {
        const userAuthData = JSON.parse(localStorage.getItem('authData'));
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
        
        try {
            const authData = await pb.collection('users').authWithPassword(
                email,
                password,
            );
            localStorage.setItem('authData', JSON.stringify(authData));
            return authData
        } catch (error) {
            console.error("Erro durante a autenticação:", error);
            return "Erro ao fazer Login";
        }


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
    
    const signup = async (email, password, senhaConf, uuid, username) => {
        const recordTable = await pb.collection('users').getOne('defalt-users-id');
        const dataTable = recordTable.tasks
        // example create data
        const dataUser = {
            "id": uuid,
            "username": username,
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": senhaConf,
            "tasks": dataTable,
        };
        const recordUser = await pb.collection('users').create(dataUser)
        return recordUser ? true : false;

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

    const deleteUser = async () => {
        try {
            const authDataString = localStorage.getItem('authData')
            const authData = JSON.parse(authDataString)
            const userId = authData.record.id

            await pb.collection('users').delete(userId)
        } catch (error) {
            console.error("Erro durante a exclusão:", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout, deleteUser }}>
            {children}
        </AuthContext.Provider>
    )
}