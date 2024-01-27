import { Link } from "@chakra-ui/next-js"
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, Button, Stack } from "@chakra-ui/react"
import { LuCheckCircle2, LuTicket, LuUserX2, LuXCircle } from "react-icons/lu"

export default function ResponseModal({ isOpen, onOpen, onClose, response }: { isOpen: boolean, onOpen: () => void, onClose: () => void, response: validAuthResponse | undefined }) {

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
                    <Stack w={'full'} >
                        <Link href={'/login'} > <Button colorScheme="blue" w={'full'}>Take me to Login page</Button></Link>
                        <Button onClick={onClose}>Close and try again</Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

    //Handling success without referral code
    if (response.code === 1) return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent alignItems={'center'} p={3} m={6}>
                <ModalHeader>Success</ModalHeader>
                <ModalBody >
                    <Stack align={'center'} textAlign={'center'}>
                        <LuCheckCircle2 color="teal" strokeWidth={0.8} size={75} />
                        <Text fontWeight={500}>{`${response.msg}`}</Text>
                    </Stack>
                </ModalBody>

                <ModalFooter w={'full'}>
                    <Stack w={'full'} >
                        <Link href={'/login'} > <Button colorScheme="blue" w={'full'} onClick={onClose}>Login</Button></Link>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

    //Handling success with referral code
    if (response.code === 2) return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent alignItems={'center'} p={3} m={6}>
                <ModalHeader>Success</ModalHeader>
                <ModalBody >
                    <Stack align={'center'} textAlign={'center'} gap={3}>
                        <LuTicket color="teal" strokeWidth={0.8} size={75} />
                        <span>Congratulations! Your account is successfully created and you received a voucher from the Referral Code you used.</span>
                        <span>Coupon detail: <b>{response.data.coupon?.description}</b></span>
                        <span>Login now to use it on your next purchase.</span>
                    </Stack>
                </ModalBody>

                <ModalFooter w={'full'}>
                    <Stack w={'full'} >
                        <Link href={'/login'} > <Button colorScheme="blue" w={'full'} onClick={onClose}>Login</Button></Link>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

    //Handling failed: wrong referral code
    if (response.code === -1) return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent alignItems={'center'} p={3} m={6}>
                <ModalHeader>Oops ...</ModalHeader>
                <ModalBody >
                    <Stack align={'center'} textAlign={'center'}>
                        <LuXCircle color="orange" strokeWidth={0.8} size={75} />
                        <Text fontWeight={500}>{`${response.msg}`}</Text>
                    </Stack>
                </ModalBody>

                <ModalFooter w={'full'}>
                    <Stack w={'full'} >
                        <Button w={'full'} onClick={onClose}>Close</Button>
                    </Stack>
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
