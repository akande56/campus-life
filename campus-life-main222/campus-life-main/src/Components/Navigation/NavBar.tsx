import { Box, Flex, Spacer, useMediaQuery, Heading } from "@chakra-ui/react";
import SideBar from "./MobileSidebar";
import NavItemsRenderer from "./NavItemsRenderer";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isMobile] = useMediaQuery('(max-width: 650px)');


    return (
        <Box alignContent="center" height={70} bg="gray.200" p={4}>
            <Flex h="100%" align="center">
                {isMobile ?
                    <Box>
                        <SideBar />
                    </Box>
                    :
                    <NavLink to="/"><Heading fontSize='xl'>Campus Life</Heading></NavLink>}
                <Spacer />
                {!isMobile &&
                    <>
                        <NavItemsRenderer includeButton={true} direction="row" />
                    </>
                }
            </Flex>
        </Box>
    );
}