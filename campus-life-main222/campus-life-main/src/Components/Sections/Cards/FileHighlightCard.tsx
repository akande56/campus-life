import { Avatar, Box, HStack, Heading, Image, Stack, Flex, Text, Button, AvatarGroup } from "@chakra-ui/react";
import FolderIcon from "../../../assets/folder-icon.svg"
import PersonImage from "../../../assets/black-female-student.jpg"
import { Link } from "react-router-dom";
import { primaryColor, subColor } from "../../Core/Colors/colors";

interface FileCardProps {
    date: string;
    title: string;
    path: string;
    hasData: boolean | undefined;
}

export default function FileHighlightCard(props: FileCardProps) {
    return (
        <Box>
            <Stack justify="space-around" align="space-between" borderRadius={8} boxShadow="0px 2px 30px 0px rgba(0, 0, 0, 0.06)"
                _hover={{
                    cursor: "pointer",
                    boxShadow: "0px 2px 30px 0px rgba(0, 0, 0, 0.10)"
                }} padding={"20px"} bg="#FFFFFF" gap="10px" w="332px" height="193px">
                <HStack gap={5} align="stretch">
                    <Stack borderRadius={8} alignItems="center" justifyContent="center" bg="#CAFCED" width="40px" h="40px">
                        <Image width={"17px"} height={"13px"} src={FolderIcon} />
                    </Stack>
                    <Stack>
                        <Heading fontWeight={700} textTransform="capitalize" lineHeight={"18px"} fontSize={"16px"}>{props.title}</Heading>
                        <Text fontSize="14px" color="#757897">{props.date}</Text>
                    </Stack>
                </HStack>
                {props.hasData ?
                    <Stack>
                        <Text color={subColor} textTransform="capitalize">Shared users</Text>
                        <Flex justify="space-between" wrap="wrap">
                            <AvatarGroup>
                                <Avatar width="36px" height="36px" borderRadius={10} src={PersonImage} />
                                <Avatar width="36px" height="36px" borderRadius={10} src={PersonImage} />
                                <Avatar width="36px" height="36px" borderRadius={10} src={PersonImage} />
                                <Avatar width="36px" height="36px" borderRadius={10} src={PersonImage} />
                                <Stack align="center" justify="center" borderRadius={10} bg="#CAFCED" width={"36px"} height="36px">
                                    <Text color={primaryColor}>+80</Text>
                                </Stack>
                            </AvatarGroup>
                            <Link to={props.path}>
                                <Button border="1px solid #064733" width="76px" height="36px">View</Button>
                            </Link>
                        </Flex>
                    </Stack>
                    :
                    <Stack align="center" justify="center">
                        <Button border="1px solid #064733" width="183px" height="36px">No data found</Button>
                    </Stack>
                }
            </Stack>
        </Box>
    )
}