import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { yearlyData } from "./YearlyData";
import FileHighlightCard from "./FileHighlightCard";

interface CardProps extends FlexProps {
    showAll: boolean;
}

export default function CardRenderers(props: CardProps) {
    const limitedData = yearlyData.slice(0, props.showAll ? 10 : 6)
    return (
        <Box>
            <Flex overflow="hidden" padding={"20px"} justify={props.justify} align={props.align} gap={"30px"} wrap="wrap">
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