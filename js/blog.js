// JavaScript para la funcionalidad de la sección de blog

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para el menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Funcionalidad del filtro de búsqueda
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const authorFilter = document.getElementById('authorFilter');
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Función para filtrar los artículos
    function filterArticles() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const date = dateFilter.value;
        const author = authorFilter.value;
        
        blogCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const excerpt = card.querySelector('p').innerText.toLowerCase();
            const cardCategory = card.querySelector('.card-category').innerText.toLowerCase();
            const cardDate = card.querySelector('.date').innerText.toLowerCase();
            const cardAuthor = card.querySelector('.author span').innerText.toLowerCase();
            
            // Filtro de búsqueda
            const matchesSearch = searchTerm === '' || 
                                title.includes(searchTerm) || 
                                excerpt.includes(searchTerm);
            
            // Filtro de categoría
            const matchesCategory = category === 'all' || 
                                   cardCategory.includes(category.toLowerCase());
            
            // Filtro de fecha
            let matchesDate = true;
            if (date !== 'all') {
                if (date === 'recent' && !cardDate.includes('abril')) {
                    matchesDate = false;
                } else if (date === '2025' && !cardDate.includes('2025')) {
                    matchesDate = false;
                } else if (date === '2024' && !cardDate.includes('2024')) {
                    matchesDate = false;
                }
            }
            
            // Filtro de autor
            const matchesAuthor = author === 'all' || 
                                 cardAuthor.toLowerCase().includes(author === 'bcabrera' ? 'benito' : 
                                                                 author === 'mtorres' ? 'maría' : 
                                                                 author === 'jrodriguez' ? 'juan' : '');
            
            // Mostrar u ocultar la tarjeta
            if (matchesSearch && matchesCategory && matchesDate && matchesAuthor) {
                card.style.display = 'block';
                // Agregar animación de entrada
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Eventos para los filtros
    if (searchInput) {
        searchInput.addEventListener('input', filterArticles);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterArticles);
    }
    if (dateFilter) {
        dateFilter.addEventListener('change', filterArticles);
    }
    if (authorFilter) {
        authorFilter.addEventListener('change', filterArticles);
    }

    // Funcionalidad para compartir en redes sociales
    const shareButtons = document.querySelectorAll('.share a, .article-share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener los datos del artículo
            const articleTitle = document.querySelector('.article-title') ? 
                                document.querySelector('.article-title').innerText : 
                                (document.querySelector('.article-page-title') ? 
                                 document.querySelector('.article-page-title').innerText : 'Artículo OilMaster');
            const articleUrl = window.location.href;
            
            // Detectar la red social
            const socialNetwork = this.getAttribute('data-social') || 
                                (this.querySelector('i.fa-twitter') ? 'twitter' : 
                                 this.querySelector('i.fa-facebook-f') ? 'facebook' : 
                                 this.querySelector('i.fa-linkedin-in') ? 'linkedin' : 
                                 this.querySelector('i.fa-whatsapp') ? 'whatsapp' : 'email');
            
            // URLs para compartir
            let shareUrl;
            
            switch(socialNetwork) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(articleTitle + ' ' + articleUrl)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(articleTitle)}&body=${encodeURIComponent(articleUrl)}`;
                    break;
            }
            
            // Abrir ventana de compartir
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Animación al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.blog-card, .featured-article, .newsletter-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Activar al cargar la página

    // Botón de volver arriba
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
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

    // Formulario de suscripción al newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Aquí se podría agregar la lógica para enviar el email al servidor
            // Por ahora, solo mostramos un mensaje de éxito
            
            // Crear elemento de mensaje
            const message = document.createElement('div');
            message.className = 'success-message';
            message.textContent = '¡Gracias por suscribirte! Pronto recibirás nuestras actualizaciones.';
            message.style.color = '#2ecc71';
            message.style.marginTop = '15px';
            message.style.fontWeight = '500';
            
            // Limpiar mensajes anteriores
            const oldMessage = newsletterForm.querySelector('.success-message');
            if (oldMessage) {
                oldMessage.remove();
            }
            
            // Agregar nuevo mensaje
            newsletterForm.appendChild(message);
            
            // Limpiar el campo
            emailInput.value = '';
        });
    }

    // Detectar tema oscuro del sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
    }
    
    // Botón para cambiar tema
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Tabla de contenidos para artículos individuales
    const articleContent = document.querySelector('.article-page-content');
    
    if (articleContent) {
        const headings = articleContent.querySelectorAll('h2, h3');
        
        if (headings.length > 2) {
            // Crear contenedor de tabla de contenidos
            const tocContainer = document.createElement('div');
            tocContainer.className = 'table-of-contents';
            tocContainer.innerHTML = '<h3>Contenido del artículo</h3><ul></ul>';
            
            const tocList = tocContainer.querySelector('ul');
            
            // Agregar ID a los encabezados si no lo tienen
            headings.forEach((heading, index) => {
                if (!heading.id) {
                    heading.id = 'heading-' + index;
                }
                
                const listItem = document.createElement('li');
                listItem.className = heading.tagName.toLowerCase();
                
                const link = document.createElement('a');
                link.href = '#' + heading.id;
                link.textContent = heading.textContent;
                
                listItem.appendChild(link);
                tocList.appendChild(listItem);
                
                // Manejar clic en enlaces internos
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetHeading = document.querySelector(this.getAttribute('href'));
                    const headerOffset = 100;
                    const elementPosition = targetHeading.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Insertar la tabla de contenidos al inicio del artículo
            articleContent.insertBefore(tocContainer, articleContent.firstChild);
        }
    }

    // Estimación del tiempo de lectura
    function calculateReadingTime() {
        const articleContent = document.querySelector('.article-page-content');
        
        if (articleContent) {
            const text = articleContent.textContent;
            const wordCount = text.split(/\s+/).length;
            
            // Asumiendo una velocidad de lectura de 200 palabras por minuto
            const readingTime = Math.ceil(wordCount / 200);
            
            // Actualizar el elemento de tiempo de lectura
            const readingTimeElement = document.querySelector('.reading-time');
            if (readingTimeElement) {
                readingTimeElement.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min de lectura`;
            }
        }
    }
    
    // Ejecutar cálculo de tiempo de lectura
    calculateReadingTime();
});
