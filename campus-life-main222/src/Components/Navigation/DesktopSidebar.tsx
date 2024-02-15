import { Box, Heading, Image, Stack, Text, useDisclosure, Progress, Flex } from "@chakra-ui/react";
import NavItemsRenderer from "./NavItemsRenderer";
import BrownFolderIcon from "../../assets/brown-folder-icon.svg"

export default function DesktopSidebar() {
    const { onClose } = useDisclosure()

    return (
        <Box height="200vh" display="flex" flexDirection="column" alignItems="start" justifyContent="flex-start" minH="100vh" bg="white">
            <Heading fontSize="25px" margin="30px 0px 38px 38px">Campus Life</Heading>
            <NavItemsRenderer onClick={onClose} direction="column" />
            <Stack align="center" justify="center" height="269px" width="182px" alignSelf="center">
                <Image alignSelf="center" src={BrownFolderIcon} />
                <Text alignSelf="center">75% In-use</Text>
                <Stack width="132px">
                    <Progress height="6px" borderRadius={5} color="#064733" value={60} />
                    <Flex justify="space-between">
                        <Text>600GB</Text>
                        <Text>800GB</Text>
                    </Flex>
                </Stack>
            </Stack>
        </Box>
    )
}