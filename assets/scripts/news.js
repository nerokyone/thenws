function renderTemplate(templateId, data) {
    const template = document.getElementById(templateId);
    if (!template) {
        console.error('Шаблон не найден:', templateId);
        return '';
    }
    
    let html = template.innerHTML;
    for (const [key, value] of Object.entries(data)) {
        html = html.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    return html;
}

fetch('/assets/data/news.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка 240. Обратитесь к администрации.');
        }
        return response.json();
    })
    .then(data => {
        const newsContainer = document.getElementById('newsContainer');
        if (!newsContainer) {
            console.error('Элемент newsContainer не найден!');
            return;
        }
        
        if (data.news && data.news.length > 0) {
            let allNewsHtml = '';
            data.news.forEach(newsItem => {
                allNewsHtml += renderTemplate('newsTemplate', newsItem);
            });
            newsContainer.innerHTML = allNewsHtml;
        } else {
            newsContainer.innerHTML = '<p>Новостей нет</p>';
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        const newsContainer = document.getElementById('newsContainer');
        if (newsContainer) {
            newsContainer.innerHTML = 
                '<p style="color: red;">Ошибка загрузки данных: ' + error.message + '</p>';
        }
    });
