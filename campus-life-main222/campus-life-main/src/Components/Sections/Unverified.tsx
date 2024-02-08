import { Center, Heading, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { warningColor } from "../Core/Colors/colors";

export default function UnverifiedMessage() {
    const [isMobile] = useMediaQuery("(max-width: 600px)")


    return (
        <Center>
            <Stack borderRadius={8} align="center" justify="center" background={warningColor} maxW={isMobile ? "85vw" : "70vw"} minW={isMobile ? "80vw" : "70vw"} minH={200}>
                <Stack p={5} height="100%" align="center" justify="center">
                    <Heading>No uploads for this semester yet</Heading>
                    <Text>Hello Isa'ac, you are yet to upload your picture(s) for this semester, <Link to="/my-uploads"><u>click here to go to the uploads page</u></Link></Text>
                </Stack>
            </Stack>
        </Center>
    )
}