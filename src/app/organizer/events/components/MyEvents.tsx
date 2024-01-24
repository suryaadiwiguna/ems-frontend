import { Box, Card, Divider, Heading, Stack, Text } from "@chakra-ui/react";

export default function MyEvent({ event }: { event: events }) {
    return (

        <Stack w={'full'} maxW={{ base: 'full', lg: 'xs' }} >
            <Card direction={{ base: 'row', lg: 'column' }} variant={'outline'}>
                <Box
                    minH={'150px'}
                    minW={'150px'}
                    bgImage={`url(${process.env.NEXT_PUBLIC_BASE_URL}/${event.banner_url})`}
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
            <Text>Slot: 28/99</Text>
        </Stack>

    )
}
