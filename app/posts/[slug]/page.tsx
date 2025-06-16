import PostScreen from "@/components/screens/PostScreen";

export default async function Post({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {

    const {slug} = await params;

    console.log(`Fetching post with slug: ${slug}`);

    return <PostScreen postId={slug}/>
}
