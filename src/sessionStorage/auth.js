export const loginUser = (user) =>{
    sessionStorage.setItem("user",JSON.stringify(user));
}

export const logoutUser = () =>{
    sessionStorage.removeItem("user");
}

export const isLoggedIn = () =>{
    return sessionStorage.getItem("user") !== null;
}

export const getUser = () =>{
    const userString = sessionStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
}