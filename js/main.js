document.addEventListener('DOMContentLoaded', () => {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cambio de color del header al hacer scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = 'white';
        }
    });

    // Aplicaciones con IA
    const aplicacionesIA = [
        {
            titulo: 'Oil-IPR-VFP',
            descripcion: 'Herramienta avanzada para análisis de curvas IPR-VFP que determina con precisión el comportamiento productivo de pozos petroleros. Calcula el punto óptimo de operación, predice si un pozo fluirá naturalmente o requiere levantamiento artificial, y optimiza la selección de tubería basado en estándares mundiales API/SPE. Maximiza la recuperación de hidrocarburos con análisis técnico exacto e instantáneo.',
            imagen: 'img/IPR-VFP.png',
            url: 'https://benitocabrerar.github.io/IPR/'
        },
        {
            titulo: 'SOTE Simulator',
            descripcion: 'Plataforma digital revolucionaria que simula, monitorea y optimiza en tiempo real el Sistema de Oleoducto Transecuatoriano. Permite manipular parámetros críticos (caudal, presión, temperatura, viscosidad), visualiza el recorrido completo con sus estaciones de bombeo/reducción, evalúa escenarios operativos y calcula con precisión el impacto de contingencias, maximizando la seguridad en el transporte de 360,000 barriles diarios a través de ecosistemas sensibles. La nueva referencia mundial en gestión de oleoductos de alta complejidad topográfica.',
            imagen: 'img/SOTE.png',
            url: 'https://benitocabrerar.github.io/SOTE/'
        },
        {
            titulo: 'Mechero Simulator de Pozos Petroleros',
            descripcion: 'Herramienta digital revolucionaria que simula en tiempo real el comportamiento de mecheros en instalaciones petroleras. Calcula y visualiza con precisión la formación de llamas, dispersión de contaminantes y emisiones atmosféricas bajo diferentes condiciones operativas y climáticas. Permite ajustar 7 parámetros críticos para analizar su impacto inmediato en la combustión del gas y la propagación de contaminantes, facilitando decisiones operativas que optimizan la eficiencia y minimizan el impacto ambiental. La referencia tecnológica para evaluación de impacto ambiental en quema de gas petrolero.',
            imagen: 'img/mechero.png',
            url: 'https://benitocabrerar.github.io/mechero/'
        },
        {
            titulo: 'SIMULADOR DE REFINERIAS PETROLERAS SIMREF-HC 2025',
            descripcion: 'Simulador financiero revolucionario que modela en tiempo real el comportamiento económico de refinerías de hidrocarburos amortizadas. Calcula con precisión márgenes, rentabilidad y proyecciones financieras mediante ajuste dinámico de capacidad, calidad API, precios, costos operativos y rendimiento de productos refinados. Permite análisis instantáneo de escenarios de mercado, optimización de parámetros y determinación de umbrales de rentabilidad, transformando la toma de decisiones estratégicas en la industria refinadora global. La referencia tecnológica definitiva para la optimización financiera de refinerías existentes.',
            imagen: 'img/simrefineria.png',
            url: 'https://benitocabrerar.github.io/refineria/'
        },
        {
            titulo: 'Simulador de Generación Eléctrica con Gas Asociado',
            descripcion: 'Herramienta digital revolucionaria que modela en tiempo real el aprovechamiento del gas asociado a la producción petrolera para generación eléctrica. Permite ajustar parámetros críticos (pozos, volumen de gas, eficiencias técnicas), visualiza el flujo del proceso completo y calcula simultáneamente rendimiento económico e impacto ambiental. Maximiza la rentabilidad de proyectos energéticos mientras cuantifica la reducción de emisiones frente a la quema tradicional, transformando un residuo en recurso valioso con análisis financiero completo (ROI, LCOE, proyecciones a 5 años). La solución definitiva para la valorización sostenible del gas asociado en la industria petrolera global.',
            imagen: 'img/energiagas.png',
            url: 'https://benitocabrerar.github.io/simulacion-energia-gas/'
        },
        {
            titulo: 'WTI-OIL precio del Petróleo',
            descripcion: 'Es una plataforma de análisis en tiempo real que transforma datos del precio WTI (West Texas Intermediate) en insights estratégicos para el mercado energético global. Integra datos críticos de la U.S. Energy Information Administration para ofrecer visualizaciones dinámicas en tres escalas temporales (diaria, mensual y anual), permitiendo a inversionistas, analistas y tomadores de decisiones del sector energético anticipar tendencias del mercado petrolero internacional. El sistema cumple con los más altos estándares de la industria (IPE/ICE, API, OPEP) y ofrece capacidades de exportación de informes profesionales para documentación oficial y presentaciones ejecutivas.',
            imagen: 'img/wti.png',
            url: 'https://benitocabrerar.github.io/WTI/'
        }
    ];

    // El Futuro de la Energía
    const noticiasEnergia = [
        {
            titulo: 'Producción de Petróleo y Gas Natural',
            descripcion: 'Reporte la producción petrolera - gas, y proyecciones.',
            imagen: 'img/Produccion petrolera Ecuador 2023.jpg'
        },
        {
            titulo: 'Refinación de Petróleo y Gas Natural',
            descripcion: 'Operación y Modernización del sistema de Refinación',
            imagen: 'img/plataforma1.jpeg'
        },
        {
            titulo: 'Exportaciones Petroleras',
            descripcion: 'Análisis del impacto de las exportaciones en la economía nacional.',
            imagen: 'img/buques-puerto-cartagena.jpg'
        },
        {
            titulo: 'Campo ITT',
            descripcion: 'Últimos desarrollos en el campo Ishpingo-Tambococha-Tiputini.',
            imagen: 'img/PRESION-1.jpg'
        },
        {
            titulo: 'Infraestructura Portuaria',
            descripcion: 'Mejoras en la capacidad portuaria para la exportación de crudo e Importación de Derivados de Hidrocarburos.',
            imagen: 'img/proa-barco.jpg'
        },
        {
            titulo: 'Inversión Petrolera',
            descripcion: 'Nuevas inversiones en el sector petrolero ecuatoriano.',
            imagen: 'img/bunker-trading-repsol.jpg'
        }
    ];

    // Función para cargar noticias
    function cargarNoticias(noticias, contenedor) {
        if (contenedor) {
            contenedor.innerHTML = '';
            
            noticias.forEach(noticia => {
                const articleHTML = `
                    <article class="news-card${noticia.url ? ' clickable' : ''}" ${noticia.url ? `onclick="window.open('${noticia.url}', '_blank')"` : ''}>
                        <img src="${noticia.imagen}" alt="${noticia.titulo}">
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.descripcion}</p>
                    </article>
                `;
                contenedor.insertAdjacentHTML('beforeend', articleHTML);
            });

            // Observar las nuevas tarjetas para animaciones
            contenedor.querySelectorAll('.news-card').forEach(el => {
                observador.observe(el);
            });
        }
    }

    // Efecto de aparición al hacer scroll
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    // Observar elementos que deben aparecer con animación
    document.querySelectorAll('.news-card, .innovation-card, .research-card').forEach(el => {
        observador.observe(el);
    });

    // Cargar noticias al iniciar
    const gridAplicaciones = document.querySelector('#aplicaciones-ia .news-grid');
    const gridEnergia = document.querySelector('#futuro-energia .news-grid');
    
    cargarNoticias(aplicacionesIA, gridAplicaciones);
    cargarNoticias(noticiasEnergia, gridEnergia);
});