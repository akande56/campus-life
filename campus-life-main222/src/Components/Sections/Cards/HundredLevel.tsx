import { Box, } from "@chakra-ui/react";
import { mediaData } from "../../../utils/mediaData";
import FilesHeaderElement from "../../Pages/Files/HeaderElement";
import ImageModal from "./CardModal";

export default function HundredLevelFiles() {
    const filteredData = mediaData.filter((item) => item.level === 100)
    return (
        <Box>
            <FilesHeaderElement level="100" semester="first" />
            <ImageModal modalData={filteredData} />
        </Box>
    )
} 