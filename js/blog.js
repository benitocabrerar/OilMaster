// JavaScript para la sección Blog de OilMaster
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const authorFilter = document.getElementById('authorFilter');
    const timeFilter = document.getElementById('timeFilter');
    const tagItems = document.querySelectorAll('.tag-item');
    const blogCards = document.querySelectorAll('.blog-card');
    const mainArticle = document.querySelector('.main-article');
    const expandedArticleContainer = document.getElementById('expanded-article-container');
    const expandedArticle = document.getElementById('expanded-article');
    const themeToggle = document.getElementById('theme-toggle');
    const filterToggle = document.getElementById('filter-toggle');
    const filterControls = document.querySelector('.filter-controls');
    
    // Función para mostrar un artículo expandido
    function showExpandedArticle(articleId) {
        // Obtener el contenido del artículo desde el elemento oculto
        const articleContent = document.getElementById(articleId);
        if (!articleContent) return;
        
        // Mostrar el contenedor del artículo expandido
        expandedArticleContainer.style.display = 'block';
        
        // Insertar el contenido del artículo en el contenedor expandido
        expandedArticle.innerHTML = articleContent.innerHTML;
        
        // Desplazarse suavemente hacia el artículo expandido
        expandedArticleContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Ocultar el artículo destacado y la rejilla cuando se está viendo un artículo
        // document.querySelector('.featured-article').style.display = 'none';
        // document.querySelector('.blog-grid').style.display = 'none';
        
        // Añadir botón para cerrar el artículo
        const closeButton = document.createElement('button');
        closeButton.className = 'close-article-btn';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.setAttribute('aria-label', 'Cerrar artículo');
        expandedArticle.appendChild(closeButton);
        
        // Evento para cerrar el artículo expandido
        closeButton.addEventListener('click', function() {
            expandedArticleContainer.style.display = 'none';
            // document.querySelector('.featured-article').style.display = 'block';
            // document.querySelector('.blog-grid').style.display = 'block';
        });
        
        // Registrar vista del artículo para análisis
        trackArticleView(articleId, articleContent.querySelector('.article-title-large').textContent);
    }
    
    // Añadir eventos a los enlaces de los artículos
    document.querySelectorAll('[data-article]').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            showExpandedArticle(articleId);
        });
    });
    
    // También mostrar el artículo cuando se hace clic en las tarjetas
    document.querySelectorAll('.blog-card, .main-article').forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Evitar activación si se hace clic en enlaces, botones o elementos interactivos
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.share') || e.target.closest('.author')) {
                return;
            }
            
            const articleId = this.getAttribute('data-full-content');
            if (articleId) {
                showExpandedArticle(articleId);
            }
        });
    });
    
    // Función para filtrar tarjetas de blog
    function filterBlogCards() {
        const searchText = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const date = dateFilter.value;
        const author = authorFilter.value;
        const time = timeFilter.value;
        const activeTags = Array.from(document.querySelectorAll('.tag-item.active')).map(tag => tag.getAttribute('data-tag').toLowerCase());
        
        let filterApplied = searchText || category !== 'all' || date !== 'all' || author !== 'all' || time !== 'all' || activeTags.length > 0;
        
        // Aplicar filtros a las tarjetas de blog
        blogCards.forEach(function(card) {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardText = card.querySelector('p').textContent.toLowerCase();
            const cardCategory = card.querySelector('.card-category').textContent.toLowerCase();
            const cardDate = card.querySelector('.date').textContent.toLowerCase();
            const cardAuthor = card.querySelector('.author span').textContent.toLowerCase();
            const cardReadingTime = card.querySelector('.reading-time').textContent.toLowerCase();
            const cardTags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase().split(',') : [];
            
            // Comprobar coincidencias con los filtros
            const matchesSearch = cardTitle.includes(searchText) || cardText.includes(searchText);
            const matchesCategory = category === 'all' || cardCategory.includes(category.toLowerCase());
            const matchesDate = date === 'all' || cardDate.includes(date.toLowerCase());
            const matchesAuthor = author === 'all' || cardAuthor.includes(author.toLowerCase());
            
            // Filtrar por tiempo de lectura
            let matchesTime = true;
            if (time !== 'all') {
                const minutes = parseInt(cardReadingTime.match(/\d+/)[0]);
                if (time === '3min' && minutes > 3) matchesTime = false;
                if (time === '5min' && minutes > 5) matchesTime = false;
                if (time === '5min+' && minutes <= 5) matchesTime = false;
            }
            
            // Verificar coincidencia con los tags seleccionados
            let matchesTags = true;
            if (activeTags.length > 0) {
                matchesTags = activeTags.some(tag => cardTags.some(cardTag => cardTag.includes(tag)));
            }
            
            // Mostrar u ocultar la tarjeta según los filtros
            if (matchesSearch && matchesCategory && matchesDate && matchesAuthor && matchesTime && matchesTags) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Comprobar si hay resultados
        const visibleCards = document.querySelectorAll('.blog-card[style="display: flex;"]');
        const noResultsMessage = document.querySelector('.no-results-message');
        
        if (visibleCards.length === 0 && filterApplied) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `
                    <div class="no-results-content">
                        <i class="fas fa-search fa-3x"></i>
                        <h3>No se encontraron resultados</h3>
                        <p>Intenta con otros términos de búsqueda o filtros diferentes.</p>
                        <button class="reset-filters-btn">Restablecer filtros</button>
                    </div>
                `;
                document.querySelector('.articles-grid').appendChild(message);
                
                // Añadir evento para restablecer filtros
                message.querySelector('.reset-filters-btn').addEventListener('click', resetFilters);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
        
        // Aplicar filtrado también al artículo principal
        if (mainArticle) {
            const mainTitle = mainArticle.querySelector('h2').textContent.toLowerCase();
            const mainText = mainArticle.querySelector('p').textContent.toLowerCase();
            const mainCategory = mainArticle.querySelector('.category').textContent.toLowerCase();
            const mainDate = mainArticle.querySelector('.date').textContent.toLowerCase();
            const mainAuthor = mainArticle.querySelector('.author span').textContent.toLowerCase();
            const mainReadingTime = mainArticle.querySelector('.reading-time').textContent.toLowerCase();
            
            // Comprobar coincidencias con los filtros para el artículo principal
            const mainMatchesSearch = mainTitle.includes(searchText) || mainText.includes(searchText);
            const mainMatchesCategory = category === 'all' || mainCategory.includes(category.toLowerCase());
            const mainMatchesDate = date === 'all' || mainDate.includes(date.toLowerCase());
            const mainMatchesAuthor = author === 'all' || mainAuthor.includes(author.toLowerCase());
            
            // Filtrar por tiempo de lectura para el artículo principal
            let mainMatchesTime = true;
            if (time !== 'all') {
                const minutes = parseInt(mainReadingTime.match(/\d+/)[0]);
                if (time === '3min' && minutes > 3) mainMatchesTime = false;
                if (time === '5min' && minutes > 5) mainMatchesTime = false;
                if (time === '5min+' && minutes <= 5) mainMatchesTime = false;
            }
            
            // Mostrar u ocultar el artículo principal según los filtros
            if (filterApplied && (mainMatchesSearch && mainMatchesCategory && mainMatchesDate && mainMatchesAuthor && mainMatchesTime)) {
                mainArticle.style.display = 'flex';
                document.querySelector('.featured-article .container').style.display = 'block';
            } else if (filterApplied) {
                mainArticle.style.display = 'none';
                document.querySelector('.featured-article .container').style.display = 'none';
            } else {
                mainArticle.style.display = 'flex';
                document.querySelector('.featured-article .container').style.display = 'block';
            }
        }
    }
    
    // Función para restablecer todos los filtros
    function resetFilters() {
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        if (dateFilter) dateFilter.value = 'all';
        if (authorFilter) authorFilter.value = 'all';
        if (timeFilter) timeFilter.value = 'all';
        
        // Desactivar todos los tags
        tagItems.forEach(tag => tag.classList.remove('active'));
        
        // Volver a mostrar todas las tarjetas
        filterBlogCards();
    }
    
    // Añadir eventos para los controles de filtro
    if (searchInput) searchInput.addEventListener('input', filterBlogCards);
    if (categoryFilter) categoryFilter.addEventListener('change', filterBlogCards);
    if (dateFilter) dateFilter.addEventListener('change', filterBlogCards);
    if (authorFilter) authorFilter.addEventListener('change', filterBlogCards);
    if (timeFilter) timeFilter.addEventListener('change', filterBlogCards);
    
    // Añadir eventos para los tags
    if (tagItems) {
        tagItems.forEach(tag => {
            tag.addEventListener('click', function() {
                this.classList.toggle('active');
                filterBlogCards();
            });
        });
    }
    
    // Añadir evento para el botón de cambio de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            // Guardar preferencia de tema en localStorage
            const isLightMode = document.body.classList.contains('light-mode');
            localStorage.setItem('oilmaster-theme', isLightMode ? 'light' : 'dark');
            
            // Cambiar el icono del botón
            if (isLightMode) {
                this.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
        
        // Verificar tema guardado en localStorage
        const savedTheme = localStorage.getItem('oilmaster-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Añadir evento para el botón de filtro móvil
    if (filterToggle && filterControls) {
        filterToggle.addEventListener('click', function() {
            filterControls.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // Función para el seguimiento de visualizaciones de artículos (para análisis)
    function trackArticleView(articleId, title) {
        if (window.gtag) {
            gtag('event', 'view_item', {
                'event_category': 'Blog',
                'event_label': title,
                'value': articleId
            });
        }
        console.log(`Artículo visto: ${title} (ID: ${articleId})`);
    }
    
    // Función para compartir en redes sociales
    function shareArticle(platform, url, title) {
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Te comparto este artículo interesante: ' + url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    }
    
    // Añadir eventos para los botones de compartir
    document.querySelectorAll('.share a, .article-share-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = window.location.href;
            let title = document.title;
            
            // Si estamos dentro de un artículo expandido, usar su título
            const expandedTitle = document.querySelector('.article-title-large');
            if (expandedTitle) {
                title = expandedTitle.textContent;
            }
            
            // Determinar plataforma según el ícono
            let platform = '';
            if (this.querySelector('.fa-twitter') || this.title.includes('Twitter')) {
                platform = 'twitter';
            } else if (this.querySelector('.fa-facebook-f') || this.title.includes('Facebook')) {
                platform = 'facebook';
            } else if (this.querySelector('.fa-linkedin') || this.querySelector('.fa-linkedin-in') || this.title.includes('LinkedIn')) {
                platform = 'linkedin';
            } else if (this.querySelector('.fa-whatsapp') || this.title.includes('WhatsApp')) {
                platform = 'whatsapp';
            } else if (this.querySelector('.fa-envelope') || this.title.includes('correo')) {
                platform = 'email';
            }
            
            shareArticle(platform, url + '#' + expandedArticle.querySelector('div').id, title);
        });
    });
    
    // Animación al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Comprobar si el elemento está en el viewport
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Inicializar animaciones AOS si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true
        });
    } else {
        // Alternativa si AOS no está disponible
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('resize', animateOnScroll);
        animateOnScroll(); // Verificar elementos visibles al cargar
    }
    
    // Mostrar por defecto el artículo destacado
    if (mainArticle) {
        const defaultArticleId = mainArticle.getAttribute('data-full-content');
        if (defaultArticleId && !window.location.hash) {
            // Mostrar el artículo destacado con un pequeño retraso para permitir la carga adecuada
            setTimeout(() => {
                showExpandedArticle(defaultArticleId);
            }, 500);
        }
    }
    
    // Si hay un hash en la URL, mostrar el artículo correspondiente
    if (window.location.hash) {
        const articleId = window.location.hash.substring(1);
        if (document.getElementById(articleId)) {
            showExpandedArticle(articleId);
        }
    }
    
    // Mostrar botón "Volver arriba" al hacer scroll
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Actualizar contador de visitas del artículo (simulación)
    const visitCounters = document.querySelectorAll('.visit-counter');
    visitCounters.forEach(counter => {
        const count = Math.floor(Math.random() * 500) + 100;
        counter.textContent = count.toLocaleString();
    });
});

