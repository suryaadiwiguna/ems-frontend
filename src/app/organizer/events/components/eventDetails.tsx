import { Image } from "@chakra-ui/next-js"
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, Button, Stack, useDisclosure } from "@chakra-ui/react"
import axios, { AxiosError, AxiosResponse } from "axios"

export default async function EventDetails({ eventID, isOpen, onClose }: { eventID: string, isOpen: boolean, onClose: () => void }) {

    const eventDetails: validEventResponse = await axios.get(`http://localhost:1010/event/${eventID}`)
        .then((res: AxiosResponse) => {
            return res.data
        })
        .catch((err: AxiosError) => {
            return err.response?.data
        })

    if (eventDetails.code === 0 || eventDetails.code === -1) return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> Oops ... </ModalHeader>
                <ModalBody>
                    <Text>
                        {eventDetails.msg}
                    </Text>
                </ModalBody>
            </ModalContent>
            <ModalFooter>
                <Button onClick={onClose}>OK</Button>
            </ModalFooter>
        </Modal>
    )

    if (eventDetails.code === 1) return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> {eventDetails.data.title} </ModalHeader>
                <ModalBody>
                    <Image alt="Event banner" src={process.env.BASE_RURL + "/" + eventDetails.data.banner_url}></Image>
                </ModalBody>
            </ModalContent>
            <ModalFooter>
                <Button>Buton 1</Button>
            </ModalFooter>
        </Modal>
    )


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Opps ... </ModalHeader>
                    <ModalBody>
                        <Text>Something went wrong</Text>
                    </ModalBody>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={onClose}>OK</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}