import { MdOutlineStarPurple500 } from "react-icons/md";
import { RiFolderSettingsFill, RiDeleteBin5Fill, RiShareFill } from "react-icons/ri";
import { FaFolderOpen } from "react-icons/fa";
import { HiHome } from "react-icons/hi";


export const navItems = [
    { id: 1, path: "dashboard", title: "Home", icon: HiHome },
    { id: 2, path: "dashboard", title: "My Files", icon: FaFolderOpen },
    { id: 3, path: "dashboard", title: "Starred", icon: MdOutlineStarPurple500 },
    { id: 4, path: "dashboard", title: "Files Requests", icon: RiFolderSettingsFill },
    { id: 5, path: "dashboard", title: "Shared", icon: RiShareFill },
    { id: 6, path: "dashboard", title: "Deleted", icon: RiDeleteBin5Fill },
]