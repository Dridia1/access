import {Home, Info, LucideIcon, Package} from "lucide-react";

export interface Route {
    name: string;
    path: string;
    icon: LucideIcon;
}

export const routes: Route[] = [
    { name: "Home", path: "/", icon: Home},
    { name: "Posts", path: "/posts", icon: Package },
    { name: "About", path: "/about", icon: Info },
];