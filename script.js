let htmlEditor, cssEditor, jsEditor;

// Función para inicializar Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' }});
require(['vs/editor/editor.main'], function() {
    // Inicializar editor HTML
    htmlEditor = monaco.editor.create(document.getElementById('htmlEditor'), {
        value: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Página</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>¡Hola desde HTML!</h1>
    <p>Este es un párrafo de ejemplo.</p>
    <button id="miBoton">Haz clic</button>
    <script src="script.js"></script>
</body>
</html>`,
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoClosingTags: true,
        autoIndent: 'full'
    });

    // Inicializar editor CSS
    cssEditor = monaco.editor.create(document.getElementById('cssEditor'), {
        value: `body { 
    background-color: #f0f8ff; 
    color: #333; 
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 20px;
} 

h1 { 
    color: #2c3e50; 
    font-size: 2.5em; 
    margin-bottom: 10px;
    text-align: center;
} 

p { 
    color: #7f8c8d; 
    font-size: 1.2em;
    text-align: center;
    margin-bottom: 20px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: block;
    margin: 0 auto;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}`,
        language: 'css',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoIndent: 'full'
    });

    // Inicializar editor JavaScript
    jsEditor = monaco.editor.create(document.getElementById('jsEditor'), {
        value: `document.addEventListener('DOMContentLoaded', () => {
    console.log('¡Página creada con IA y lista!');
    
    const button = document.getElementById('miBoton');
    if (button) {
        button.addEventListener('click', () => {
            // Crear un efecto visual
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
            
            alert('¡Has hecho clic en el botón!');
        });
    }
});`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoIndent: 'full'
    });

    // Escuchar cambios en los editores y actualizar la vista previa
    htmlEditor.onDidChangeModelContent(updatePreview);
    cssEditor.onDidChangeModelContent(updatePreview);
    jsEditor.onDidChangeModelContent(updatePreview);

    // Inicializar la vista previa al cargar los editores
    updatePreview();
});

// Función para actualizar la vista previa
function updatePreview() {
    const html = htmlEditor ? htmlEditor.getValue() : '';
    const css = cssEditor ? cssEditor.getValue() : '';
    const js = jsEditor ? jsEditor.getValue() : '';
    
    const preview = document.getElementById('previewFrame');
    const doc = preview.contentDocument || preview.contentWindow.document;
    
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vista Previa</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `);
    doc.close();
}

// Función para descargar la página completa como HTML único
function downloadPage() {
    const html = htmlEditor ? htmlEditor.getValue() : '';
    const css = cssEditor ? cssEditor.getValue() : '';
    const js = jsEditor ? jsEditor.getValue() : '';
    
    const fullPage = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Web Generada</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}<\/script>
</body>
</html>`;
    
    const blob = new Blob([fullPage], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pagina_web_generada.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Función para descargar el proyecto como ZIP
function downloadZip() {
    const html = htmlEditor ? htmlEditor.getValue() : '';
    const css = cssEditor ? cssEditor.getValue() : '';
    const js = jsEditor ? jsEditor.getValue() : '';
    
    // Crear instancia de JSZip
    const zip = new JSZip();
    
    // Agregar archivos al ZIP
    zip.file("index.html", html);
    zip.file("styles.css", css);
    zip.file("script.js", js);
    
    // Crear archivo README con instrucciones
    const readmeContent = `# Proyecto Web Generado

Este proyecto contiene los siguientes archivos:

- **index.html**: Archivo HTML principal
- **styles.css**: Hoja de estilos CSS
- **script.js**: Código JavaScript
- **README.md**: Este archivo con instrucciones

## Cómo usar:

1. Abre el archivo \`index.html\` en tu navegador web
2. Los archivos CSS y JS se cargarán automáticamente
3. Puedes modificar cualquier archivo según tus necesidades

## Estructura del proyecto:

\`\`\`
proyecto-web/
├── index.html
├── styles.css
├── script.js
└── README.md
\`\`\`

¡Disfruta tu nueva página web!
`;
    
    zip.file("README.md", readmeContent);
    
    // Generar y descargar el ZIP
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'proyecto-web.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

/* --- Lógica de Redimensionamiento Horizontal (Editor vs. Preview) --- */
const resizerHorizontal = document.getElementById('resizerHorizontal');
const editorPanel = document.getElementById('editorPanel');
const previewPanel = document.getElementById('previewPanel');
const container = document.querySelector('.container');

let isResizingHorizontal = false;

resizerHorizontal.addEventListener('mousedown', (e) => {
    isResizingHorizontal = true;
    document.body.style.cursor = 'ew-resize';
    container.style.userSelect = 'none';
    container.style.pointerEvents = 'none';
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isResizingHorizontal) return;

    const isColumnLayout = window.matchMedia("(max-width: 768px)").matches;

    if (isColumnLayout) {
        const containerRect = container.getBoundingClientRect();
        const newHeight = e.clientY - containerRect.top;
        const totalHeight = containerRect.height;
        const editorHeightPercentage = (newHeight / totalHeight) * 100;
        
        if (editorHeightPercentage > 10 && editorHeightPercentage < 90) {
            editorPanel.style.height = `${editorHeightPercentage}%`;
            previewPanel.style.height = `${100 - editorHeightPercentage}%`;
        }
    } else {
        const containerRect = container.getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left;
        const totalWidth = containerRect.width;
        const editorWidthPercentage = (newWidth / totalWidth) * 100;
        
        if (editorWidthPercentage > 10 && editorWidthPercentage < 90) {
            editorPanel.style.width = `${editorWidthPercentage}%`;
            previewPanel.style.width = `${100 - editorWidthPercentage}%`;
            
            if (htmlEditor) htmlEditor.layout();
            if (cssEditor) cssEditor.layout();
            if (jsEditor) jsEditor.layout();
        }
    }
});

document.addEventListener('mouseup', () => {
    if (isResizingHorizontal) {
        isResizingHorizontal = false;
        document.body.style.cursor = 'default';
        container.style.userSelect = 'auto';
        container.style.pointerEvents = 'auto';
    }
});

/* --- Lógica de Redimensionamiento Vertical (entre editores) --- */
function setupVerticalResizer(resizerId, topEditorContainerId, bottomEditorContainerId) {
    const resizer = document.getElementById(resizerId);
    const topEditorContainer = document.getElementById(topEditorContainerId);
    const bottomEditorContainer = document.getElementById(bottomEditorContainerId);

    let isResizingVertical = false;
    let startY;
    let initialTopHeightPx;
    let initialBottomHeightPx;
    let totalCombinedHeight;

    resizer.addEventListener('mousedown', (e) => {
        isResizingVertical = true;
        startY = e.clientY;
        
        const topRect = topEditorContainer.getBoundingClientRect();
        const bottomRect = bottomEditorContainer.getBoundingClientRect();
        
        initialTopHeightPx = topRect.height;
        initialBottomHeightPx = bottomRect.height;
        totalCombinedHeight = initialTopHeightPx + initialBottomHeightPx;
        
        document.body.style.cursor = 'ns-resize';
        container.style.userSelect = 'none';
        container.style.pointerEvents = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizingVertical) return;

        const deltaY = e.clientY - startY;
        const newTopHeightPx = Math.max(50, Math.min(totalCombinedHeight - 50, initialTopHeightPx + deltaY));
        const newBottomHeightPx = totalCombinedHeight - newTopHeightPx;

        topEditorContainer.style.height = `${newTopHeightPx}px`;
        bottomEditorContainer.style.height = `${newBottomHeightPx}px`;

        // Redimensionar editores de Monaco
        if (topEditorContainerId === 'htmlEditor' && htmlEditor) htmlEditor.layout();
        if (topEditorContainerId === 'cssEditor' && cssEditor) cssEditor.layout();
        if (bottomEditorContainerId === 'cssEditor' && cssEditor) cssEditor.layout();
        if (bottomEditorContainerId === 'jsEditor' && jsEditor) jsEditor.layout();
    });

    document.addEventListener('mouseup', () => {
        if (isResizingVertical) {
            isResizingVertical = false;
            document.body.style.cursor = 'default';
            container.style.userSelect = 'auto';
            container.style.pointerEvents = 'auto';
        }
    });
}

// Configurar redimensionadores verticales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setupVerticalResizer('resizerHtmlCss', 'htmlEditor', 'cssEditor');
    setupVerticalResizer('resizerCssJs', 'cssEditor', 'jsEditor');
});

