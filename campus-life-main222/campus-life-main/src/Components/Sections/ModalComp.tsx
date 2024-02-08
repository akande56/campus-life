import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalFooter, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link, Path } from "react-router-dom";

type ModalProps = {
    headerText: string;
    modalBody: ReactNode;
    footerButtonText: string;
    haslink: boolean;
    link?: Path;
    modalOpenButtonText: string;
}

export default function ModalComponent(props: ModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
            <Button onClick={onOpen}>{props.modalOpenButtonText}</Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backdropFilter="blur(4px) hue-rotate(10deg)" />
                <ModalContent>
                    <ModalHeader>{props.headerText}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{props.modalBody}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            {!props.haslink && props.footerButtonText}
                            {props.haslink && props.link && <Link target="_blank" to={props.link}>
                                {props.footerButtonText}
                            </Link>}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
