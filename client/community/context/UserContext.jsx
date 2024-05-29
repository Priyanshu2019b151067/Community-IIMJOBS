import { createContext,useEffect,useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState(null);

   // Axios interceptor setup
   useEffect(() => {
    const interceptor = axios.interceptors.request.use(
        (config) => {
            const token = Cookies.get('jwt');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return () => {
        axios.interceptors.request.eject(interceptor);
    };
    }, []);

    const fetchUserProfile = async () => {
        try {
            const token  = Cookies.get('jwt');
            console.log(token);
            const response = await axios.get('http://localhost:3000/user/profile');
            console.log(response);
            //setUser(response.data);
        } catch (error) {
            console.error('Error fetching profile', error);
        }
    };

    useEffect(()=>{
        fetchUserProfile();
    },[])
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}