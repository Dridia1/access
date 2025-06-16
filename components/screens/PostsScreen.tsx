import PageHeader from "@/components/PageHeader";
import {createClient} from "@/utils/supabase/server";
import PostCard from "@/components/PostCard";
import {Plus} from "lucide-react";
import {getUser} from "@/utils/supabase/queries";
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function PostsScreen() {
    const supabase = await createClient()

    const user = await getUser(supabase);

    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    const {data: userProfile, error: userProfileError} = await supabase.from('profiles').select(`*`).eq('id', user?.id).single()

    const renderPosts = data?.map((post) =>
        <PostCard key={post.id} post={post} />
    );

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title={"Posts"}>
                {userProfile.is_admin && (
                    <Link href="/posts/new">
                    <button
                        className={"btn btn-primary mt-2"}>
                        <Plus/> Create new post
                    </button>
                    </Link>
                )}
            </PageHeader>
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-4"}>
                {renderPosts}
            </div>
        </div>
    )
}