import logo from "@/public/logo.svg";
import Image from "next/image";
import {routes} from "@/utils/routes";
import Link from "next/link";

// @ts-expect-error fix later
export default function Navbar({children}) {

    const renderNavItems = (iconSize: number = 20) => {
        return routes.map(({name, path, icon: Icon}) => (
            <li key={path}>
                <Link href={path}>
                    <Icon size={iconSize}/>
                    {name}
                </Link>
            </li>
        ));
    }

    return (
        <div className="navbar justify-between bg-base-100 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-60 p-2 shadow">
                        {renderNavItems(20)}
                    </ul>
                </div>
                <Link href={"/"}
                    className="flex justify-center items-center gap-3 cursor-pointer">
                    <Image src={logo} alt={"Logo"} width={40} height={40}/>
                    <span className={"text-xl font-sans"}>Access</span>
                </Link>
            </div>

            <div className="hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {renderNavItems()}
                </ul>
            </div>

            {children}
        </div>
    )
}
