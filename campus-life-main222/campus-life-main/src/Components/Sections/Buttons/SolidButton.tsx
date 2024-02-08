import { Box, Button } from "@chakra-ui/react";

interface ButtonProps {
    buttonText: string;
    onClick?: () => void;
}

export default function SolidButton(props: ButtonProps) {
    return (
        <Box>
            <Button onClick={props.onClick} borderRadius={15} height="50px" width="200px" colorScheme="teal">{props.buttonText}</Button>
        </Box>
    )
}