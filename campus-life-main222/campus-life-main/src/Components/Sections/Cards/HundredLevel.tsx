import { Box, Flex, } from "@chakra-ui/react";
import SinglePostCardLayout from "./SinglePostCard";
import { mediaData } from "../../../utils/mediaData";
import FilesHeaderElement from "../../Pages/Files/HeaderElement";

export default function HundredLevelFiles() {
    const filteredData = mediaData.filter((item) => item.level === 100)
    return (
        <Box>
            <FilesHeaderElement level="100" semester="first" />
            <Flex gap={10} wrap="wrap" width={"70vw"}>
                {
                    filteredData.map((item) => {
                        return (
                            <Box key={item.id}>
                                <SinglePostCardLayout name={item.user} date={item.date} title={item.title} image={item.image} />
                            </Box>
                        )
                    })
                }
            </Flex>
        </Box>
    )
} 