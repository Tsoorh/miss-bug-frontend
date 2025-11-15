// import { utilService } from "./util.service.js";
import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL = "http://localhost:3030/api/bug/";

export const bugService = {
  query,
  getById,
  save,
  remove,
  getBugsPDF
};

function query(filterBy = {}) {
  filterBy = { ...filterBy };
  return axios
    .get(BASE_URL)
    .then((res) => res.data)
    .then((bugs) => {
      if (!filterBy.txt) filterBy.txt = "";
      if (!filterBy.severity) filterBy.severity = Infinity;
      if (!filterBy.createdAt) filterBy.createdAt = -Infinity;
      const regExp = new RegExp(filterBy.txt, "i");
      return bugs.filter(
        (car) =>
          regExp.test(car.title) &&
          car.severity <= filterBy.severity &&
          car.createdAt >= filterBy.createdAt
      );
    });
}
async function getById(bugId) {
  return await axios.get(BASE_URL + bugId).then((res) => res.data);
}
function remove(bugId) {
  return axios.delete(BASE_URL + bugId );
}
async function save(bug) {
  if (bug._id) return await axios.put(BASE_URL + "save", { params: bug }).then((res) => res.data);
  else return await axios.post(BASE_URL + "save", { params: bug }).then((res) => res.data);
}
async function getBugsPDF() {
  const response =  await axios.get(BASE_URL + "pdf" ,{responseType:'blob'});
  //create url download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  
  //יצירת אלמנט קישור a והורדה אוטומטית
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'bugs.pdf');// במקום ניווט הורדת קובץ בשם bugs.pdf
  document.body.appendChild(link);// הוסף את a כילד האחרון של body
  link.click();
  
  //ניקוי הזיכרון 
  link.remove();
  window.URL.revokeObjectURL(url);
  
  return response.data;
}



