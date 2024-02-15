import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalFooter, InputLeftElement, Icon, InputGroup, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Text, InputProps, Input, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link, Path } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";


interface ModalProps extends InputProps {
    headerText: string;
    modalBody: ReactNode;
    ReactNodeInitializer?: ReactNode;
    footerLeftButton?: ReactNode;
    footerButtonText: string;
    haslink: boolean;
    link?: Path;
    modalOpenButtonText?: string;
    modalInitializer: "input" | "button" | "ReactNode";
}

export default function CustomModalComponent(props: ModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()


    function InputComponent(props: InputProps) {
        return (
            <InputGroup onClick={props.onClick} boxShadow="-3px 0px 20px 0px rgba(146, 146, 146, 0.20)" width={["auto", "auto", "366px"]}>
                <InputLeftElement height="100%">
                    <Icon color="#9B9696" fontSize="22px" as={IoIosSearch} />
                </InputLeftElement>
                <Input
                    borderRadius="10px"
                    color="#9B9696"
                    bg="white"
                    h="40px"
                    type='search'
                    placeholder="Search for anything here"
                />
            </InputGroup>
        )
    }

    return (
        <Box>
            {props.modalInitializer === "button" && <Button onClick={onOpen}>{props.modalOpenButtonText}</Button>}
            {props.modalInitializer === "input" && <InputComponent onClick={onOpen} />}
            {props.modalInitializer === "ReactNode" && <Box cursor="pointer" onClick={onOpen}>{props.ReactNodeInitializer}</Box>}
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backdropFilter="blur(4px) hue-rotate(10deg)" />
                <ModalContent>
                    <ModalHeader>{props.headerText}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{props.modalBody}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Flex width="100%" justify="space-between">
                            <Box>{props.footerLeftButton}</Box>

                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                {!props.haslink && props.footerButtonText}
                                {props.haslink && props.link && <Link target="_blank" to={props.link}>
                                    {props.footerButtonText}
                                </Link>}
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
