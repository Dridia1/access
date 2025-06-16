import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import {Post} from "@/types/Post";

export const getUser = cache(async (supabase: SupabaseClient) => {
    const {
        data: { user }
    } = await supabase.auth.getUser();
    return user;
});

export const getCurrentUserProfile = cache(async (supabase: SupabaseClient) => {
    //TODO: Doublecheck this method....
    const user = await getUser(supabase);
    if (!user) {
        return null; // or throw an error if you prefer
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        throw error;
    }

    return data;
});

export const getUserProfile = cache(async (supabase: SupabaseClient, userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        throw error;
    }

    return data;
});

export async function createPost(supabase: SupabaseClient, post: Post) {
    const response = await supabase.from('posts').insert(post);
    return response; //TODO: Revalidate cache!!
};

export const getPosts = cache(async (supabase: SupabaseClient/*, page: something something?*/) => {
    //TODO: fetch posts limit 10-20.
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (error) {
        throw error;
    }
    return data;
});

export const getPost = cache(async (supabase: SupabaseClient, id: string) => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) {
        throw error;
    }
    return data;
});

export const uploadFile = async (supabase: SupabaseClient, file: File, bucket: string, path: string): Promise<{ id: string; path: string; fullPath: string }>  => {
    console.log("Uploading file to Supabase Storage");
    const fileName = file.name;
    // const fileType = file.type; TODO: Use this to determine if an image or not
    const {data, error} = await supabase
        .storage
        .from(bucket)
        .upload(`${path}/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false
        })
    if (error) {
        console.error("Error uploading file:", error);
        throw error;
    } else {
        return data
    }
};


// export const getMaterials = cache(async (supabase: SupabaseClient) => {
//
// });
