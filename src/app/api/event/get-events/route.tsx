import axios, { AxiosError, AxiosResponse } from "axios";

export async function GET(req: Request) {

    const res = await axios.get(process.env.GET_EVENTS!)
        .then((res: AxiosResponse) => res.data)
        .catch((err: AxiosError) => err)
    return Response.json(res)
}