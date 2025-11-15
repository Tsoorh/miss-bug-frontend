import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL = "http://localhost:3030/api/user/";

export function query() {
  return axios.get(BASE_URL).then((res) =>{ 
    console.log("res.data",res.data)
    return res.data});
}

export function getByID(userId) {
  return axios.get(BASE_URL + userId).then((res) => res.data);
}

export function save(user){
    if(user._id) return axios.put(BASE_URL + user._id, user).then(res => res.data)
    return axios.post(BASE_URL,user).then(res=>res.data);
}

export function remove(userId){
    return axios.delete(BASE_URL + userId).then((res) => res.data);
}

export const userService ={
    query,
    getByID,
    save,
    remove
}