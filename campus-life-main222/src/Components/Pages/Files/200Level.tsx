import { Box, Flex } from "@chakra-ui/react";
import { mediaData } from "../../../utils/mediaData";
import FilesHeaderElement from "./HeaderElement";
import ImageModal from "../../Sections/Cards/CardModal";

export default function TwoHundredLevelFiles() {
    const filteredData = mediaData.filter((item) => item.level === 200)
    return (
        <Box>
            <FilesHeaderElement level="200" semester="first" />
            <Flex gap={10} wrap="wrap" width={"70vw"}>
                <ImageModal modalData={filteredData} />
            </Flex>
        </Box>
    )
}