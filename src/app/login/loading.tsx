import { Flex, Spinner } from "@chakra-ui/react";

export default function LoginLoading() {
    return (
        <Flex justify={'space-around'} align={'center'} h={'70vh'}>
            <Spinner size={'xl'} />
        </Flex>
    )
}
