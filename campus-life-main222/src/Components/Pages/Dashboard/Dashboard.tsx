import { useEffect, useState } from "react";
import { Box, Flex, Stack, Text, Icon, HStack, Button, Spacer, Heading, FormControl, FormLabel, Switch, useMediaQuery } from "@chakra-ui/react";
import CardRenderers from "../../Sections/Cards/FileCardRenderers";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { lightBg, primaryGreen, subColor } from "../../Core/Colors/colors";
import FileUploader from "../../Core/Helpers/FileUploader";
import SinglePostRenderer from "../../Sections/Cards/SinglePostRenderer";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store/User/AuthContext";



export default function Dashboard() {

    const [showPost, setShowPost] = useState(false)

    const { login } = useAuth()

    const [showAll, setShowAll] = useState(false)

    const [isMobile] = useMediaQuery('(max-width: 650px)')


    function handlePostToggle() {
        setShowPost(!showPost)
    }

    function handleToggle() {
        setShowAll(!showAll)
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            login()
        }
    })

    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="start">
            <Flex p="10px" justify="space-between" pt="40px" width="100%" wrap="wrap">
                <HStack gap={5}>
                    <Text fontSize="24px">All Files</Text>
                    <Button rightIcon={<FaChevronDown />}>2023 - 2023</Button>
                </HStack>
                <Spacer />
                <Stack>
                    <FileUploader />
                </Stack>
            </Flex>
            <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='display-post' mb='0'>
                    Show Demo Post
                </FormLabel>
                <Switch id='display-post' onChange={handlePostToggle} />
            </FormControl>
            <Spacer margin="10px 0px" height={20} />
            <Stack>
                <CardRenderers justify={isMobile ? "center" : "initial"} align={isMobile ? "center" : "initial"} showAll={showAll} />
                <Icon onClick={handleToggle} cursor="pointer" alignSelf="center" color={subColor} fontSize="40px" as={!showAll ? MdOutlineKeyboardDoubleArrowDown : MdOutlineKeyboardDoubleArrowUp} />
            </Stack>
            {showPost &&
                <>

                    <Stack>
                        <Flex align="center">
                            <Heading fontWeight={400} fontSize="24px">Recent Post</Heading>
                            <Spacer />
                            <Link to="all-files">
                                <Button color={primaryGreen} bg={lightBg}>See All</Button>
                            </Link>
                        </Flex>
                        <Stack alignSelf={isMobile ? "center" : "initial"}>
                            <SinglePostRenderer width={["90vw", "65vw"]} />
                        </Stack>
                    </Stack>
                </>
            }
        </Box >

    )
}