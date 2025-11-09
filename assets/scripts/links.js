function parseCustomLinks(text) {
    const linkRegex = /\[([^\]]+)\]\{([^}]+)\}/g;
    
    return text.replace(linkRegex, '<a href="$2" target="_blank">$1</a>');
}

function renderTemplate(templateId, data) {
    const template = document.getElementById(templateId);
    if (!template) return '';
    
    let html = template.innerHTML;
    
    for (const [key, value] of Object.entries(data)) {
        if (key === 'text') {
            const processedText = parseCustomLinks(value);
            html = html.replace(new RegExp(`{${key}}`, 'g'), processedText);
        } else {
            html = html.replace(new RegExp(`{${key}}`, 'g'), value);
        }
    }
    
    return html;
}
