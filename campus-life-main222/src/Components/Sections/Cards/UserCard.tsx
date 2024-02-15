import { Box, HStack, Stack, Image, Flex, Heading, Divider, Text } from "@chakra-ui/react";

interface UserCardProps {
    userName: string;
    aboutUser: string;
    userImage: string;
    // userSchool: string
}

export default function UserCard(props: UserCardProps) {
    return (
        <Box>
            <HStack gap={10} wrap="wrap" align="center" justify="center">
                <Stack gap={10} width={600} maxW={"95vw"}>
                    <Flex align="flex-end">
                        <Heading fontSize={58}>{props.userName}</Heading>
                        <Divider mb={2} width={20} border="2px solid black" />
                    </Flex>
                    <Text fontSize="23px">
                        {props.aboutUser}
                        {/* <span style={{ fontWeight: 700, textTransform: "uppercase" }}>ATBU BAUCHI.</span>  */}
                        {/* I am skilled in developing plans, managing projects, and user documentation. */}
                    </Text>
                </Stack>
                <Image borderRadius="10px" objectFit="cover" h="500px" maxW="95vw" width="462px" src={props.userImage} />
            </HStack>
        </Box>
    )
}