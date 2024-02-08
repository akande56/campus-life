import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Heading } from "@chakra-ui/react";
import React from "react";
import { FaPowerOff } from "react-icons/fa"
import NavItemsRenderer from "./NavItemsRenderer";

export default function SideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);

    return (
        <>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                <HamburgerIcon />
            </Button>
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
                        <Heading>Campus Life</Heading>
                    </DrawerHeader>

                    <DrawerBody>
                        <NavItemsRenderer onClick={onClose} includeButton={true} direction="column" />
                    </DrawerBody>

                    <DrawerFooter alignItems={"start"} justifyContent="start">
                        <Button color="red" leftIcon={<FaPowerOff />} variant="outline" mr={3} onClick={onClose}>
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
