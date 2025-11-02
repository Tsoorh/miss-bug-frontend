// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
import Cookies from "js-cookie";

// const STORAGE_KEY = 'bugDB'

export const bugLocalService = {
  // query,
  // getById,
  // save,
  // remove,
  getDefaultFilter,
  getVisitedBugsArr,
};

// function query() {
//     return storageService.query(STORAGE_KEY)
// }
// function getById(bugId) {
//     return storageService.get(STORAGE_KEY, bugId)
// }
// function remove(bugId) {
//     return storageService.remove(STORAGE_KEY, bugId)
// }
// function save(bug) {
//     if (bug._id) {
//         return storageService.put(STORAGE_KEY, bug)
//     } else {
//         return storageService.post(STORAGE_KEY, bug)
//     }
// }
function getDefaultFilter() {
  return {
    txt: "",
    severity: 50,
  };
}

function getVisitedBugsArr() {
  const rawCook = Cookies.get("visitedBugs");
  if (!rawCook) return [];
  const decodedCook = decodeURIComponent(rawCook);
  const jsonStr = decodedCook.startsWith("j:")
    ? decodedCook.substring(2)
    : decodedCook;
  const finalArr = JSON.parse(jsonStr);
  return finalArr;
}
