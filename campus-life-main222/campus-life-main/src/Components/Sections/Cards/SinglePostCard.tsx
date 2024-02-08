import { Box, Flex, Heading, Stack, Text, Image, Avatar } from "@chakra-ui/react";
import { lightBg, primaryGreen } from "../../Core/Colors/colors";
import { ReactNode } from "react";

interface CardProps {
    title: string;
    date: ReactNode;
    image: string;
    name: string;
}

export default function SinglePostCardLayout(props: CardProps) {
    return (
        <Box>
            <Stack gap={0} minH="249px" width="329px">
                <Image width="100%" height="175px" objectFit="cover" borderTopRadius="21px" src={props.image} />
                <Flex gap={2} padding="15px" borderBottomRadius="21px" bg="white" align="center">
                    <Box>
                        <Avatar bg={lightBg} color={primaryGreen} name={props.name} />
                    </Box>
                    <Box>
                        <Heading fontSize="16px">{props.title}</Heading>
                        <Text fontSize="14px">{props.date}</Text>
                    </Box>
                </Flex>
            </Stack>
        </Box>
    )
}