import { Box, Flex, Stack, Heading, Text, Spacer, Image, Button } from "@chakra-ui/react";
// import { mediaData } from "../../../utils/mediaData";
import HighlightCarousel from "../../Sections/Slider/Carousel";
import { subColor } from "../../Core/Colors/colors";
import FileUploader from "../../Core/Helpers/FileUploader";
import AlmanacDownloader from "../../Core/AlmanacGenerator/Downloader";
import { uploadedImages } from "../../../utils/mediaExport";
// import ImageModal from "../../Sections/Cards/CardModal";
import {  useState } from "react";
import axios from "axios";
import { BaseApiUrl } from "../../../utils/envKeys/keys";

interface dbImageProp {
    id: string;
    experience: string;
    createdAt: string;
    image_url: string;
}

export default function AllFilesPage() {

    const [dbImages] = useState<dbImageProp[]>()

    async function getImages() {
        try {
            const response = await axios.get(
                BaseApiUrl + "api/v1/student/semester/experiences/",
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                    }
                }

            )
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Box>
            <Stack mt="55px" wrap="wrap">
                <Flex padding={["0px 15px", '20px', "10px"]} wrap="wrap">
                    <Stack>
                        <Heading textTransform="capitalize" fontWeight={700} fontSize="24px">Your Uploaded files</Heading>
                        <Text color={subColor}>Sep 25, 2022, 13:25 PM</Text>
                    </Stack>
                    <Spacer />
                    <FileUploader />
                </Flex>
                <AlmanacDownloader imageUrls={uploadedImages} />
            </Stack>

            <HighlightCarousel />
            <Button onClick={getImages}>Get Images</Button>
            {/* <ImageModal modalData={mediaData} /> */}
            {dbImages?.map((items) => {
                return (
                    <Box key={items.id}>
                        <Image src={items.image_url} />
                    </Box>
                )
            })}
        </Box>
    )
}