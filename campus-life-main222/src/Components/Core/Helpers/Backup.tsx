import { Flex, Stack, Image, Button, Icon, Box, useToast, Modal, ModalBody, ModalFooter, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Heading, FormControl, FormLabel, Input, Text, Textarea, InputGroup, } from "@chakra-ui/react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { lightBg, primaryColor } from "../Colors/colors";
import ImageUploadIcon from "../../../assets/Add-Image-icon.svg";



export default function FileUploader() {
    const { onClose, onOpen, isOpen } = useDisclosure()

    const [isloading, setIsloading] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const toast = useToast()

    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement> & React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsloading(true)
        const examplePromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(200)
            }, 5000)
            setTimeout(() => {
                setIsloading(false)
                onClose()

                // setUploadedImages([])
            }, 7000)
        })
        toast.promise(examplePromise, {
            success: { position: "top", duration: 5000, title: 'Upload completed', description: "You image upload is complete, cheers to better memories" },
            error: { title: 'Upload failed', description: 'Image upload failed, please try again' },
            loading: { title: "Upload in progress...", description: "Image upload in progress please don't close your browser" },
        })

    }
    // setTimeout(() => {
    //     toast({
    //         title: "Starting Upload",
    //         description: "Your image upload has started",
    //         status: 'success',
    //         duration: 9000,
    //         isClosable: true,
    //         show
    //     })
    // }, 5000);

    const [fileName, setFileName] = useState('')
    const [fileDescription, setFileDescription] = useState('')



    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files) {
            // Convert FileList to an array
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));

            // Update the state with the new images, but limit to 6 images
            setUploadedImages((prevImages: string[]) => {
                // const totalImages = prevImages.length + newImages.length;
                const remainingSlots = Math.max(0, 6 - prevImages.length);

                // If there are remaining slots, add new images
                const limitedNewImages = newImages.slice(0, remainingSlots);

                return [...prevImages, ...limitedNewImages];
            });
        }
    }



    const handleRemoveImage = (index: number) => {
        const updatedImages = [...uploadedImages];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
    };

    function Component() {
        return (
            <Box>
                <Stack justify="center" align="center">
                    <Button background={lightBg} fontWeight={700} lineHeight="20px" color="#064733" leftIcon={<IoMdAdd />} width="141px" textAlign="center" onClick={onOpen}>Add post</Button>
                </Stack >
                <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay backdropFilter="blur(4px) hue-rotate(10deg)" />
                    <ModalContent borderRadius="23px">
                        <ModalHeader textAlign="center">Create <span style={{ color: "#76E1C1" }}>File</span></ModalHeader>
                        <ModalBody>
                            <Box>
                                <form onSubmit={handleImageUpload}>
                                    <Flex gap="26px" direction="column" align="start">

                                        <FormControl isRequired>
                                            <FormLabel fontWeight={700} fontSize="15px">File name</FormLabel>
                                            <Input height="46px" value={fileName} onChange={(e) => setFileName(e.target.value)} type="text" placeholder="Input file name" />
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel fontWeight={700}>Description</FormLabel>
                                            <Textarea resize="vertical" placeholder="Input description" value={fileDescription} onChange={(e) => setFileDescription(e.target.value)} />
                                        </FormControl>

                                        <Stack>
                                            <Heading fontSize="15px">Images</Heading>
                                            <Text>Select a maximum of six (6) images.</Text>
                                        </Stack>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleImageChange}
                                            multiple
                                            max={6}
                                            id="fileInput"
                                        />

                                        <label htmlFor="fileInput">
                                            <Stack width="179px" height="152px" cursor="pointer" borderRadius="5px" padding={10} bg="#F0F0F0" align="center" justify="center">
                                                <Image alt="Image upload icon" src={ImageUploadIcon} />
                                            </Stack>
                                        </label>

                                    </Flex>
                                    <Stack mt={10} align="center" justify="center">
                                        <Flex justify="center" wrap="wrap" gap={3}>
                                            {uploadedImages.map((image, index) => (
                                                <Flex position="relative" key={index} direction="column" justify="center" align="center">
                                                    <Image
                                                        objectFit="cover"
                                                        src={image}
                                                        alt={`uploaded-${index}`}
                                                        style={{ maxWidth: '150px', maxHeight: '200px' }}
                                                    />
                                                    <Icon _hover={{ cursor: "pointer" }} fontSize={30} onClick={() => handleRemoveImage(index)} position="absolute" color="red" as={MdDeleteForever} />
                                                </Flex>
                                            ))}
                                        </Flex>
                                        <InputGroup>
                                            <Input height="50px" type="submit" fontWeight={800} cursor="pointer" textAlign="center" bg={primaryColor} isDisabled={isloading} value="Add new +" />
                                        </InputGroup>
                                    </Stack>

                                </form>
                            </Box>
                        </ModalBody>

                        <ModalFooter justifyContent="start">
                            <Button onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box >
        )
    }
    return (
        <Stack spacing={4}>
            {Component()}
        </Stack>
    );
}
