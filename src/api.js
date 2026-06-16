export const Scan_Backend_URL = 'http://localhost:5000/api'

export async function uploadFileToBackend(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`${Scan_Backend_URL}/upload`, {
            method: 'POST',
            body: formData,
            credentials: 'include' // Ez küldi el a sütit (X-Auth-token)
        });

        // 1. Ha nem vagyunk bejelentkezve, vagy lejárt a munkamenet (401)
        if (res.status === 401) {
            return { error: "Kérlek, jelentkezz be a szolgáltatás használatáért!" };
        }

        // 2. Ha nincs jogosultság (403)
        if (res.status === 403) {
            return { error: "Nincs jogosultságod a művelet végrehajtásához!" };
        }

        // 3. Bármilyen egyéb szerveroldali hiba (pl. 500)
        if (!res.ok) {
            return { error: `Szerverhiba történt a feltöltés során! (Kód: ${res.status})` };
        }

        // Ha minden sikeres (200 OK), beolvassuk a választ
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        return data;

    } catch (err) {
        console.error("Feltöltési hiba: ", err);
        return { error: "Hálózati hiba történt, a szerver nem elérhető!" };
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
    try {
        const res = await fetch(`${Scan_Backend_URL}/auth/whoami`, {
            method: 'GET',
            credentials: 'include'
        });

        // Ha a szerver hibát dobott (pl. 401 Unauthorized), nem próbálunk meg JSON-t olvasni feleslegesen
        if (!res.ok) {
            return { error: "Nem autorizált vagy lejárt munkamenet." };
        }

        // Csak akkor olvassuk be a JSON-t, ha a válasz státusza OK (200-299)
        const data = await res.json();
        return data;
    } catch (err) {
        // Hálózati hiba esetén (ha a szerver nem is elérhető) ezt adjuk vissza
        return { error: "A szerver nem elérhető." };
    }
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

export async  function history(){
    try {
        const res = await fetch(`${Scan_Backend_URL}/auth/history`,{
            method:'GET',
            credentials: 'include'
        })
        if(!res.ok){
            const data = await res.json()
            return {error:data?.error}
        }
        const data = await res.json()
        return data
    } catch (err) {
        return {error : "Nem sikerült lekérni az adatokat"}
    }
}

export async function updateUserName(usernameData) { // Kis 'u' és nagy 'N' a névben
    try {
        const res = await fetch(`${Scan_Backend_URL}/auth/updateUserName`, {
            method: 'PUT',
            credentials: 'include', // Itt javítottuk korábban a kettőspontot
            headers: {
                'Content-Type': 'application/json' // Jelezzük a backendnek, hogy JSON-t küldünk
            },
            body: JSON.stringify(usernameData) // Ez küldi el a { Username: "..." } objektumot
        });

        if (!res.ok) {
            const data = await res.json();
            return { error: data?.error || 'Hiba történt a frissítés során.' };
        }

        const data = await res.json();
        return data;
    } catch (err) {
        return { error: 'Nem sikerült megváltoztatni a felhasználónevet' };
    }
}


export async function UploadProfilePicture(file) {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch(`${Scan_Backend_URL}/auth/uploadPfp`,{
            method :'POST',
            credentials:'include',
            body: formData
        });
        if(!res.ok){
            const data = await res.json()
            return {error: data?.error || 'Hiba történt a kép feltöltése során'} 
        }
        const data = await res.json()
        return data ;


    } catch (ex) {
        return {error : 'hálózati hiba történt '}
    }
}