import { Box } from "@chakra-ui/react";
import FileUploader from "../Helpers/FileUploader";

export default function AlmanacGenerator() {
    function EmptyCase() {
        return (
            <Box>
                You have not uploaded any picture yet
                <FileUploader />
            </Box>
        )
    }
    return (
        <Box>
            <EmptyCase />
        </Box>
    )
}