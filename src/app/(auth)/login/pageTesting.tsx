import { verifyToken } from "@/lib/(auth)/auth.lib"

export default async function Page() {

    const isAuthorized: validAuthResponse = await verifyToken()
    console.log(isAuthorized)
    if (isAuthorized.code === -1) return (
        <>You are not authorized.</>
    )

    if (isAuthorized.code) return (
        <>
        </>
    )
}