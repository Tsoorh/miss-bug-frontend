import Axios from "axios";

const axios = Axios.create({
    withCredentials:true
})

const BASE_URL = "http://localhost:3030/api/auth/"

async function login(username,password) {
    try {
        const res = await axios.post(BASE_URL+"login",{username:username,password:password})    
        sessionStorage.setItem('loggedinUser',JSON.stringify(res.data));
        console.log("🚀 ~ login ~ res.data:", res.data)
        return res.data
    } catch (err) {
        console.log("Can't login",err);
        return err;
    }
}
async function signup(credentials) {
    try {
        const res = await axios.post(BASE_URL+ "login",credentials)
        sessionStorage.setItem('loggedinUser',res.data);
        console.log("🚀 ~ signup ~ res.data:", res.data)
        return res.data
    } catch (err) {
        console.log("Can't login",err);
        return err;
    }
}

async function logout() {
    try{
        const res = await axios.post(BASE_URL+"logout")
        sessionStorage.removeItem('loggedinUser');
        console.log("🚀 ~ logout ~ res.data:", res.data)
        return res.data
    }catch(err){
        console.log("Can't login",err);
        return err;
    }
}

function getLoggedinUser() {
    return sessionStorage.getItem('loggedinUser');
}

export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser
}
