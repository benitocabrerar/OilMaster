// JavaScript para la sección Blog
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad de filtro y búsqueda
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const authorFilter = document.getElementById('authorFilter');
    const tagsFilter = document.getElementById('tagsFilter');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredArticle = document.querySelector('.main-article');
    
    // Función para filtrar las tarjetas del blog
    function filterBlogCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const date = dateFilter.value;
        const author = authorFilter.value;
        const tag = tagsFilter ? tagsFilter.value : 'all';
        
        // Filtrar las tarjetas del blog según los criterios seleccionados
        blogCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardCategory = card.querySelector('.card-category').textContent.toLowerCase();
            const cardDate = card.querySelector('.date').textContent.toLowerCase();
            const cardAuthor = card.querySelector('.author span').textContent.toLowerCase();
            const cardTags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';
            
            const matchesSearch = cardTitle.includes(searchTerm);
            const matchesCategory = category === 'all' || cardCategory === category.toLowerCase();
            const matchesDate = date === 'all' || cardDate.includes(date);
            const matchesAuthor = author === 'all' || cardAuthor === author.toLowerCase();
            const matchesTag = tag === 'all' || (cardTags && cardTags.includes(tag.toLowerCase()));
            
            if (matchesSearch && matchesCategory && matchesDate && matchesAuthor && matchesTag) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Verificar si no hay resultados y mostrar mensaje
        const visibleCards = document.querySelectorAll('.blog-card[style="display: flex;"]');
        const noResultsMsg = document.querySelector('.no-results-message');
        
        if (visibleCards.length === 0) {
            if (!noResultsMsg) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `<p>No se encontraron artículos que coincidan con tu búsqueda.</p>`;
                document.querySelector('.articles-grid').appendChild(message);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    // Asignar eventos a los controles de filtro
    if (searchInput) searchInput.addEventListener('input', filterBlogCards);
    if (categoryFilter) categoryFilter.addEventListener('change', filterBlogCards);
    if (dateFilter) dateFilter.addEventListener('change', filterBlogCards);
    if (authorFilter) authorFilter.addEventListener('change', filterBlogCards);
    if (tagsFilter) tagsFilter.addEventListener('change', filterBlogCards);

    // Funcionalidad para compartir en redes sociales
    const shareButtons = document.querySelectorAll('.share a');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = window.location.href;
            const title = document.title;
            
            if (this.title.includes('Twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
            } else if (this.title.includes('LinkedIn')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            } else if (this.title.includes('WhatsApp')) {
                window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
            } else if (this.title.includes('correo')) {
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
            }
        });
    });

    // Despliegue de artículos al hacer clic en las tarjetas
    const articleCards = document.querySelectorAll('.blog-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Evitar navegación si se hace clic en el botón de leer o en los enlaces de autor/compartir
            if (!e.target.closest('.btn-read') && !e.target.closest('.author') && !e.target.closest('.share')) {
                const articleUrl = this.querySelector('.btn-read').getAttribute('href');
                if (articleUrl) {
                    // Desplazar el artículo expandido al principio
                    const articleContent = document.querySelector('#expanded-article');
                    if (articleContent) {
                        articleContent.innerHTML = '<div class="loading-spinner"></div>';
                        articleContent.style.display = 'block';
                        
                        // Simular carga del contenido (en producción se haría con AJAX)
                        setTimeout(() => {
                            articleContent.innerHTML = this.getAttribute('data-full-content');
                            window.scrollTo({
                                top: articleContent.offsetTop - 100,
                                behavior: 'smooth'
                            });
                        }, 500);
                    }
                }
            }
        });
    });

    // Animación al cargar la página
    function animateOnScroll() {
        const elements = document.querySelectorAll('.blog-card, .main-article');
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            // Si el elemento está en el viewport
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.classList.add('animate-in');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Animar elementos visibles al cargar
    
    // Modo oscuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            // Guardar preferencia en localStorage
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
        
        // Verificar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Tiempo de lectura estimado
    function calculateReadingTime() {
        const articles = document.querySelectorAll('.article-page-content');
        articles.forEach(article => {
            const text = article.textContent;
            const wordCount = text.split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200); // 200 palabras por minuto
            
            const timeElement = document.querySelector('.article-reading-time');
            if (timeElement) {
                timeElement.textContent = `${readingTime} min de lectura`;
            }
        });
    }
    
    calculateReadingTime();
    
    // Mostrar menú de filtros en móviles
    const filterToggle = document.getElementById('filter-toggle');
    const filterControls = document.querySelector('.filter-controls');
    
    if (filterToggle && filterControls) {
        filterToggle.addEventListener('click', function() {
            filterControls.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});

// Funciones para analíticas
function trackArticleView(articleId, title) {
    // Aquí se integraría con Google Analytics o similar
    console.log(`Artículo visto: ${title} (ID: ${articleId})`);
}

function trackShareEvent(platform, articleId) {
    // Registro de evento de compartir
    console.log(`Artículo compartido en ${platform} (ID: ${articleId})`);
}

// Cargar imágenes de forma lazy
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin soporte
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});
