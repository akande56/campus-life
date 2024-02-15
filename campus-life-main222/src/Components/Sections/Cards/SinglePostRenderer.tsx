import { Box, Flex, FlexProps, } from "@chakra-ui/react";
import SinglePostCardLayout from "./SinglePostCard";
import { mediaData } from "../../../utils/mediaData";

export default function SinglePostRenderer(props: FlexProps) {
    return (
        <Flex css={{
            '&::-webkit-scrollbar': {
                width: '0.5em',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'transparent',
            },
        }} gap={10} overflow="auto" width={props.width}>
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


