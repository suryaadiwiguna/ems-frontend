import { GridItem } from "@chakra-ui/react"

export default function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <GridItem colSpan={1} h={'100vh'} hideBelow={'md'}>
            {children}
        </GridItem>
    )
}
