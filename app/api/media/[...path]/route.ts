import {createClient} from "@/utils/supabase/server";
import {NextRequest} from "next/server";


export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const supabase = await createClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    const jwt = session?.access_token
    const param = await params
    const assetPath = await param.path.join('/')

    const res = await fetch(`https://kiuwhqudmnaxsolairom.supabase.co/storage/v1/object/authenticated/${assetPath}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })

    console.log("[FETCH] fetching image: ", res)

    const blob = await res.blob()

    console.log("[RESPONSE] fetching image: ", res)

    return new Response(blob, {
        headers: {
            'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
        },
    })
}
