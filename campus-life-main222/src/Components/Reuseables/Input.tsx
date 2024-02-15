import { Box, Input, InputProps } from "@chakra-ui/react";




export default function CustomInput(props: InputProps) {


    return (
        <Box>
            <Input height="47px" onChange={props.onChange} name={props.name} value={props.value} type={props.type} />
        </Box>
    )
}