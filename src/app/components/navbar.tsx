import { Box, Flex } from "@chakra-ui/react";

export default function Navbar() {
    return (
        <>
            <Box w={'full'} h={'4em'} bg={'white'} position={'fixed'} top={0} zIndex={999} boxShadow={'sm'}>
                <Flex px={'30px'} h={'inherit'} align={'center'} justify={'space-between'}>
                    <Box>LOGO</Box>
                    <Flex gap={'2em'}>
                        <p>Menu 1</p>
                        <p>Menu 2</p>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}
