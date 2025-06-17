import Link from "next/link";
import {Post} from "@/types/Post";
import Image from "next/image";

interface PostCardProps {
    post: Post
}

export default async function PostCard({post}: PostCardProps) {
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const isNewPost = Date.parse(post.created_at) > Date.now() - sevenDaysInMilliseconds;

    return (
        <Link href={`/posts/${post.id}`}>
            <div className="card bg-base-100 w-auto shadow-sm cursor-pointer">
                <figure>
                    {/*<img className="aspect-16/9" height={200} src={post.thumbnail || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"} alt="Post Thumbnail"/>*/}
                    <Image
                        src={post.thumbnail || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                        alt="Post Thumbnail"
                        width={1280}
                        height={720}
                        />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {post.title}
                        {isNewPost && (
                            <div className="badge badge-secondary">NEW</div>
                        )}
                    </h2>
                    <p>{post.description}</p>
                    <div className="card-actions justify-end">
                        {post.tags.map((tag, index) => (
                            <div key={index} className="badge badge-outline">{tag}</div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
