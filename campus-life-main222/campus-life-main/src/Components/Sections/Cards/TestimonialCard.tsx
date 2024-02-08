import { Stack, Text, HStack, Image, useMediaQuery, StackProps } from "@chakra-ui/react";


interface TestimonialCardProps extends StackProps {
    clientImage: string;
    message: string;
    clientName: string;
}

export default function TestimonialCard(props: TestimonialCardProps) {
    const [isMobile] = useMediaQuery('(max-width: 650px)')

    return (
        <HStack height="100%" align="center" ml={props.ml} gap="60px" wrap="wrap">
            <Image objectFit="cover" width="300px" height="300px" borderRadius="50%" alt={props.clientName + "'s photo"} src={props.clientImage} />
            <Stack width={isMobile ? "300px" : "420px"}>
                <Text fontSize="18px">
                    {props.message}
                </Text>
                <Text color="#2D2D2D" fontSize="23px">{props.clientName}</Text>
            </Stack>
        </HStack>
    )
}