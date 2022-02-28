

export const getSessionParam = (param) =>{
    if(!sessionStorage.getItem("login")){
        return null
    }

    let login = JSON.parse(sessionStorage.getItem("login"))
    return login[param]
}