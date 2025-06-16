import Link from "next/link";
import {createClient} from "@/utils/supabase/server";
import {signout} from "@/app/login/action";

export default async function User() {

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const renderSignInButton = () => {
        return (
            <Link href={"/login"} className="btn btn-primary">
                Sign in
            </Link>
        );
    }

    const renderMyAccountButton = () => {
        return (
            <div className="dropdown dropdown-end">
                <div className="dropdown">
                    <button tabIndex={0} className="btn">
                        My Account
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Subscription
                                <span className="badge">Premium</span>
                            </a>
                        </li>
                        <li><Link href={"/account"}>Settings</Link></li>
                        <li>
                            <form  action={signout}>
                                <button type="submit">Sign out</button>
                            </form>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }

    return (
        <div className="">
            {user ? renderMyAccountButton() : renderSignInButton()}
        </div>
    );
}