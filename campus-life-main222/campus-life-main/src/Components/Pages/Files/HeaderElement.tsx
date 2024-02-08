import { Flex, Heading, InputGroup, Spacer, Stack, InputLeftElement, Icon, Input, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import FileUploader from "../../Core/Helpers/FileUploader";
import { subColor } from "../../Core/Colors/colors";


interface FilesHeaderProps {
    level: string;
    semester: string;
}

export default function FilesHeaderElement(props: FilesHeaderProps) {
    return (
        <Stack mt="55px" wrap="wrap">
            <Flex>
                <Stack>
                    <Heading textTransform="capitalize" fontWeight={700} fontSize="24px">{props.level} Level {props.semester} semester</Heading>
                    <Text color={subColor}>Sep 25, 2022, 13:25 PM</Text>
                </Stack>
                <Spacer />
                <FileUploader />
            </Flex>
            <InputGroup mb="45px" mt={"10px"} height="40px">
                <InputLeftElement pointerEvents='none'>
                    <Icon as={FaSearch} />
                </InputLeftElement>
                <Input width="40%" type='text' placeholder='Search file by title or reg-number' />
            </InputGroup>
        </Stack>
    )
}