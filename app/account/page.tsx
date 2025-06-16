import { createClient } from '@/utils/supabase/server'
import {redirect} from "next/navigation";
import AccountScreen from "@/components/screens/AccountScreen";
export default async function AccountPage() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return <AccountScreen user={user} />
}