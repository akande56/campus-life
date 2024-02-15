import JSZip from 'jszip';
import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { primaryColor } from '../Colors/colors';

interface DownloadrProps {
    imageUrls: string[];
}

export default function AlmanacDownloader(props: DownloadrProps) {

    const [isAlmanacReady, setIsAlmanacReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const downloadImages = async () => {
        try {
            const zip = new JSZip();
            const promises: Promise<void>[] = [];
            props.imageUrls.forEach((imageUrl, index) => {
                promises.push(
                    fetch(imageUrl)
                        .then(response => response.blob())
                        .then(blob => {
                            const filename = `image_${index + 1}.jpg`;
                            zip.file(filename, blob);
                        })
                );
            });

            await Promise.all(promises);

            zip.generateAsync({ type: 'blob' }).then(content => {
                const url = URL.createObjectURL(content);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Campus-Life-Almanac.zip';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

        } catch (error) {
            console.error('Error downloading images:', error);
        }
    };


    function handleAlamanacGen() {
        setIsLoading(true)
        console.log(isLoading)
        setTimeout(() => {
            setIsAlmanacReady(true)
        }, 5000);
        // setIsLoading(false)
    }


    return (
        <Box>
            {isAlmanacReady && <Button bg={primaryColor} onClick={() => downloadImages()}>Download Almanac as Zip</Button>}
            {!isAlmanacReady && <Button bg={primaryColor} loadingText="Generating Almanac" isLoading={isLoading} onClick={() => handleAlamanacGen()}>Generate Almanac</Button>}
        </Box>
    );
}