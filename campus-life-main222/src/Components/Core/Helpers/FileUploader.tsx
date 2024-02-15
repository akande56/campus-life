import React, { useState } from 'react';
import {
    Flex,
    Stack,
    Image,
    Button,
    Icon,
    Box,
    useToast,
    Modal,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Text,
    Textarea,
    InputGroup,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { lightBg, primaryColor } from "../Colors/colors";
import axios from 'axios';
import ImageUploadIcon from "../../../assets/Add-Image-icon.svg";
import { BaseApiUrl } from '../../../utils/envKeys/keys';

export default function FileUploader() {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const [isloading, setIsloading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [experience, setExperience] = useState('');
    const toast = useToast();

    const handleImageUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsloading(true);

        const formData = new FormData();
        formData.append('experience', experience);

        uploadedImages.forEach((image, index) => {
            formData.append(`semester_photo${index + 1}`, image);
        });

        try {
            const response = await axios.post(
                BaseApiUrl + 'api/v1/student/semester/experience/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                    },
                }
            );

            console.log(response.data);

            setExperience('');
            setUploadedImages([]);

            toast({
                title: 'Upload completed',
                status: 'success',
                duration: 5000,
                description: "Your image upload is complete, cheers to better memories",
            });
        } catch (error) {
            console.error('Upload failed', error);

            toast({
                title: 'Upload failed',
                status: 'error',
                duration: 5000,
                description: error instanceof Error && error.message === "Authentication credentials were not provided" ? "Please login to continue" : 'Image upload failed, please try again',
            });
        } finally {
            setIsloading(false);
            onClose();
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            // Store File objects
            const newImages = Array.from(files);
            setUploadedImages((prevImages) => [...prevImages, ...newImages]);
        }
    };
    const handleRemoveImage = (index: number) => {
        const updatedImages = [...uploadedImages];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
    };

    return (
        <Box>
            <Stack justify="center" align="center">
                <Button background={lightBg} fontWeight={700} lineHeight="20px" color="#064733" leftIcon={<IoMdAdd />} width="141px" textAlign="center" onClick={onOpen}>
                    Add post
                </Button>
            </Stack>

            <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backdropFilter="blur(4px) hue-rotate(10deg)" />
                <ModalContent borderRadius="23px">
                    <ModalHeader textAlign="center">Create <span style={{ color: "#76E1C1" }}>File</span></ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleImageUpload}>
                            <Flex gap="26px" direction="column" align="start">
                                <FormControl isRequired>
                                    <FormLabel fontWeight={700} fontSize="15px">Experience</FormLabel>
                                    <Textarea resize="vertical" placeholder="Input experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
                                </FormControl>

                                <Stack>
                                    <Heading fontSize="15px">Images</Heading>
                                    <Text>Select a maximum of six (2) images.</Text>
                                </Stack>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                    multiple
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
                                                src={URL.createObjectURL(image)}
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
                    </ModalBody>

                    <ModalFooter justifyContent="start">
                        <Button onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}