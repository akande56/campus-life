import { useDisclosure, ModalOverlay, Button, Modal, ModalContent, ModalCloseButton, ModalBody, ModalHeader, Input, ModalFooter, InputGroup, InputLeftElement, Icon, Box, } from "@chakra-ui/react"
import React, { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import SearchItemsContainter from "./SearchItemsContainter"
import { mediaData } from "../../utils/mediaData"
import { primaryColor } from "../Core/Colors/colors"


type itemDataProps = {
    id: number;
    title: string;
    date: string;
    user: string;
    image: string;
    level: number;
}

export default function PopupSearchBar() {


    const [searchTerm, setSearchTerm] = useState('')
    const [filteredData, setFilteredData] = useState<itemDataProps[]>([])


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
        // Use the callback form to ensure you're working with the latest state
        setFilteredData(() => {
            const filtered = mediaData.filter(item =>
                item.title.toLowerCase().includes(event.target.value.toLowerCase())
            );
            return filtered;
        });
    }


    function ModalComponent() {
        const { isOpen, onOpen, onClose } = useDisclosure()

        const initialRef = React.useRef(null)
        const finalRef = React.useRef(null)

        function handleClose() {
            setSearchTerm('')
            onClose()
        }

        return (
            <>
                <InputGroup onClick={onOpen} boxShadow="-3px 0px 20px 0px rgba(146, 146, 146, 0.20)" width={["auto", "auto", "366px"]}>
                    <InputLeftElement height="100%">
                        <Icon color="#9B9696" fontSize="22px" as={IoIosSearch} />
                    </InputLeftElement>
                    <Input borderRadius="10px" color="#9B9696" bg="white" h="40px" type='search' placeholder="Search for anything here" />
                </InputGroup>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={handleClose}
                >
                    <ModalOverlay backdropFilter="blur(4px) hue-rotate(10deg)" />
                    <ModalContent>
                        <ModalHeader>Search for your files on campus life</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Input onChange={handleChange} ref={initialRef} placeholder='Search anything here' />
                            <SearchItemsContainter filteredData={filteredData} searchTerm={searchTerm} />
                        </ModalBody>

                        <ModalFooter>
                            <Button bg={primaryColor} onClick={handleClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }



    return (
        <Box>
            {ModalComponent()}
        </Box>
    )
}

