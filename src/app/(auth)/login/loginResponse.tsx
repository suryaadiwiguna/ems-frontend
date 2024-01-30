import { Link } from "@chakra-ui/next-js"
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, Button, Stack } from "@chakra-ui/react"
import { LuUserX2 } from "react-icons/lu"

export default function LoginResponseModal({ isOpen, onOpen, onClose, response }: { isOpen: boolean, onOpen: () => void, onClose: () => void, response: validAuthResponse | undefined }) {

    if (!response) return (<></>)
    //Handling bad request: used email
    if (response.code === 0) return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} >
            <ModalOverlay />
            <ModalContent alignItems={'center'} p={3} m={6}>
                <ModalHeader>Oops ...</ModalHeader>
                <ModalBody >
                    <Stack align={'center'} textAlign={'center'}>
                        <LuUserX2 color="grey" strokeWidth={0.8} size={75} />
                        <Text fontWeight={500}>{response.msg}</Text>
                    </Stack>
                </ModalBody>

                <ModalFooter w={'full'}>
                    <Button onClick={onClose} w={'inherit'} colorScheme="blue">Close and try again</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

    if (response.code === 1) return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} >
            <ModalOverlay />
            <ModalContent alignItems={'center'} p={3} m={6}>
                <ModalHeader>Success</ModalHeader>
                <ModalBody >
                    <Stack align={'center'} textAlign={'center'}>
                        <LuUserX2 color="grey" strokeWidth={0.8} size={75} />
                        <Text fontWeight={500}>{response.msg}</Text>
                    </Stack>
                </ModalBody>

                <ModalFooter w={'full'}>
                    <Button onClick={onClose} w={'inherit'} colorScheme="blue">Close and try again</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

    //Handling unhandled event
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Unhandled event
                    </ModalHeader>

                    <ModalBody>

                        <Text>Something went wrong. </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
