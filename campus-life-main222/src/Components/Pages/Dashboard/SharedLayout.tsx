import { Box, Grid, GridItem } from "@chakra-ui/react";
import DesktopSidebar from "../../Navigation/DesktopSidebar";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./Header";
import { useAuth } from "../../Store/User/AuthContext";
import { useEffect } from "react";




export default function SharedLayout() {

    const { login } = useAuth()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            login()
        }
    })
    return (
        <Grid templateRows="100%" templateColumns={["0px", "0px", "300px 1fr"]}>
            <GridItem width="300px" position="fixed" top="0px" left={0} filter="drop-shadow(0px 2px 100px rgba(0, 0, 0, 0.10))">
                <Box display={['none', "none", "block"]}>
                    <DesktopSidebar />
                </Box>
            </GridItem>
            <GridItem gridColumnEnd={2} gridColumnStart={2} padding={["0px", "0px", "0px 70px"]} bg="#FDFDFD">
                <DashboardHeader />
                <Outlet />
            </GridItem>
        </Grid>

    )
}