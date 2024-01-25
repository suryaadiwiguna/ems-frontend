'use client'
import { FormControl, FormLabel, Stack, Input, Heading, FormErrorMessage, Button, Spinner, Text, RadioGroup, Radio, Flex, useDisclosure, InputRightElement, InputGroup } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import Cookies from "universal-cookie";
import { Link } from "@chakra-ui/next-js";
import ResponseModal from "./responseModal";
import { LuX } from "react-icons/lu";

// const dummySuccessResponse = {
//     isSuccess: true,
//     code: 1,
//     data: [{
//         some: "object",
//         will: "be sent here"
//     }],
//     msg: "Account created successfully"
// }

// const dummyFailedResponse = {
//     isSuccess: false,
//     code: 0,
//     data: null,
//     msg: "The email has been used by an existing account."
// }

export default function Register() {
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
    }, [token])

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            retypePassword: '',
            role: '',
            city: '',
            organizationName: '',
            referrerCode: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            retypePassword: Yup.string()
                .required("Retype your password")
                .oneOf([Yup.ref('password')], "Passwords do not match.")
                .min(6, "Password must be at least 6 characters"),
            firstName: Yup.string()
                .required('First Name is required')
                .min(2, "Must be at least 2 characters"),
            lastName: Yup.string()
                .optional(),
            role: Yup.string()
                .required('Please select one of the options'),
            city: Yup.string()
                .required("City is required"),
            organziationName: Yup.string(),
            referrerCode: Yup.string()

        }),
        onSubmit: (values) => {
            setSubmitting(true)
            axios.post('http://localhost:1010/auth/register', values)
                .then((res: AxiosResponse) => {
                    console.log(res)
                    setResponse(res.data)
                    onOpen()
                    setSubmitting(false)
                })
                .catch((err: AxiosError) => {
                    // alert(`Error ${JSON.stringify(err)}`)
                    // console.log(err.response?.data)
                    setResponse((err.response?.data) as validAuthResponse)
                    onOpen()
                    setSubmitting(false)

                })
        }
    })

    function logout() {
        cookies.remove('token')
        // setSubmitting(false)
        setToken(undefined)
    }

    // console.log(formik.values.role)

    return (
        <>{isLoading
            ? null
            : token
                ? <div>
                    <p> You are logged in.</p>
                    <Button colorScheme="blue" onClick={logout} isLoading={isSubmitting}>Logout</Button>
                </div>
                :
                <Stack maxW={'650px'} gap={5} p={'2rem'} align={'center'} m={'auto'} borderRadius={'10px'} borderColor={'gray.300'} borderWidth={{ base: 0, sm: 1 }}>
                    <Heading mb={'2rem'} textAlign={'center'}>Create Account</Heading>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack gap={5} >

                            <FormControl isRequired isInvalid={Boolean(formik.touched.firstName && formik.errors.firstName)}>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                    bg={'white'}
                                />
                                <FormErrorMessage> {formik.errors.firstName} </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(formik.touched.lastName && formik.errors.lastName)}>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                    bg={'white'}
                                />
                                <FormErrorMessage> {formik.errors.lastName} </FormErrorMessage>
                            </FormControl>

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

                            <FormControl isRequired isInvalid={Boolean(formik.touched.retypePassword && formik.errors.retypePassword)}>
                                <FormLabel htmlFor="retypePassword">Retype Password</FormLabel>
                                <Input
                                    id="retypePassword"
                                    name="retypePassword"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.retypePassword}
                                    bg={'white'}
                                />
                                <FormErrorMessage> {formik.errors.retypePassword} </FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={Boolean(formik.touched.role && formik.errors.role)}>
                                <FormLabel htmlFor="role">Are you an organizer?</FormLabel>
                                <RadioGroup onChange={(e) => formik.setFieldValue('role', e)} value={formik.values.role}>
                                    <Radio value="participant">No. I am here to browse or attend events.</Radio>
                                    <Radio value="organizer">Yes. I want to organize events.</Radio>
                                </RadioGroup>
                            </FormControl>

                            {formik.values.role === "organizer"
                                ?
                                <FormControl isRequired={formik.values.role === "organizer" ? true : false} isInvalid={Boolean(formik.touched.organizationName && formik.errors.organizationName)}>
                                    <FormLabel htmlFor="organizationName">Organization Name</FormLabel>
                                    <Input
                                        id="organizationName"
                                        name="organizationName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.organizationName}
                                        bg={'white'}
                                    />
                                    <FormErrorMessage> {formik.errors.organizationName} </FormErrorMessage>
                                </FormControl>
                                : null}

                            <FormControl isRequired isInvalid={Boolean(formik.touched.city && formik.errors.city)}>
                                <FormLabel htmlFor="city">Where do you currently live?</FormLabel>
                                <Flex gap={3} align={'center'}>
                                    <Text>City:</Text>
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city}
                                        bg={'white'}
                                    />
                                </Flex>
                                <FormErrorMessage> {formik.errors.city} </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(formik.touched.referrerCode && formik.errors.referrerCode)}>
                                <FormLabel htmlFor="referrerCode">Referral Code</FormLabel>
                                <InputGroup>
                                    <Input
                                        id="referrerCode"
                                        name="referrerCode"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.referrerCode}
                                        bg={'white'}
                                    />
                                    <InputRightElement onClick={() => formik.setFieldValue('referrerCode', '')}>
                                        {formik.values.referrerCode ? <LuX /> : null}
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage> {formik.errors.referrerCode} </FormErrorMessage>
                            </FormControl>

                            <Button
                                mt={'1rem'}
                                type="submit"
                                colorScheme="blue"
                                isLoading={isSubmitting}
                            >
                                Register
                            </Button>

                            <Text>Already have an account? <Link href={'/login'} color={'blue'}>Login.</Link></Text>
                        </Stack>
                    </form>
                </Stack>
        }
            {/* <Button onClick={onOpen}>Open Modal</Button> */}
            <ResponseModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} response={response} />
        </>
    )
}
