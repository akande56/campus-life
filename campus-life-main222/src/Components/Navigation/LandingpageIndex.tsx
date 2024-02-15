import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import MobileSidebar from "./MobileSidebar";
import LandingPageNavbar from "./LandingPageNav";

export default function LandingPageNavIndex() {
    const [isMobile] = useMediaQuery('(max-width: 650px)');


    return (
        <Box alignContent="center" height={70} bg="gray.200" p={4}>
            <Flex h="100%" align="center">
                {isMobile ?
                    <Flex align="center" justify="space-between">
                        <MobileSidebar interface="landing-page" />
                    </Flex>
                    :
                    <>
                        <LandingPageNavbar />
                    </>
                }
            </Flex>
        </Box>
    );
}