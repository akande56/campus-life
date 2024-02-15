import { Box, Flex, Spacer, useMediaQuery, Heading } from "@chakra-ui/react";
import NavItemsRenderer from "./NavItemsRenderer";
import { NavLink } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
    const [isMobile] = useMediaQuery('(max-width: 650px)');


    return (
        <Box alignContent="center" height={70} bg="gray.200" p={4}>
            <Flex h="100%" align="center">
                {isMobile ?
                    <Box>
                        <MobileSidebar interface="dashboard" />
                    </Box>
                    :
                    <NavLink to="/"><Heading fontSize='xl'>Campus Life</Heading></NavLink>}
                <Spacer />
                {!isMobile &&
                    <>
                        <NavItemsRenderer direction="row" />
                    </>
                }
            </Flex>
        </Box>
    );
}