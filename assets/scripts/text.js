function parseCustomLinks(text) {
    const linkRegex = /\[([^\]]+)\]\{([^}]+)\}/g;
    return text.replace(linkRegex, '<a href="$2" target="_blank">$1</a>');
}

function processTextFormatting(text) {
    let processedText = text.replace(/\/n/g, '<br>');
    
    processedText = parseCustomLinks(processedText);
    
    return processedText;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    
    let truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 0) {
        truncated = truncated.substr(0, lastSpace);
    }
    
    return truncated + '...';
}

function renderTemplate(templateId, data) {
    const template = document.getElementById(templateId);
    if (!template) return '';
    
    let html = template.innerHTML;
    const maxLength = 100;
    
    for (const [key, value] of Object.entries(data)) {
        if (key === 'text') {
            const fullText = processTextFormatting(value);
            
            if (value.length <= maxLength) {
                html = html.replace(new RegExp(`{${key}}`, 'g'), 
                    `<div class="news-text-content">${fullText}</div>`);
            } else {
                const truncatedRawText = truncateText(value, maxLength);
                const truncatedText = processTextFormatting(truncatedRawText);
                
                html = html.replace(new RegExp(`{${key}}`, 'g'), 
                    `<div class="news-text-content">${truncatedText}</div>
                     <div class="news-full-text" style="display: none;">${fullText}</div>
                     <button class="expand-btn" onclick="toggleText(this)">Развернуть</button>`);
            }
        } else {
            html = html.replace(new RegExp(`{${key}}`, 'g'), value);
        }
    }
    
    return html;
}

window.toggleText = function(button) {
    const newsItem = button.closest('.news-item');
    const content = newsItem.querySelector('.news-text-content');
    const fullText = newsItem.querySelector('.news-full-text');
    const isExpanded = fullText.style.display === 'block';
    
    if (isExpanded) {
        content.style.display = 'block';
        fullText.style.display = 'none';
        button.textContent = 'Развернуть';
    } else {
        content.style.display = 'none';
        fullText.style.display = 'block';
        button.textContent = 'Свернуть';
    }
};
