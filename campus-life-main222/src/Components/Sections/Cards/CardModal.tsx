import { Box, Button, Stack, Image, Text, Flex, Heading } from "@chakra-ui/react";
import CustomModalComponent from "../ModalComp";
import SinglePostCardLayout from "./SinglePostCard";
import { MdShare } from "react-icons/md";


type modalData = {
    id: number;
    title: string;
    date: string;
    user: string;
    image: string;
    level: number;
}

interface CardModalProps {
    modalData: modalData[]
}



export default function ImageModal(props: CardModalProps) {
    return (
        <Box>
            <Flex gap={10} wrap="wrap" width={"70vw"}>
                {props.modalData.map((item) => {
                    return (
                        <>
                            <CustomModalComponent footerLeftButton={<Button leftIcon={<MdShare />} colorScheme="green">Share Post</Button>} ReactNodeInitializer={
                                <Box alignSelf={["center", "center", "start"]} key={item.id}>
                                    <SinglePostCardLayout name={item.user} date={item.date} title={item.title} image={item.image} />
                                </Box>
                            } headerText={item.title} modalInitializer="ReactNode" modalBody={
                                <Box>
                                    <Stack align="center" justify="center" alignSelf="center" gap={0} minH="249px" width={"100%"}>
                                        <Image width="100%" height="250px" objectFit="cover" borderRadius="15px" src={item.image} />
                                        <Box alignSelf="center">
                                            <Heading fontSize="25px">Experience: </Heading>
                                            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci tenetur maiores commodi magni saepe at error quaerat quis excepturi necessitatibus amet recusandae qui dicta repellendus ratione consequuntur, optio ducimus dolores!</Text>
                                        </Box>
                                    </Stack>
                                </Box>
                            } haslink={false} footerButtonText="Close" />
                        </>
                    )
                })}
            </Flex>
        </Box>
    )
}