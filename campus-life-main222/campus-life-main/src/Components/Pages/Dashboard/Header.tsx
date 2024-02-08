import { Box, Flex, Heading, Input, Stack, InputGroup, InputLeftElement, Text, Icon, HStack, Avatar } from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";
import { RiSettings4Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { deepBlack, subColor } from "../../Core/Colors/colors";
import { ReactNode } from "react";


interface CompProps {
    Icon: ReactNode;

}


export default function DashboardHeader() {

    const numberOfNotification = 5

    function Component(props: CompProps) {
        return (
            <Box>
                <Stack borderRadius={8} align="center" justify="center" background="white" height="40px" width="40px">
                    {props.Icon}
                </Stack>
            </Box>
        )
    }

    return (
        <Box>
            <Flex mt={34} alignSelf="flex-start" width="100%" bg="#FDFDFD" justify="space-between" align="center" wrap="wrap">
                <Stack>
                    <Heading color={deepBlack} fontWeight={700}>Academic Hub</Heading>
                    <Text color={subColor} fontSize="20px">Welcome, Adebayo Adeyimi 👋</Text>
                </Stack>
                {/* <Spacer /> */}
                <HStack gap="12px" wrap="wrap">
                    <Box>
                        <InputGroup height="40px">
                            <InputLeftElement pointerEvents='none'>
                                <Icon as={FaSearch} />
                            </InputLeftElement>
                            <Input type='text' placeholder='Search anything here' />
                        </InputGroup>
                    </Box>
                    <Stack align="self-end">
                        <Component Icon={<Icon color="#064733" position="relative" fontSize={25} as={IoIosNotifications} />} />
                        <Stack background="red" align="center" justify="center" width={"20px"} height={"20px"} borderRadius="full" border="3px solid white" color="white" position="absolute">
                            <Text alignSelf="center" fontSize={15} textAlign="center" fontWeight={900}>{numberOfNotification}</Text>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Component Icon={<Icon color="#757897" fontSize={25} as={RiSettings4Fill} />} />
                    </Stack>
                    <Avatar name="Isaac Yerima" size="sm" />
                </HStack>
            </Flex>
        </Box>
    )
}