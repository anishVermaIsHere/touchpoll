
export function getAuthStorage(){
   return  JSON.parse(localStorage.getItem("user-info") || '{}');
}

export function clearAuthStorage(){
    localStorage.removeItem("user-info");
}

export function setAuthStorage(key, value={}){
    localStorage.setItem(key, JSON.stringify(value));
}