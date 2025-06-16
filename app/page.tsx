import Image from "next/image";

import logo from "@/public/logo.svg";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 min-h-screen py-2">
            <Image
                src={logo}
                alt="Logo"
                width={150}
                height={150}
            />
            <div className={"flex flex-col items-center"}>
                <h1 className="text-4xl font-bold">Welcome to Access</h1>
                <p className="mt-4 text-lg">Upload materials and have people pay for it.</p>
            </div>
        </div>
    );
}
