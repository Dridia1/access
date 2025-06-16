'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {createClient} from '@/utils/supabase/client'
import {type User} from '@supabase/supabase-js'
import {signout} from "@/app/login/action";

// ...

export default function AccountForm({user}: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const {data, error, status} = await supabase
                .from('profiles')
                .select(`full_name, username`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                setFullname(data.full_name)
                setUsername(data.username)
            }
        } catch (error) {
            alert('Error loading user data!' + error)
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
                                     username,
                                 }: {
        username: string | null
        fullname: string | null
    }) {
        try {
            setLoading(true)

            const {error} = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!' + error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-4 p-10">
            <div className={"hidden md:block"}>
                <ul className="menu bg-base-200 rounded-box w-56">
                    {loading && (<p>loading...</p>)}
                    <li>
                        <a href={"#email"}>
                            Email
                        </a>
                    </li>
                    <li>
                        <a href={"#name"}>
                            Full name
                        </a>
                    </li>
                    <li>
                        <a href={"#username"}>
                            Username
                        </a>
                    </li>
                    <li>
                        <a href={"#sign-out"}>
                            Sign out
                        </a>
                    </li>
                    <li>
                        <a href={"#delete-account"}>
                            Delete personal account
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-10 form-widget w-full">
                <div className="card w-full bg-base-100 card-md shadow-sm" id={"email"}>
                    <div className="card-body">
                        <h2 className="card-title">Email</h2>
                        <p>The email addresses you use to log in.</p>
                        <input className="input w-full" id="email" type="text" value={user?.email} disabled/>
                    </div>
                </div>

                <div className="card w-full bg-base-100 card-md shadow-sm">
                    <div className="card-body" id={"name"}>
                        <h2 className="card-title">Full name</h2>
                        <p>Enter your full name.</p>
                        <input
                            className="input input-primary w-full"
                            id="fullName"
                            type="text"
                            value={fullname || ''}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        <div className="justify-end card-actions">
                            <button className="btn btn-primary"
                                    onClick={() => updateProfile({fullname, username})}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card w-full bg-base-100 card-md shadow-sm">
                    <div className="card-body" id={"username"}>
                    <h2 className="card-title">Username</h2>
                    <p>Enter your preferred username.</p>
                    <input
                        className="input input-primary w-full"
                        id="username"
                        type="text"
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="justify-end card-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => updateProfile({fullname, username})}>
                            Update
                        </button>
                    </div>
                </div>
            </div>

                <div className="card w-full border-1 border-neutral bg-base-100 card-md shadow-sm">
                    <div className="card-body" id={"sign-out"}>
                        <h2 className="card-title">Sign out</h2>
                        <p>You can sign in again.</p>
                        <div className="justify-end card-actions">
                            <form>
                                <button formAction={signout} className="btn" type="submit">
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="card w-full border-1 border-error">
                <div className="card-body" id={"delete-account"}>
                        <h2 className="card-title">Delete your account</h2>
                        <p>Permanently remove your Personal Account and all of its contents from the platform. This action
                            is not reversible, so please continue with caution.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-error">Delete personal account</button>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    )
}
