'use client'

import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack } from "@chakra-ui/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from 'yup'

export default function CreateEvent() {
    const [isLoading, setLoading] = useState(true)
    const [eventTypes, setEventType] = useState<undefined | any[]>(undefined)

    async function getEnumData() {
        await axios.get('/api/event/event-types')
            .then((res: AxiosResponse) => {
                setEventType(res.data)
            })
            .catch((err: AxiosError) => {
                alert(err)
            })
    }

    useEffect(() => {
        getEnumData()
        setLoading(false)
    }, [])

    const formik = useFormik({
        initialValues: {
            organizerID: '',
            title: '',
            type: '',
            eventStartDate: '',
            eventEndDate: '',
            eventStartTime: '',
            eventEndTime: '',
            description: '',
            maxParticipant: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(5, "Must be at least 5 characters")
                .max(100, "Max 100 characters")
                .required('Title is required'),
            type: Yup.string()
                .required("Event type is required"),
            eventStartDate: Yup.date()
                .required("Event start date is required"),
            eventEndDate: Yup.date()
                .required("End date is required"),
            eventStartTime: Yup.date()
                .required("Start time is required"),
            eventEndTime: Yup.date()
                .required("End time is required"),
            description: Yup.string()
                .min(150, "Must be at least 150 characters"),
            maxParticipant: Yup.number()
                .positive()
                .moreThan(0, "Mut be greater than 0")
                .required("Max participant is required")
        }),
        onSubmit: (values) => {
            //do something
        }
    })
    console.log(formik.values.type)
    return (
        <>
            <Heading mb={'4rem'}>Create Event</Heading>
            <form onSubmit={formik.handleSubmit}>
                <Stack gap={3}>
                    <FormControl isRequired isInvalid={Boolean(formik.touched.title && formik.errors.title)}>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                            id="title"
                            name="title"
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            bg={'white'}
                        />
                        <FormErrorMessage>{formik.errors.title} </FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={Boolean(formik.touched.type && formik.errors.type)}>
                        <FormLabel htmlFor="type">Event Type</FormLabel>
                        <Select
                            id="type"
                            name="type"
                            placeholder="Select event type"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.type}
                            bg={'white'}
                            textTransform={'capitalize'}
                        >
                            {eventTypes
                                ? eventTypes.map((type, index) =>
                                    <option value={type} key={index}> {type.replace('_', ' ')} </option>
                                )
                                : null}

                        </Select>
                        <FormErrorMessage>{formik.errors.type} </FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={Boolean(formik.touched.eventStartDate && formik.errors.eventStartDate)}>
                        <FormLabel htmlFor="type">Event Start Date</FormLabel>
                        <Input
                            id="eventStartDate"
                            name="eventStartDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.eventStartDate}
                            bg={'white'}
                        >
                        </Input>
                        <FormErrorMessage>{formik.errors.type} </FormErrorMessage>
                    </FormControl>
                </Stack>
            </form>
        </>
    )
}
