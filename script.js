const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const preview = document.getElementById('preview');

function updatePreview() {
    const documentContent = `
        <html>
            <head>
                <style>${cssCode.value}</style>
            </head>
            <body>
                ${htmlCode.value}
                <script>${jsCode.value}</script>
            </body>
        </html>
    `;
    preview.srcdoc = documentContent;
}

htmlCode.addEventListener('input', updatePreview);
cssCode.addEventListener('input', updatePreview);
jsCode.addEventListener('input', updatePreview);

htmlCode.addEventListener('input', (e) => {
    // Simple and naive auto-closing tag implementation
    if (e.inputType === 'insertText' && e.data === '>') {
        const text = htmlCode.value;
        const cursorPos = htmlCode.selectionStart;
        const textBeforeCursor = text.slice(0, cursorPos);
        const lastOpeningTagMatch = textBeforeCursor.match(/<([a-zA-Z0-9]+)(?![^>]*\/>)[^>]*$/);

        if (lastOpeningTagMatch) {
            const tagName = lastOpeningTagMatch[1];
            // Tags that shouldn't be auto-closed
            const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
            if (!selfClosingTags.includes(tagName.toLowerCase())) {
                const closingTag = `</${tagName}>`;
                const textAfterCursor = text.slice(cursorPos);
                htmlCode.value = textBeforeCursor + closingTag + textAfterCursor;
                // Move cursor back inside the tags
                htmlCode.selectionStart = cursorPos;
                htmlCode.selectionEnd = cursorPos;
            }
        }
    }
    updatePreview();
});

// Initial preview update
updatePreview();