import {createClient} from "@/utils/supabase/server";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
    const supabase = await createClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    const jwt = session?.access_token
    const assetPath = params.path.join('/')

    const res = await fetch(`https://kiuwhqudmnaxsolairom.supabase.co/storage/v1/object/authenticated/${assetPath}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })

    const blob = await res.blob()

    return new Response(blob, {
        headers: {
            'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
        },
    })
}
