import { Box, Button, Flex, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { NavLink, } from "react-router-dom";
import { homeNavLinks } from "../Pages/LandingPage/navlinks";
import SolidButton from "../Reuseables/SolidButton";


export default function LandingPageNavbar() {

    return (
        <Box zIndex={10} left={0} right={0} top={0} bgColor="#FFF" position="fixed" borderBottom="1px solid #9B9696">
            <Stack bgColor="#fff" height="5.5rem" justify="center" align="center">
                <Flex align="center" gap="50px" >
                    {
                        homeNavLinks.map((item) => {
                            return (
                                <Box>
                                    <NavLink
                                        key={item.id}
                                        to={item.path}
                                    >
                                        <Text fontWeight={400} fontSize="16px">
                                            {item.title}
                                        </Text>
                                    </NavLink>
                                </Box>
                            );
                        })
                    }
                    <Spacer />
                    <HStack justify="center" align="center" wrap="wrap">
                        <NavLink to="/sign-in">
                            <Button _hover={{}} bg="white">Login</Button>
                        </NavLink>
                        <NavLink to="/sign-up">
                            <SolidButton buttonText="Sign up" />
                        </NavLink>
                    </HStack>
                </Flex >
            </Stack>
        </Box>
    );
}
