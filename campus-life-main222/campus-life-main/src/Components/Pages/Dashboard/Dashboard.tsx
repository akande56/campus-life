import { useState } from "react";
import { Box, Flex, Stack, Text, Icon, HStack, Button, Spacer, Heading } from "@chakra-ui/react";
import CardRenderers from "../../Sections/Cards/FileCardRenderers";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { lightBg, primaryGreen, subColor } from "../../Core/Colors/colors";
import FileUploader from "../../Core/Helpers/FileUploader";
import SinglePostRenderer from "../../Sections/Cards/SinglePostRenderer";
import { Link } from "react-router-dom";



export default function Dashboard() {

    const [showAll, setShowAll] = useState(false)

    function handleToggle() {
        setShowAll(!showAll)
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="start">
            <Flex pt="40px" width="100%" wrap="wrap">
                <HStack wrap="wrap" gap={10}>
                    <Text fontSize="24px">All Files</Text>
                        //Change element to date picker
                    <Button rightIcon={<FaChevronDown />}>2023 - 2023</Button>
                </HStack>
                <Spacer />
                <Stack>
                    <FileUploader />
                </Stack>
            </Flex>

            <Spacer margin="10px 0px" height={20} />

            <Stack>
                <CardRenderers showAll={showAll} />
                <Icon onClick={handleToggle} cursor="pointer" alignSelf="center" color={subColor} fontSize="40px" as={!showAll ? MdOutlineKeyboardDoubleArrowDown : MdOutlineKeyboardDoubleArrowUp} />
            </Stack>

            <Stack>
                <Flex align="center">
                    <Heading fontWeight={400} fontSize="24px">Recent Post</Heading>
                    <Spacer />
                    <Link to="my-uploads">
                        <Button color={primaryGreen} bg={lightBg}>See All</Button>
                    </Link>
                </Flex>
                <Stack>
                    <SinglePostRenderer />
                </Stack>
            </Stack>
        </Box>
    )
}