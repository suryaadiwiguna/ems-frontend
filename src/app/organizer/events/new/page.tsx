'use client'

import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack, Flex, Text, Textarea, Button, RadioGroup, Radio } from "@chakra-ui/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { LuClock7, LuClock4, LuCalendarDays } from "react-icons/lu"
import { redirect } from "next/navigation"
import Cookies from "universal-cookie"


export default function CreateEvent() {
    const [eventTypes, setEventType] = useState<undefined | any[]>(undefined)
    const [isSubmitting, setSubmitting] = useState(false)
    const [price, setPrice] = useState('paid')
    const cookies = new Cookies(null, { path: '/' })

    useEffect(() => {
        getEnumData()
    }, [])

    useEffect(() => {
        if (price === "free") formik.setFieldValue('ticketPrice', 0)
        if (price === "paid") formik.setFieldValue('ticketPrice', '')
    }, [price])

    async function getEnumData() {
        await axios.get('/api/event/event-types')
            .then((res: AxiosResponse) => {
                setEventType(res.data)
            })
            .catch((err: AxiosError) => {
                alert(JSON.stringify(err))
            })
    }

    const formik = useFormik({
        initialValues: {
            organizerID: 'wovz5x01o4',
            title: '',
            type: '',
            eventStartDate: new Date(),
            eventEndDate: new Date(),
            eventStartTime: new Date(),
            eventEndTime: new Date(),
            description: '',
            maxParticipants: '',
            ticketPrice: 0
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(5, "Must be at least 5 characters")
                .max(100, "Max 100 characters")
                .required('Title is required'),
            type: Yup.string()
                .required("Event type is required"),
            eventStartDate: Yup.date()
                .required("Event start date is required")
                .min(new Date(), "Start date must be tomorrow or later"),
            eventEndDate: Yup.date()
                .required("End date is required")
                .min(Yup.ref('eventStartDate'), "End date can't be before Start Date"),
            eventStartTime: Yup.date()
                .required("Start time is required"),
            eventEndTime: Yup.date()
                .required("End time is required")
                .min(Yup.ref('eventStartTime'), "End time must be after Start Time"),
            description: Yup.string()
                .required("Description is required")
                .min(150, "Must be at least 150 characters"),
            maxParticipants: Yup.number()
                .positive()
                .moreThan(3, "Must be more than 3 participants")
                .required("Max participant is required"),
            ticketPrice: Yup.number()
                .positive()
                .moreThan(-1, "Must be above 0")
                .required("Price is required")
        }),
        onSubmit: (values) => {
            // console.log(values)
            setSubmitting(true)
            axios.post('http://localhost:1010/event/new-event', values,
                { headers: { "Authorization": `Bearer ${cookies.get('token')}` } })
                .then((res: AxiosResponse) => {
                    setSubmitting(false)
                    console.log(res)
                })
                .then(() => redirect('/organizer/events'))
                .catch((err: AxiosError) => {
                    // alert(JSON.stringify(err.response?.data))
                    setSubmitting(false)
                })
        }
    })
    // console.log(`Event Start Date:  ${formik.values.eventStartDate}
    // Event End Date: ${formik.values.eventEndDate}
    // Event Start Time: ${formik.values.eventStartTime}
    // Event End Time: ${formik.values.eventEndTime}
    // `)
    console.log(formik.values.ticketPrice)
    return (
        <>
            <Heading mb={'2rem'}>Create Event</Heading>
            <form onSubmit={formik.handleSubmit}>
                <Stack gap={5} mb={'5rem'}>
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
                    <Stack>
                        <Text fontWeight={500}>Event Schedule</Text>
                        <Flex wrap={{ base: 'wrap', md: 'nowrap' }} pl={'1rem'}>

                            <FormControl isRequired isInvalid={Boolean(formik.touched.eventStartDate && formik.errors.eventStartDate)}>
                                <FormLabel htmlFor="eventStartDate" fontWeight={400} fontSize={'small'}>Event Start Date</FormLabel>
                                <DatePicker
                                    showIcon
                                    icon={<LuCalendarDays />}
                                    id="eventStartDate"
                                    name="eventStartDate"
                                    selected={formik.values.eventStartDate}
                                    onChange={(e): void => {
                                        formik.setFieldValue('eventStartDate', e)
                                        formik.setFieldValue('eventStartTime', e)
                                        formik.setFieldValue('eventEndTime', e)
                                    }}
                                    onBlur={formik.handleBlur}
                                    minDate={new Date()}

                                />
                                <FormErrorMessage>{String(formik.errors.eventStartDate)} </FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={Boolean(formik.touched.eventEndDate && formik.errors.eventEndDate)}>
                                <FormLabel htmlFor="eventEndDate" fontWeight={400} fontSize={'small'}>Event End Date</FormLabel>
                                <DatePicker
                                    showIcon
                                    icon={<LuCalendarDays />}
                                    id="eventEndDate"
                                    name="eventEndDate"
                                    selected={formik.values.eventEndDate}
                                    onChange={(e) => formik.setFieldValue('eventEndDate', e)}
                                    onBlur={formik.handleBlur}
                                    minDate={new Date()}
                                />
                                <FormErrorMessage>{String(formik.errors.eventEndDate)} </FormErrorMessage>
                            </FormControl>
                        </Flex>

                        <Flex wrap={{ base: 'wrap', md: 'nowrap' }} pl={'1rem'}>

                            <FormControl isRequired isInvalid={Boolean(formik.touched.eventStartTime && formik.errors.eventStartTime)}>
                                <FormLabel htmlFor="eventStartDate" fontWeight={400} fontSize={'small'}>Session Start Time</FormLabel>
                                <DatePicker
                                    showIcon
                                    icon={<LuClock4 />}
                                    id="eventStartTime"
                                    name="eventStartTime"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat={'hh:mm aa'}
                                    selected={formik.values.eventStartTime}
                                    onChange={(e) => formik.setFieldValue('eventStartTime', e)}
                                    onBlur={formik.handleBlur}
                                    minDate={new Date()}

                                />
                                <FormErrorMessage>{String(formik.errors.eventStartDate)} </FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={Boolean(formik.touched.eventEndTime && formik.errors.eventEndTime)}>
                                <FormLabel htmlFor="eventEndTime" fontWeight={400} fontSize={'small'}>Session End Time</FormLabel>
                                <DatePicker
                                    showIcon
                                    icon={<LuClock7 />}
                                    id="eventEndTime"
                                    name="eventEndTime"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat={'hh:mm aa'}
                                    selected={formik.values.eventEndTime}
                                    onChange={(e) => formik.setFieldValue('eventEndTime', e)}
                                    onBlur={formik.handleBlur}
                                    minDate={new Date()}
                                />
                                <FormErrorMessage>{String(formik.errors.eventEndTime)} </FormErrorMessage>
                            </FormControl>
                        </Flex>
                    </Stack>

                    <FormControl isRequired isInvalid={Boolean(formik.touched.maxParticipants && formik.errors.maxParticipants)}>
                        <FormLabel htmlFor="maxParticipants">Max. Participants</FormLabel>
                        <Input
                            id="maxParticipants"
                            name="maxParticipants"
                            type='number'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.maxParticipants}
                            bg={'white'}
                        />
                        <FormErrorMessage>{formik.errors.maxParticipants} </FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={Boolean(formik.touched.ticketPrice && formik.errors.ticketPrice)}>
                        <FormLabel htmlFor="maxParticipants">Ticket Price</FormLabel>

                        <RadioGroup onChange={setPrice} value={price}>
                            <Flex dir="row" gap={'2rem'}>
                                <Radio value="paid" >Paid</Radio>
                                <Radio value="free" >Free</Radio>
                            </Flex>
                        </RadioGroup>
                        {price === "paid"
                            ? <Input
                                id="ticketPrice"
                                name="ticketPrice"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.ticketPrice}
                                bg={'white'}
                                mt={2}
                            />
                            : null}
                        <FormErrorMessage>{formik.errors.ticketPrice} </FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={Boolean(formik.touched.description && formik.errors.description)}>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Textarea
                            id="description"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            bg={'white'}
                        />
                        <FormErrorMessage>{formik.errors.description} </FormErrorMessage>
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="orange"
                        isLoading={isSubmitting}
                    >Submit</Button>
                </Stack>
            </form>
        </>
    )
}
