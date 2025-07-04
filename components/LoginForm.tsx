import UsernameInput from "@/components/ui/UsernameInput";
import PasswordInput from "@/components/ui/PasswordInput";
import {login} from "@/app/login/action";

export default function LoginForm() {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <form>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Login to Access</h2>
                    <p>Login with your Apple or Google account</p>
                    <button className="btn bg-white text-black border-[#e5e5e5] w-full">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                <path fill="#ea4335"
                                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                            </g>
                        </svg>
                        Sign in with Google
                    </button>
                    <button className="btn bg-black text-white border-black w-full">
                        <svg aria-label="Apple logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 1195 1195">
                            <path fill="white"
                                  d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"></path>
                        </svg>
                        Sign in with Apple
                    </button>
                    <div className="divider">Or continue with</div>
                    <UsernameInput name={"email"}/>
                    <PasswordInput name={"password"}/>
                    <div className="card-actions w-full">
                        <button formAction={login} className="btn btn-primary w-full">Sign in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}