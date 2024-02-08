import { Box, Flex } from "@chakra-ui/react";
import { yearlyData } from "./YearlyData";
import FileHighlightCard from "./FileHighlightCard";

export default function YearTwoCard() {
    return (
        <Box>
            <Flex justify="center" gap={10} wrap="wrap">
                {yearlyData.map((item) => {
                    return (
                        <>
                            <FileHighlightCard viewAction={() => alert(`You just clicked the button of ${item.yearone?.firstSemester.title}`)} title={item.yearone?.firstSemester.title} shareAction={() => alert('You can now share your photos to other classmates')} date="20/10/20" />
                        </>
                    )
                })}
            </Flex>
        </Box>
    )
} 