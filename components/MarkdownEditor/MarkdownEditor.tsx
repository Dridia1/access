'use client';

import MarkdownEditorToolbar from "@/components/MarkdownEditor/MarkdownEditorToolbar";
import {useEffect, useRef, useState} from "react";
import MarkdownPreview from "@/components/MarkdownEditor/MarkdownPreview";
import {Plus} from "lucide-react";
import {Post} from "@/types/Post";
import {createClient} from "@/utils/supabase/client";
import {User} from "@supabase/supabase-js";
import PostCardPreview from "@/components/PostCardPreview";
import {uploadFile} from "@/utils/supabase/queries";


interface MarkdownEditorProps {
    user?: User | null;
}

export default function MarkdownEditor({user}: MarkdownEditorProps) {
    const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Editor
    Type your Markdown to the left and see the changes live here.`);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPaidPost, setIsPaidPost] = useState(true);
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    //TODO: Add const [tags, setTags] = useState<string[]>([]);
    //TODO: Add so that posts are stored in session, not in state, so that they can be submitted later and not lost on refresh
    //TODO: When uploading an images, show some kind of indicator

    const [cursorPosition, setCursorPosition] = useState([0, 0]); // [line, column]
    const textareaRef = useRef(null);

    const supabase = createClient()

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.selectionStart = cursorPosition[0];
        textarea.selectionEnd = cursorPosition[1];
    }, [cursorPosition]);

    const publishNewPost = async () => {
        const post: Post = {
            title: title,
            description: description,
            markdown: markdown,
            is_premium: isPaidPost,
            thumbnail: thumbnail,
            tags: [],
            user_id: user?.id || '',
        }

        const {error} = await supabase.from('posts').insert(post);
        if (error) {
            console.error("Error creating post:", error);
            return;
        }

    }

    const insertStringStartOfLine = (ta, string) => {
        const pos = ta.selectionStart;
        const textUptoCursor = ta.value.substring(0, pos);
        const currentLineStartPos = textUptoCursor.lastIndexOf('\n') + 1;

        // Insert the string at the start of the current line
        const newText = ta.value.slice(0, currentLineStartPos) + string + ta.value.slice(currentLineStartPos);

        // Update the textarea value and cursor position
        ta.value = newText;
        ta.selectionStart = ta.selectionEnd = currentLineStartPos + string.length;
    }

    const insertMarkdown = (type, before, after = '') => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (type === 'prefix') {
            insertStringStartOfLine(textarea, before);
            setCursorPosition([start + before.length, end + before.length]); //TODO: Duplicate
        } else if (type === 'wrap') {

            const selectedText = textarea.value.substring(start, end);
            textarea.setRangeText(before + selectedText + after, start, end, 'select');
            setCursorPosition([start + before.length, end + after.length]); //TODO: Duplicate

        } else if (type === 'table') {
            const table = '\n| Column 1 | Column 2 |\n| --------- | --------- |\n| Row1 | Row2 |\n';

            const endPosCurrentLine = textarea.value.indexOf('\n', end);

            if (endPosCurrentLine === -1) {
                textarea.value = textarea.value + table;
            } else {
                textarea.setRangeText(table, endPosCurrentLine, endPosCurrentLine, 'select');
            }

        } else {
            // No selection for wrap, or invalid type; do nothing
            return;
        }

        setMarkdown(textarea.value);
        textarea.focus();

    };

    const uploadThumbnail = async (event) => {
        if (event.target.files && event.target.files[0]) {
            setThumbnail(URL.createObjectURL(event.target.files[0]));
            const path = new Date().toISOString().split('T')[0] + '/thumbnail';
            const file = await uploadFile(supabase, event.target.files[0], 'posts', path);
            if (file) {
                console.log("File uploaded successfully:", file);
                setThumbnail('/api/media/' + file.fullPath);
            } else {
                console.error("Failed to upload file");
            }
        }
    }

    return (
        <div className={"flex flex-row p-6 gap-2"}>
            <div className="flex-1 flex-col gap-4 bg-white">
                <div className={"flex flex-col sm:flex-row gap-2"}>
                    <div className={"flex flex-col w-full sm:w-1/2 "}>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-nowrap text-lg">What should your title be?</legend>
                            <input id="title" type="text" className="input text-lg w-full"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                                   placeholder="Title here"/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-nowrap text-lg">What should your description be?</legend>
                            <input id="description" type="text" className="input text-lg w-full"
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                                   placeholder="Description here"/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-nowrap text-lg">Pick a thumbnail</legend>
                            <input type="file" accept="image/*"  className="file-input w-full" onChange={uploadThumbnail}/>
                        </fieldset>
                    </div>
                    <div className={"w-full sm:w-1/2 "}>
                        <legend className="fieldset-legend text-nowrap text-lg">This is how the card will look like</legend>
                        <PostCardPreview post={{
                            title: title || "Your Post Title",
                            description: description || "Your post description goes here.",
                            tags: [],
                            thumbnail: thumbnail ? thumbnail : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        }}
                        />
                    </div>
                </div>
                <div className="divider"/>
                <label className="label">
                <input type="checkbox" checked={isPaidPost} onChange={(e) => setIsPaidPost(e.target.checked)}
                           className="toggle toggle-success"/>
                    {isPaidPost ? "Paid Post" : "Free Post"}
                </label>
                <MarkdownEditorToolbar insertMarkdown={insertMarkdown}/>
                <textarea
                    ref={textareaRef}
                    id="markdown"
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your content here..."
                ></textarea>
                <button
                    onClick={publishNewPost}
                    type={"submit"}
                    className="btn btn-primary mt-4">
                    <Plus/>
                    Submit Post
                </button>
            </div>
            <div className={"hidden lg:block flex-1"}>
                <MarkdownPreview markdown={markdown}/>
            </div>
        </div>

    )
}
