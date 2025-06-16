import PageHeader from "@/components/PageHeader";
import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";
import {createClient} from "@/utils/supabase/server";
import {getUser} from "@/utils/supabase/queries";

export default async function NewPostScreen() {
    //TODO: Return to /home if not authenticated as admin

    const supabase = await createClient();
    const user = await getUser(supabase);

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title={"New Post"} />
            {/*TODO: Add a PostEditor component with a MarkdownEditor inside. MarkdownEditor does everything now */}
            <MarkdownEditor user={user} />
        </div>
    )
}