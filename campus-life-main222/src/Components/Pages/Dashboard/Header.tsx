import { Box, Flex, Heading, Stack, Text, Icon, HStack, Avatar, StackProps, useMediaQuery } from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";
import { RiSettings4Fill } from "react-icons/ri";
import { deepBlack, subColor } from "../../Core/Colors/colors";
import { ReactNode } from "react";
import MobileSidebar from "../../Navigation/MobileSidebar";
import PopupSearchBar from "../../Reuseables/DummySearcher";
import { Link } from "react-router-dom";


interface CompProps extends StackProps {
    Icon: ReactNode;

}


export default function DashboardHeader() {

    const [isMobile] = useMediaQuery("(max-width: 765px)")

    const numberOfNotification = 5

    function Component(props: CompProps) {
        return (
            <Box>
                <Stack position={props.position} borderRadius={8} align="center" justify="center" background="white" height="40px" width="40px">
                    {props.Icon}
                </Stack>
            </Box>
        )
    }

    return (
        <>
            <Stack display={["block", "block", "none"]}>
                <MobileSidebar interface="dashboard" />
            </Stack>
            <Flex padding={["10px", "0px", "0px"]} mt={34} alignSelf="flex-start" width="100%" bg="#FDFDFD" justify="space-between" align="center" wrap="wrap">
                <Stack>
                    <Heading color={deepBlack} fontWeight={700}>Academic Hub</Heading>
                    <Text color={subColor} fontSize="20px">Welcome, Adebayo Adeyimi 👋</Text>
                </Stack>
                {/* <Spacer /> */}
                <HStack gap="12px" wrap="wrap">
                    <Box>
                        <PopupSearchBar />
                    </Box>
                    {
                        !isMobile &&
                        <>
                            <Stack align="self-end">
                                <Component position="relative" Icon={<Icon color="#064733" top={0} fontSize={25} as={IoIosNotifications} />} />
                                <Stack background="red" align="center" justify="center" width={"20px"} height={"20px"} borderRadius="full" border="3px solid white" color="white" position="absolute">
                                    <Text fontSize={"12px"} textAlign="center" fontWeight={900}>{numberOfNotification}</Text>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Component Icon={<Icon color="#757897" fontSize={25} as={RiSettings4Fill} />} />
                            </Stack>
                            <Link to="/dashboard/profile">
                                <Avatar name="Isaac Yerima" size="sm" />
                            </Link>
                        </>
                    }
                </HStack>
            </Flex>
        </>
    )
}