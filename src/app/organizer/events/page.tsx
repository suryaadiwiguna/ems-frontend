
import { Heading, Text, Card, Box, Divider, Stack, Flex } from "@chakra-ui/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import Link from "next/link"

export default async function Page() {

    const events = await axios.get('http://localhost:1010/event/get-events')
        .then((response: AxiosResponse) => {
            return response.data
        })
        .catch((err: AxiosError) => {
            return err
        })

    console.log("Server?")

    if (!events.data.length) return (
        <>
            <Heading mb={'2rem'}>Events</Heading>
            <Text>You have no events.</Text> <Link href={'/organizer/events/new'}> Create one?</Link>
        </>
    )

    if (events.data?.length) return (
        <>
            <Heading mb={'2rem'}>Events</Heading>
            <Flex direction={'row'} gap={5}>
                {events.data.map((event: events) => {
                    console.log("Hii")
                    return (
                        <div key={event.id}>
                            <Link href={`./events/${event.id}`}>
                                <Card direction={{ base: 'row', lg: 'column' }} variant={'outline'}>
                                    <Box
                                        minH={'150px'}
                                        minW={'150px'}
                                        bgImage={`url(${process.env.BASE_URL}/${event.banner_url})`}
                                        bgPosition={'center'}
                                        bgRepeat={'no-repeat'}
                                        bgSize={'contain'}
                                    >
                                    </Box>

                                    <Stack spacing={3} maxW={'full'} p={'1rem'}>
                                        <Heading size={'md'}>{event.title}</Heading>
                                        <Text>{new Date(event.eventStartDate).toDateString()}</Text>
                                        <Text fontWeight={600}>
                                            {event.ticketPrice
                                                ? new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(event.ticketPrice)
                                                : "Free"}
                                        </Text>
                                        <Divider />
                                        <Text>{event.organization_name}</Text>
                                    </Stack>

                                </Card>
                            </Link>

                        </div>
                    )
                })}
            </Flex>

        </>
    )

    //Fallback
    return (<>Opps... Something went wrong.</>)
}
