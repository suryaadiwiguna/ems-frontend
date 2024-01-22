'use client'
import { Link } from "@chakra-ui/next-js"
import { Button, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"

export default function MenuLink({ children, href, leftIcon }: { children: React.ReactNode, href: string, leftIcon?: IconType }) {
    return (
        <Link href={href}>
            <Button fontWeight={400} bg={'transparent'} borderRadius={0} w={'full'} justifyContent={'flex-start'} leftIcon={leftIcon && <Icon as={leftIcon} />} gap={2}>
                {children}
            </Button>
        </Link>
    )
}
