import AccountForm from "@/app/account/account-form";
import { type User} from "@supabase/supabase-js";
import PageHeader from "@/components/PageHeader";

export interface AccountScreenProps {
    user: User
}

export default async function AccountScreen({user}: AccountScreenProps) {
    return (
        <div className="flex flex-col gap-4">
            <PageHeader title={"Account Settings"}/>
            <AccountForm user={user} />
        </div>
    )
}