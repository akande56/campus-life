import { Grid, GridItem, } from "@chakra-ui/react";
import DesktopSidebar from "../../Navigation/DesktopSidebar";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./Header";




export default function SharedLayout() {
    return (
        <Grid templateRows="100%" templateColumns="262px 1fr">
            <GridItem filter="drop-shadow(0px 2px 100px rgba(0, 0, 0, 0.10))" >
                <DesktopSidebar />
            </GridItem>
            <GridItem padding="0px 70px" bg="#FDFDFD">
                <DashboardHeader />
                <Outlet />
            </GridItem>
        </Grid>
    )
}