import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, Box, Text, Avatar, Stack, DrawerCloseButton, Flex, DrawerHeader, DrawerBody, DrawerFooter, Icon, Spacer, IconProps, As } from "@chakra-ui/react";
import React from "react";
import { FaPowerOff } from "react-icons/fa"
import NavItemsRenderer, { LandingPageNavItemsRenderer } from "./NavItemsRenderer";
import { MdMenu } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { primaryColor } from "../Core/Colors/colors";
import { RiSettings4Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";


interface SidebarProps {
    interface: "dashboard" | "landing-page"
}

interface iconProps extends IconProps {
    IconName: As;
}

export default function MobileSidebar(props: SidebarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const btnRef = React.useRef<HTMLButtonElement>(null);

    function Component(props: iconProps) {
        return (
            <Box>
                <Stack borderRadius={8} align="center" justify="center" background="white" height="40px" width="40px">
                    <Icon color={props.color} position={props.position} fontSize={"30px"} as={props.IconName} />
                </Stack>
            </Box>
        )
    }

    return (
        <Flex zIndex={20} width="100%" padding="10px" justify="space-evenly" align="center" height="5.5rem" borderBottom="1px solid #9B9696">
            <Icon color={primaryColor} fontSize="50px" ref={btnRef} onClick={onOpen} as={MdMenu} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                    </DrawerHeader>

                    {
                        props.interface === "landing-page" ?
                            <DrawerBody>
                                <LandingPageNavItemsRenderer onClick={onClose} />
                            </DrawerBody>
                            :
                            <DrawerBody>
                                <NavItemsRenderer onClick={onClose} direction="column" />
                            </DrawerBody>
                    }

                    {props.interface !== "landing-page" ?
                        <DrawerFooter alignItems={"start"} justifyContent="start">
                            <Button color="red" leftIcon={<FaPowerOff />} variant="outline" mr={3} onClick={onClose}>
                                Logout
                            </Button>
                        </DrawerFooter>
                        : ""
                    }
                </DrawerContent>
            </Drawer>
            <Spacer />
            {
                props.interface !== "landing-page" &&
                <Flex align="center">
                    <Stack align="self-end">
                        <Component IconName={IoIosNotifications} position="relative" />
                        <Stack background="red" align="center" justify="center" width={"20px"} height={"20px"} borderRadius="full" border="3px solid white" color="white" position="absolute">
                            <Text alignSelf="center" fontSize={"10px"} textAlign="center" fontWeight={900}>{10}</Text>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Component IconName={RiSettings4Fill} color="#757897" />
                    </Stack>
                    <NavLink to="/dashboard/profile">
                        <Avatar name="Isaac Yerima" size="sm" />
                    </NavLink>
                </Flex>
            }
        </Flex>
    );
}
