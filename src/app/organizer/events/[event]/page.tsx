import Link from "next/link"
import { Button, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { cookies } from "next/headers"
import UnauthorizedPage from "@/app/components/unauthorized"

export default async function EventPage({ params }: { params: { event: events["id"] } }) {
    console.log(process.env.GET_MY_EVENT_DETAILS)

    const eventDetails: validEventResponse = await axios.get(process.env.GET_MY_EVENT_DETAILS + params.event, {
        headers: {
            "Authorization": `Bearer ${cookies().get('token')!.value!}`
        }
    })
        .then((res: AxiosResponse) => {
            return res.data
        })
        .catch((err: AxiosError) => {
            return err.response?.data
        })

    // console.log(eventDetails)

    if (eventDetails.code === -1) return <UnauthorizedPage />

    const { createdAt, updatedAt, title, description, eventStartDate, eventEndDate, eventStartTime, eventEndTime, maxParticipants, ticketPrice, status, banner_url, organization_name } = eventDetails.data

    if (eventDetails.data.id) return (

        <>
            <Stack pb={'4rem'} gap={3}>
                <Image maxW={'450px'} alt="Event banner" src={process.env.BASE_URL + "/" + banner_url}></Image>
                <Stack mb={'1rem'}>
                    <Heading >{title}</Heading>
                    <Text textTransform={'capitalize'} fontWeight={600}>Event Status: {status}</Text>
                </Stack>

                <Heading size={'md'}>Seating</Heading>
                <Stack gap={0}>
                    <Text>Ticket Price: {ticketPrice
                        ? new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(ticketPrice)
                        : "Free"}</Text>
                    <Text>Max. Participants: {maxParticipants} people</Text>
                </Stack>

                <Heading size={'md'}>Schedule</Heading>
                <Stack gap={0}>
                    <Text>Date: {new Date(eventStartDate).toDateString()} to {new Date(eventEndDate).toDateString()}</Text>
                    <Text>Time: {eventStartTime} to {eventEndTime}</Text>
                </Stack>

                <Heading size={'md'}>Description</Heading>
                <Text>{description}</Text>
                <Text></Text>

                <Divider m={4} />
                <Flex gap={5}>
                    <Button colorScheme="purple">Edit Event</Button>
                    <Button>Cancel Event</Button>
                    <Link href={'/organizer/events'}><Button>Back</Button></Link>
                </Flex>
            </Stack>
        </>
    )

    return (
        <>Something is wrong</>
    )
}
