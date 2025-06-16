import PageHeader from "@/components/PageHeader";
import {createClient} from "@/utils/supabase/server";
import {getCurrentUserProfile, getPost} from "@/utils/supabase/queries";
import {Post} from "@/types/Post";
import MarkdownPreview from "@/components/MarkdownEditor/MarkdownPreview";

interface PostScreenProps {
    postId: string;
}

export default async function PostScreen({postId}: PostScreenProps) {

    const supabase = await createClient()
    const userProfile = await getCurrentUserProfile(supabase);
    const post: Post = await getPost(supabase, postId); // Replace "1" with the actual post ID you want to fetch

    console.log(userProfile);
    console.log(post);

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title={post.title}/>
            {post.markdown && (
                <MarkdownPreview markdown={post.markdown}/>
            )}
        </div>
    )
}