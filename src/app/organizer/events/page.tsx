
import { Heading, Text, Card, Box, Stack, Flex } from "@chakra-ui/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import Link from "next/link"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import { LuCalendarCheck, LuCircleDollarSign } from "react-icons/lu"
import UnauthorizedPage from "@/app/components/unauthorized"

export default async function Page() {

    if (!cookies().get('token')) return <UnauthorizedPage />

    const events: validEventsResponse = await axios.get('http://localhost:1010/event/my-events', {
        headers: {
            "Authorization": `Bearer ${cookies().get('token')!.value!}`
        }
    })
        .then((response: AxiosResponse) => {
            return response.data
        })
        .catch((err: AxiosError) => {
            return err.response?.data
        })
    console.log(events)

    if (events.code === -1) return <UnauthorizedPage />

    if (!events?.data?.length) return (
        <>
            <Heading mb={'2rem'}>Events</Heading>
            <Text>You have no events.</Text> <Link href={'/organizer/events/new'}> Create one?</Link>
        </>
    )

    if (events?.data?.length) return (
        <>
            <Heading mb={'2rem'}>Events</Heading>
            <Flex direction={{ base: 'column', sm: 'row' }} gap={5} wrap={'wrap'} justify={'space-between'}>
                {events.data.map((event: events) => {
                    return (

                        <Card
                            key={event.id}
                            direction={{ base: 'row', sm: 'column' }}
                            variant={'outline'}
                            w={{ base: 'full', sm: '45%', lg: '30%' }}
                        >

                            <Box
                                minW={{ base: '100px', sm: 'full' }}
                                minH={{ base: 'inherit', sm: '100px' }}
                                bgImage={`url(${process.env.BASE_URL}/${event.banner_url})`}
                                bgPosition={'center'}
                                bgRepeat={'no-repeat'}
                                bgSize={'cover'}
                            >
                            </Box>

                            <Stack gap={2} p={'1rem'} overflow={'auto'}>
                                <Link href={`./events/${event.id}`} >
                                    <Text fontWeight={600}>{event.title}</Text>
                                    <Stack gap={0}>
                                        <Flex align={'center'} gap={3} >
                                            <Box minW={'10px'}><LuCalendarCheck /></Box>
                                            <Text>{new Date(event.eventStartDate).toDateString()}</Text>
                                        </Flex>
                                        <Flex align={'center'} gap={3}>
                                            <Box minW={'10px'}><LuCircleDollarSign /></Box>
                                            <Text >
                                                {event.ticketPrice
                                                    ? new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(event.ticketPrice)
                                                    : "Free"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                </Link >
                            </Stack>
                        </Card>
                    )
                })}
            </Flex >

        </>
    )

    //Fallback
    return (<>Opps... Something went wrong.</>)
}
