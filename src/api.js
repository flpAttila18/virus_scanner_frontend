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
        body: JSON.stringify({username ,psw , email}),

    })
     const data = await res.json()

     if(data.error){
        return data
     }

     return data

}