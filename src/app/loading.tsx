import { Flex, Spinner } from "@chakra-ui/react";

export default function loading() {
    return (
        <Flex justify={'space-around'} align={'center'} h={'full'}>
            <Spinner size={'xl'} />
        </Flex>
    )
}
