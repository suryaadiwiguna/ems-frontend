import { GridItem } from "@chakra-ui/react"

export default function ContentArea({ children }: { children: React.ReactNode }) {
    return (
        <GridItem px={'2em'} bg={'gray.50'} colSpan={{ base: 6, md: 5 }} h={'100vh'} overflow={'auto'} pt={'5em'}>
            {children}
        </GridItem>
    )
}
