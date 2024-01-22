import axios, { AxiosError, AxiosResponse } from "axios";

export async function GET() {
    console.log(process.env.GET_EVENT_TYPES)
    const res = await axios.get(process.env.GET_EVENT_TYPES!)
        .then((res: AxiosResponse) => {
            return res.data
        })
        .catch((err: AxiosError) => err)
    return Response.json(res)
}