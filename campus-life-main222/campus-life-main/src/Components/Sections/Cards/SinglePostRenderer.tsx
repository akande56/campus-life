import { Box, Flex, } from "@chakra-ui/react";
import SinglePostCardLayout from "./SinglePostCard";
import { mediaData } from "../../../utils/mediaData";

export default function SinglePostRenderer() {
    return (
        <Flex css={{
            '&::-webkit-scrollbar': {
                width: '0.5em',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'transparent',
            },
        }} gap={10} overflow="auto" width={"70vw"}>
            {
                mediaData.map((item) => {
                    return (
                        <Box key={item.id}>
                            <SinglePostCardLayout name={item.user} date={item.date} title={item.title} image={item.image} />
                        </Box>
                    )
                })
            }
        </Flex>
    )
}


