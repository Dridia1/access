interface SupabaseImage{
    src: string;
    width: number;
    quality?: number;
}

export default function supabaseLoader({ src, width, quality }: SupabaseImage): string {
    return `${src}?width=${width}&quality=${quality || 75}`
}
