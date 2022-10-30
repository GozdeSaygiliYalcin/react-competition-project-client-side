import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../../config/AuthService';
import axios from 'axios';
const initialStateAuth ={
    token: '',
    isAuthenticated: false,
    isLoading: false,
    isRegisterLoading: false,
    auth: []
}
export const fetchDoLogin = createAsyncThunk(
    'auth/fetchDoLogin',
    async (payload)=>{     
        try {
         const result=  await fetch(AuthService.login,{
         method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'br;q=1.0, gzip;q=0.8, *;q=0.1',                
            },
            body: JSON.stringify({
                username: payload.username,
                password: payload.password
            })
       })
        .then(p=>p.json()) 
        .then(p=>{ 
            return p;
        })       
        .catch(err=>console.log(err));
        return result;
        } catch (error) {
            
        }
     
    }
);

export const fetchDoRegister = createAsyncThunk(
    'auth/fetchDoRegister',
    async (payload)=>{
        try {
         await axios.post(AuthService.register,{
                username: payload.username,
                password: payload.password,
                email: payload.email
            })          
            .catch(err=>console.log(err));
        } catch (error) {
        console.log('register işlemi hata oluştu...: ', error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers:{
        setLogin: (state)=>{
            state.isAuthenticated = true;
        },
        setLogout: (state)=>{
            state.isAuthenticated = false;
        },
    },
    extraReducers:(build) =>{
        build.addCase(fetchDoLogin.fulfilled,(state,action)=>{                  
            /**
             * Eğer responsecode tanımsız gelmiş ise, bir hata oluşmuştur
             */
            if(action.payload.responsecode === undefined){
                state.isAuthenticated = false;
                state.isLoading = false;
                alert("Hata...: "+ action.payload.fields[0]);
            }else{
                /**
                 * 200 ise token doğrudur.
                 * 400 ise token GEÇERSİZDİR.
                 */
                if(action.payload.responsecode === 200){
                    state.isAuthenticated = true;
                    state.isLoading = false;
                    state.token = action.payload.token;
                }else{
                    state.isAuthenticated = false;
                    state.isLoading = false;
                    alert("Kullanıcı adı ya da şifre hatalıdır.");
                }
            }       
           
        });
        build.addCase(fetchDoLogin.rejected,(state,action)=>{
            state.token = '';
            state.isAuthenticated = false;
            console.log('fetchDoLogin rejected: ', action.payload);
        });
        build.addCase(fetchDoRegister.pending,(state)=>{
            state.isRegisterLoading = true;
        });
        build.addCase(fetchDoRegister.fulfilled,(state)=>{
            state.isRegisterLoading = false;            
        });
    }
});

export const 
{
    setLogin,
    setLogout
} = authSlice.actions;

export default authSlice.reducer;