import {
    Bold,
    Heading1,
    Heading2,
    Heading3, Image as ImagesIcon,
    Italic,
    Link as LinkIcon,
    List, MessageSquareQuote,
    Quote,
    Strikethrough,
    Table
} from "lucide-react";
import {createClient} from "@/utils/supabase/client";
import {useState} from "react";

interface MarkdownEditorToolbarProps {
    insertMarkdown: (type: 'prefix' | 'wrap' | 'table', start: string, end?: string) => void;
}

export default function MarkdownEditorToolbar({insertMarkdown}: MarkdownEditorToolbarProps) {
    const supabase = createClient()

    const uploadImagePublic = async (file) => {
        const uploadFile = file.target.files[0];
        const fileName = uploadFile.name;
        // const fileType = uploadFile.type; TODO: Use this to determine if an image or not
        const {data, error} = await supabase
            .storage
            .from('posts')
            .upload(`${new Date().toISOString().split('T')[0]}/${fileName}`, uploadFile, {
                cacheControl: '3600',
                upsert: false
            })
        if (error) {
            console.error("Error uploading file:", error);
            return;
        } else {
            const resp = await fetch("/api/media/" + data?.fullPath)
            const blob = await resp.blob();

            insertMarkdown('wrap', `![${fileName}](/api/media/${data?.fullPath})`, '');
        }
    }

    const buttons = [
        {icon: <Heading1 size={20}/>, tooltip: 'Insert Heading', action: () => insertMarkdown('prefix', '# ', '')},
        {icon: <Heading2 size={20}/>, tooltip: 'Insert Heading 2', action: () => insertMarkdown('prefix', '## ', '')},
        {icon: <Heading3 size={20}/>, tooltip: 'Insert Heading 3', action: () => insertMarkdown('prefix', '### ', '')},
        {icon: <Heading3 size={20}/>, tooltip: 'Insert Heading 3', action: () => insertMarkdown('prefix', '### ', '')},
        {icon: <Heading3 size={20}/>, tooltip: 'Insert Heading 3', action: () => insertMarkdown('prefix', '### ', '')},
        {icon: <Bold size={20}/>, tooltip: 'Insert bold text', action: () => insertMarkdown('wrap', '**', '**')},
        {icon: <Italic size={20}/>, tooltip: 'Insert italic text', action: () => insertMarkdown('wrap', '_', '_')},
        {
            icon: <Strikethrough size={20}/>,
            tooltip: 'Insert strikethrough text',
            action: () => insertMarkdown('wrap', '~~', '~~')
        },
        {
            icon: <MessageSquareQuote size={20}/>,
            tooltip: 'Insert inline quote',
            action: () => insertMarkdown('wrap', '`', '`')
        },
        {icon: <Quote size={20}/>, tooltip: 'Insert blockquote', action: () => insertMarkdown('prefix', '> ')},
        {icon: <List size={20}/>, tooltip: 'Insert bullet list', action: () => insertMarkdown('prefix', '- ')},
        // {icon: <Table size={20}/>, tooltip: 'Insert table', action: () => insertMarkdown('table')},
        {
            icon: <LinkIcon size={20}/>,
            tooltip: 'Insert link',
            action: () => insertMarkdown('wrap', '[', '](https://example.com)')
        },
    ];

    return (
        <div className={"flex flex-wrap"}>
            {buttons.map((button, index) => (
                <div key={index} className="tooltip " data-tip={button.tooltip}>
                    <button onClick={button.action} className="btn btn-ghost btn-sm btn-square">
                        {button.icon}
                    </button>
                </div>
            ))}
            <div className="tooltip " data-tip={"Insert and upload image visible to the public"}>
                <label htmlFor={"file-upload"} className="btn btn-ghost btn-sm btn-square">
                    <ImagesIcon size={20}/>
                </label>
                <input id={"file-upload"} style={{display: "none"}} type="file" onChange={uploadImagePublic}/>
            </div>
        </div>
    )
}