import { Box, Heading, Input, InputGroup, InputRightElement, InputLeftElement, Stack, Text, Icon, useMediaQuery, Center, } from "@chakra-ui/react";
import SolidButton from "../../Reuseables/SolidButton";
import { IoIosSearch } from "react-icons/io";
import { primaryColor } from "../../Core/Colors/colors";

export default function LandingPageHeader() {
    const [isMobile] = useMediaQuery('(max-width: 650px)')

    return (
        <Box h={"600px"} minH={600}>
            <Center height="100%">
                <Stack align="center" justify="center">
                    <Stack w="633px" justify="center" align="center">
                        <Heading lineHeight="101.99%" fontSize="56px">Empower Your <span style={{ color: primaryColor }}>Academic Journey</span> with Memories</Heading>
                        <Text>Welcome to AcademicHub, where we effortlessly capture and share your standout achievements, skills, and memorable experiences in a laid-back and user-friendly environment. It's like your academic journey's personal scrapbook - just snap, tag, and share!</Text>
                    </Stack>
                    <InputGroup boxShadow="-3px 0px 20px 0px rgba(146, 146, 146, 0.20)" width={isMobile ? "300px" : "600px"}>
                        <InputLeftElement height="100%">
                            <Icon color="#9B9696" fontSize="22px" as={IoIosSearch} />
                        </InputLeftElement>
                        <Input border="1px solid #000"
                            borderRadius="10px"
                            color="#9B9696"
                            h="3.75rem"
                            pr='4.5rem'
                            type='search'
                            placeholder='Search for memories'
                        />
                        <InputRightElement mr="-10px" height="100%" width="7.875rem" >
                            <SolidButton width="100%" fontSize="16px" buttonText="Search" />
                        </InputRightElement>
                    </InputGroup>
                </Stack>
            </Center >
        </Box >
    )
}