// Función para cargar imágenes de forma optimizada
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading de imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores antiguos
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
});

// Añadir estilos CSS adicionales para elementos creados dinámicamente
const extraStyles = document.createElement('style');
extraStyles.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 100px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--accent);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: var(--shadow-strong);
        cursor: pointer;
        transition: var(--transition);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
    }
    
    .scroll-top-btn.show {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-5px);
        background-color: var(--accent-dark);
    }
    
    .close-article-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--accent);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        box-shadow: var(--shadow);
        cursor: pointer;
        transition: var(--transition);
        z-index: 1000;
    }
    
    .close-article-btn:hover {
        transform: scale(1.1);
        background-color: var(--accent-dark);
    }
    
    .no-results-message {
        grid-column: 1 / -1;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: var(--radius);
        padding: 40px;
        text-align: center;
        margin: 30px 0;
    }
    
    .no-results-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }
    
    .no-results-content i {
        color: var(--gray);
        margin-bottom: 10px;
    }
    
    .no-results-content h3 {
        font-size: 1.5rem;
        margin: 0;
    }
    
    .no-results-content p {
        margin: 0 0 20px;
        color: var(--gray);
    }
    
    .reset-filters-btn {
        background-color: var(--accent);
        color: white;
        border: none;
        border-radius: var(--radius-sm);
        padding: 10px 20px;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .reset-filters-btn:hover {
        background-color: var(--accent-dark);
        transform: translateY(-3px);
    }
    
    @media (max-width: 768px) {
        .filter-controls {
            display: none;
        }
        
        .filter-controls.show {
            display: flex;
            flex-direction: column;
            animation: fadeInDown 0.5s forwards;
        }
        
        .filter-toggle {
            display: flex;
        }
        
        .scroll-top-btn {
            right: 30px;
            bottom: 90px;
        }
    }
`;

document.head.appendChild(extraStyles);
