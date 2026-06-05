const Scan_Backend_URL = 'http://localhost:5000/api'

export async function uploadFileToBackend(file) {
    try {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch(`${Scan_Backend_URL}/upload`,{
            method:'POST',
            body:formData,
            credentials:'include'
        });
        const text = await res.text();
        const data = text  ? JSON.parse(text) :{};

        if(!res.ok){
            return {error:data.error || `szerver hiba :${res.status}`}
        }
        return data
    } catch (err) {
        console.error("feltöltési hiba : ", err)
        return{error: "hálózati hiba történt a feltöltés során"}
    }
}


export async function register(username , psw , email) {
    const res = await fetch(`${Scan_Backend_URL}/auth/register`, {
        method :'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({username ,password:psw, email:email}),

    })
     const data = await res.json()

     if(data.error){
        return data
     }

     return data

}


export async function  login(email , psw) {
    const res = await fetch (`${Scan_Backend_URL}/auth/login`, {
        method:'POST',

        headers: {
            'content-type':'application/json'
        },
        credentials:'include',
        body: JSON.stringify({email: email, password: psw})
    })
    const data = await res.json()

    if(data.error){
        return { error: data.error || "Hibás bejelentkezési adatok." };
    }
    return data
}

export async function whoami() {
    const res = await fetch(`${Scan_Backend_URL}/auth/whoami`,{
        method:'GET',
        credentials:'include'
    })
    if(!res.ok){
        const data = await res.json()
        return {error:data?.error}
    }
    const data = await res.json()
    return data
}


export async function logout() { // <-- Figyelj, hogy pontosan 'logout' legyen!
    try {
        const res = await fetch(`${Scan_Backend_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            // ... a többi kódod ...
        });
        return await res.json();
    } catch (err) {
        return { error: "Nem sikerült a kijelentkezés." };
    }
}