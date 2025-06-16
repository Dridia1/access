'use client';

interface PostCardPreviewProps {
    post: {
        title: string
        description: string
        tags: string[]
        thumbnail: string
    }
}

export default function PostCardPreview({post}: PostCardPreviewProps) {

    console.log("PostCardPreview", post);

    return (
        <div className="card bg-base-100 w-auto shadow-sm cursor-pointer">
            <figure>
                <img className={"aspect-16/9"} src={post.thumbnail} alt={"preview image"} height={"200"}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title break-word">
                    {post.title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p className={"break-all"}>{post.description}</p>
                <div className="card-actions justify-end">
                    {post.tags.map((tag, index) => (
                        <div key={index} className="badge badge-outline">{tag}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}
