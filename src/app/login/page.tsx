'use client'
import { FormControl, FormLabel, Stack, Input, Heading, FormErrorMessage, Button, Text, useDisclosure } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import Cookies from "universal-cookie";
import { Link } from "@chakra-ui/next-js";
import LoginResponseModal from "./responseModal";
import { redirect } from "next/navigation";
import LoginLoading from "./loading";

export default function Login() {
    const cookies = new Cookies(null, { path: '/' })

    const [isSubmitting, setSubmitting] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [token, setToken] = useState()
    const [response, setResponse] = useState<undefined | validAuthResponse>()
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        setLoading(true)
        setToken(cookies.get('token'))
        setLoading(false)
        if (token) redirect('/')
    }, [token])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
        }),
        onSubmit: async (values) => {
            setSubmitting(true)
            await axios.post('http://localhost:1010/auth/login', values)
                .then((res: AxiosResponse) => {
                    console.log(res)
                    setResponse(res.data)
                    cookies.set('token', res.data.data.token)
                    setToken(res.data.data.token)
                    onOpen()
                    setSubmitting(false)
                })
                .then(async () => await setTimeout(() => redirect('/register'), 5000))
                .catch((err: AxiosError) => {
                    setResponse((err.response?.data) as validAuthResponse)
                    onOpen()
                    setSubmitting(false)
                })
        }
    })

    return (
        <>{isLoading
            ? <LoginLoading />
            : token
                ? <div>
                    <p> You are logged in.</p>
                    {/* <Button colorScheme="blue" onClick={logout} isLoading={isSubmitting}>Logout</Button> */}
                </div>
                :
                <Stack maxW={'500px'} gap={5} p={'2rem'} align={'center'} m={'auto'} borderRadius={'10px'} borderColor={'gray.300'} borderWidth={{ base: 0, sm: 1 }}>
                    <Heading>Login</Heading>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                        <Stack gap={5} >
                            <FormControl isRequired isInvalid={Boolean(formik.touched.email && formik.errors.email)}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    bg={'white'}
                                />
                                <FormErrorMessage> {formik.errors.email} </FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={Boolean(formik.touched.password && formik.errors.password)}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    bg={'white'}
                                />
                                <FormErrorMessage> {formik.errors.password} </FormErrorMessage>
                            </FormControl>

                            <Button
                                mt={'1rem'}
                                type="submit"
                                colorScheme="blue"
                                isLoading={isSubmitting}
                            >
                                Login
                            </Button>
                            <Text>Don't have an account? <Link href={'/register'} color={'blue'}>Create one</Link></Text>
                        </Stack>
                    </form>
                </Stack>
        }
            <LoginResponseModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} response={response} />
        </>
    )
}
