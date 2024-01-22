'use client'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Icon, Text } from "@chakra-ui/react"
import { LuPieChart, LuCalendarHeart } from "react-icons/lu"
import MenuLink from "./menuLink"

export default function MainMenu() {

    return (
        <>
            <Flex pt={'5em'} direction={'column'} gap={'0.5em'} wrap={'wrap'} >
                <Accordion allowMultiple defaultIndex={[0]} >
                    <AccordionItem >
                        <AccordionButton>
                            <Flex direction="row" alignItems={'center'} gap={4} flex={1}>
                                <Icon as={LuCalendarHeart} />
                                <Text fontWeight={600}>Events</Text>
                            </Flex>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel p={0} >
                            <MenuLink href={'/organizer/events'} >My Events</MenuLink>
                            <MenuLink href={'/organizer/events/new'} >Create Event</MenuLink>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <MenuLink href={'/organizer/reports'} leftIcon={LuPieChart}>Reports</MenuLink>
            </Flex>
        </>
    )
}
