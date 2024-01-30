import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function verifyToken() {
    // console.log(cookies().get('token')?.value)
    return await axios.post('http://localhost:1010/auth/login', {}, {
        headers: {
            "Authorization": `Bearer ${cookies().get('token')?.value}`
        }
    })
        .then((res: AxiosResponse) => {
            return res.data
        })
        .catch((err: AxiosError) => err.response?.data)
}

