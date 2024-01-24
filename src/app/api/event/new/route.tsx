import axios, { AxiosError, AxiosResponse } from "axios";


export async function POST(req: Request) {
    console.log("headers => " + JSON.stringify(req.headers), "Body => " + JSON.stringify(req.body))
    const res = await axios.post(process.env.NEW_EVENT!, req)
        .then((res: AxiosResponse) => res.data)
        .catch((err: AxiosError) => err)
    return Response.json(res)
}