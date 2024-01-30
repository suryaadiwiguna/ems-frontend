"use client"
import { Button, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Cookies from "universal-cookie";

export default function UnauthorizedPage() {
    const cookies = new Cookies(null, { path: '/' })

    cookies.remove('token')

    return (
        <>
            <Stack gap={4}>
                <p>Expired or invalid credentials.</p>
                <Link href={'/login'} style={{ width: 'fit-content' }}><Button width={'fit-content'} colorScheme="blue" >Relogin</Button></Link>
            </Stack>
        </>
    )
}