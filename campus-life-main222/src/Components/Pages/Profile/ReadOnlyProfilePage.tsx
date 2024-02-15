import { Box, Heading, Flex } from "@chakra-ui/react";
import LandingPageNavIndex from "../../Navigation/LandingpageIndex";
import UserProfile from "./Profile";
import SinglePostCardLayout from "../../Sections/Cards/SinglePostCard";
import { mediaData } from "../../../utils/mediaData";

export default function ReadOnlyProfilePage() {
    return (
        <Box>
            <LandingPageNavIndex />
            <UserProfile readonly={true} />
            <Heading p="50px 0px" textAlign="center">Isa'ac Yerima's recent uploads</Heading>
            <Flex alignSelf="center" width="100%" justify="center" align="center" gap={10} wrap="wrap">
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
        </Box>
    )
}