import { Box, HStack, Heading, Image, Stack, StackProps, useMediaQuery } from "@chakra-ui/react";
import leftEdgeIcon from "../../../assets/edge-icon-left.svg"
import rightEdgeIcon from "../../../assets/edge-icon-right.svg"
import { ReactNode } from "react";


interface LayoutProps extends StackProps {
    children: ReactNode;
    formHeading: string;
}

export default function AuthLayout(props: LayoutProps) {

    const [isMobile] = useMediaQuery('(max-width: 650px)')

    return (
        <Box>
            <Stack bgColor="#DBDBDB" overflow="hidden" position="relative" align="center" w="100vw" height="1024px" minHeight="100vh">
                <Box height="336px" left="-5px" position="absolute" top="9px" width="91px">
                    <Image alt="Image traced" src={leftEdgeIcon} height="336px" left="5px" position="absolute" top="0" width="86px" />
                </Box>
                <Box className="image-traced-wrapper" height="336px" right="-5" position="absolute" top="641px" width="110px">
                    <Image alt="Image traced" src={rightEdgeIcon} height="372px" left="5px" position="absolute" top="0" width="86px" />
                </Box>
                <HStack>
                    <Stack align="center" mt="80px">
                        <Heading mb="49px">Academic <span style={{ color: "#2BE4AC" }}>Hub</span></Heading>
                        <Stack bg="#FFF" height={props.height} w={!isMobile ? "600px" : "95vw"} spacing={4}>
                            <Heading fontSize="24px" mt="50px" textAlign="center" textTransform="capitalize">{props.formHeading}</Heading>
                            {props.children}
                        </Stack>
                    </Stack>
                </HStack>
            </Stack>
        </Box>
    )
}