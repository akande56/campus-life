import { Box, Stack, Text } from "@chakra-ui/react"
import FileUploader from "../../Core/Helpers/FileUploader"
import { primaryColor } from "../../Core/Colors/colors"
import Carousel from "../../Sections/Slider/Carousel"

export default function UploadsPage() {
    const fileLength = 1
    return (
        <Box>
            <section>
                <Carousel />
            </section>
            <section>
                <Stack justify="center" align="center" width="auto" p={10} m={10} border={`1px dashed ${primaryColor}`}>
                    {fileLength < 1 && <Text color="red">You have not uploaded any picture yet</Text>}
                    <FileUploader />
                </Stack>
            </section>
        </Box>
    )
}