import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Student1 from "../../../assets/student1.jpg"
import Student2 from "../../../assets/student1.jpg"
import Student3 from "../../../assets/thirrdStudent.jpg"
import { Link } from "react-router-dom";
import PreviewCardLayout from "./FileCardLayout";

export default function PhotoHighlightCard() {
    const [bgImage, setBgImage] = useState("")
    const defImages = [Student1, Student2, Student3]

    useEffect(() => {
        setBgImage(defImages[1])
    }, [])
    
    return (
        <PreviewCardLayout bgImage={bgImage} cardLabel="Your campus highlights" children={
            <>
                <Link to="/my-uploads">
                    <Button>Explore</Button>
                </Link>
            </>
        }>

        </PreviewCardLayout>
    )
}