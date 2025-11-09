        function updateMoscowTime() {
            const now = new Date();
            
            const moscowTime = new Date(now.toLocaleString("en-US", {
                timeZone: "Europe/Moscow"
            }));
            
            const options = {
                timeZone: 'Europe/Moscow',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            const formatter = new Intl.DateTimeFormat('ru-RU', options);
            document.getElementById('moscow-time').textContent = formatter.format(now);
        }
        
        updateMoscowTime();
        setInterval(updateMoscowTime, 1000);
