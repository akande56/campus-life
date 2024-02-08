import { Flex, Button, ButtonProps } from "@chakra-ui/react";


interface SolidButtonProps extends ButtonProps {
    buttonText: string;
}

export default function SolidButton(props: SolidButtonProps) {

    return (
        <Flex>
            <Button fontSize={props.fontSize} isLoading={props.isLoading} height="47px" bgColor={"#2BE4AC"} type={props.type} width="100%">{props.buttonText}</Button>
        </Flex>
    )
}