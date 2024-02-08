import { Box, Flex } from "@chakra-ui/react";
import { yearlyData } from "./YearlyData";
import FileHighlightCard from "./FileHighlightCard";

interface CardProps {
    showAll: boolean;
}

export default function CardRenderers(props: CardProps) {
    const limitedData = yearlyData.slice(0, props.showAll ? 10 : 6)
    return (
        <Box>
            <Flex gap={"25px"} wrap="wrap">
                {limitedData.map((item) => {
                    return (
                        <>
                            <FileHighlightCard hasData={item.hasData} path={item.path} title={item.title} date="20/10/20" />
                        </>
                    )
                })}
            </Flex>
        </Box >
    )
} 