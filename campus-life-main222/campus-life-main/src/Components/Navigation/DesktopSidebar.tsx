import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import NavItemsRenderer from "./NavItemsRenderer";

export default function DesktopSidebar() {
    const { onClose } = useDisclosure()
    return (
        <Box display="flex" flexDirection="column" alignItems="start" justifyContent="flex-start" height="auto" minH="100vh" bg="white">
            <Heading pl="38px" pb="70px" pt="40px">Logo</Heading>
            <NavItemsRenderer onClick={onClose} includeButton={true} direction="column" />
        </Box>
    )
}