import {createClient} from "@/utils/supabase/server";
import {Plus} from "lucide-react";
import Link from "next/link";

export interface PageHeaderProps {
    title: string
    children?: React.ReactNode
}

export default async function PageHeader({title, children}: PageHeaderProps) {

    return (
        <div
            className="flex flex-row items-center justify-between w-full dark:bg-gray-800 border-accent dark:border-gray-700 border-b-1 p-5">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {title}
            </h1>
            {children}
        </div>
    )
}