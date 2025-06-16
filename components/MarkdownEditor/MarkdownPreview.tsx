'use client';

export default function MarkdownPreview({markdown}) {
    return (
        <div className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg border border-gray-200"
             style={{wordBreak: "break-word"}} dangerouslySetInnerHTML={parseMarkdown(markdown)}/>
    )
}

//TODO: This will go through the markdown a bunch of times, should be optimized
export const parseMarkdown = (text) => {
    let html = text;

    // Normalize line endings for consistency
    html = html.replace(/\r\n/g, '\n');

    // Escape HTML to prevent XSS TODO: Check for a library that make this safer
    // html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Headings (#, ##, ###)
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold">$1</h1>');

    // Bold (**text**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic (*text*)
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Strikethrough (~~text~~)
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Inline quote (`text`)
    html = html.replace(/`(.*?)`/g, '<code class="bg-primary/20">$1</code>');

    // Images (![alt](url))
    html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" class="w-3/6 h-auto">'); //TODO: should it have any classes??? or just plain <img tag?

    // Links ([text](url))
    html = html.replace(/\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>');

    // Unordered lists (- item) TODO: When enter in a list, it should create a new item
    html = html.replace(/^- (.*)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul class="list-disc">$&</ul>');

    html = html.replace(/(^|\n)((?:>.*\n?)+)/g, (match, prefix, quoteBlock) => {
        // Remove '>' and trim each line, join with <br> for consecutive lines
        const lines = quoteBlock
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.replace(/^>\s*/, '').trim())
            .filter(line => line !== '');
        return prefix + (lines.length > 0 ? `<blockquote class="border-l-4 bg-gray-200 pl-4 italic">${lines.join('<br>')}</blockquote>` : '');
    });

    html = html.replace(/(^|\n)((?:[^<>\n-][^\n]*\n?)+)/g, (match, prefix, group) => {
        // If group is already HTML (starts with <), return it unchanged
        if (group.trim().startsWith('&lt;')) {
            return match;
        }

        // Trim and split non-HTML group into lines, join with spaces
        const lines = group.trim().split('\n').filter(line => line.trim() !== '');
        return prefix + (lines.length > 0 ? `<p>${lines.join(' ')}</p>` : '');
    });

    return {__html: html};
};