'use client'
import { Heading, Text } from "@chakra-ui/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import MyEvents from "./components/MyEvents"
import { Link } from "@chakra-ui/next-js"

export default async function page() {
    const [events, setEvents] = useState<validEventResponse>()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getEvents()
        setLoading(false)
    }, [])

    async function getEvents() {
        await axios.get('/api/event/get-events')
            .then((response: AxiosResponse) => {
                setEvents({ ...response.data })
            })
            .catch((err: AxiosError) => {
                alert(err)
            })
    }
    // console.log(events)
    // console.log(events?.data)
    return (
        <>
            {isLoading
                ? null //Loading handled by loading.tsx
                : events?.data.length
                    ? <>
                        <Heading mb={'2rem'}>Events</Heading>
                        {
                            events.data.map((event) => {
                                return <>
                                    <MyEvents event={event} />
                                </>
                            })
                        }
                    </>
                    : <>
                        <Heading mb={'2rem'}>Events</Heading>
                        <Text>You have no events.</Text> <Link color={'blue'} href={'/organizer/events/new'}> Create one?</Link>
                    </>
            }
        </>
    )
}
