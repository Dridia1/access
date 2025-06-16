export type Post = {
    id: string;
    title: string;
    description: string;
    markdown: string;
    is_premium: boolean;
    created_at: string;
    thumbnail: string | null;
    tags: string[];
    user_id: string;
}