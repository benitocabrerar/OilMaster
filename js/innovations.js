// Array de innovaciones en la industria petrolera
const innovacionesData = [
    // Desarrollo Tecnológico
    {
        titulo: "Desarrollo Tecnológico",
        descripcion: "Implementación de soluciones digitales avanzadas para la industria petrolera y optimización de procesos.",
        categoria: "desarrollo",
        tags: ["Digital", "Procesos", "Optimización"]
    },
    {
        titulo: "PozoTracker",
        descripcion: "Aplicación móvil para ingenieros de campo que permite monitorear parámetros críticos de pozos en tiempo real y registrar intervenciones con alertas inteligentes.",
        categoria: "desarrollo",
        tags: ["Monitoreo", "Tiempo Real", "Móvil"]
    },
    {
        titulo: "WorkoverPlanner",
        descripcion: "Sistema de planificación y seguimiento de operaciones de reacondicionamiento de pozos, con cálculos de costos y tiempos.",
        categoria: "desarrollo",
        tags: ["Planificación", "Optimización", "Costos"]
    },
    {
        titulo: "ReservorioVirtual",
        descripcion: "Modelado 3D de yacimientos integrando datos geológicos, geofísicos y de producción para simular comportamiento dinámico de fluidos.",
        categoria: "desarrollo",
        tags: ["Modelado 3D", "Simulación", "Yacimientos"]
    },
    {
        titulo: "EPF-Sim",
        descripcion: "Simulador de facilidades de producción temprana con dimensionamiento de equipos y análisis de cuellos de botella operativos.",
        categoria: "desarrollo",
        tags: ["Simulación", "Equipos", "Optimización"]
    },
    
    // Inteligencia Artificial
    {
        titulo: "Inteligencia Artificial",
        descripcion: "Aplicación de IA y machine learning para predicción de mantenimiento y análisis de datos petroleros.",
        categoria: "ia",
        tags: ["IA", "Análisis", "Predicción"]
    },
    {
        titulo: "SismoPredictor",
        descripcion: "Aplicación que analiza datos microsísmicos para predecir comportamiento de reservorios y optimizar ubicación de nuevos pozos.",
        categoria: "ia",
        tags: ["Predicción", "Reservorios", "Optimización"]
    },
    {
        titulo: "DrillingOptimizer",
        descripcion: "Simulador para optimización de parámetros de perforación, prevención de problemas y reducción de tiempos no productivos mediante redes neuronales.",
        categoria: "ia",
        tags: ["Perforación", "Machine Learning", "Eficiencia"]
    },
    {
        titulo: "FracPredictor",
        descripcion: "Modelado de fracturas hidráulicas y análisis de respuesta del yacimiento, optimizando diseño y ejecución mediante algoritmos avanzados.",
        categoria: "ia",
        tags: ["Fracturas", "ML", "Diseño"]
    },
    {
        titulo: "OilInsights",
        descripcion: "Dashboard ejecutivo integral que muestra KPIs de producción, costos, reservas y proyecciones en tiempo real con análisis de tendencias.",
        categoria: "ia",
        tags: ["Dashboard", "Analítica", "KPIs"]
    },
    {
        titulo: "RiskManager-Oil",
        descripcion: "Sistema de gestión integral de riesgos operacionales con evaluación de impacto ambiental y predicción de incidentes.",
        categoria: "ia",
        tags: ["Riesgos", "Predicción", "Seguridad"]
    },
    
    // Energías Renovables
    {
        titulo: "Energías Renovables",
        descripcion: "Integración de tecnologías sostenibles en la industria petrolera para reducir el impacto ambiental.",
        categoria: "energia",
        tags: ["Sostenibilidad", "Ambiente", "Energía"]
    },
    {
        titulo: "GasToWire",
        descripcion: "Planificación de proyectos de generación eléctrica distribuida a partir de gas asociado para comunidades cercanas.",
        categoria: "energia",
        tags: ["Gas", "Electricidad", "Comunidades"]
    },
    {
        titulo: "CarbonFootprint-Oil",
        descripcion: "Cálculo y gestión de huella de carbono en operaciones petroleras con estrategias de reducción y compensación mediante bonos verdes.",
        categoria: "energia",
        tags: ["Carbono", "Ambiente", "Compensación"]
    },
    {
        titulo: "WaterManager",
        descripcion: "Gestión integral de agua producida con opciones de tratamiento y reutilización para reducir consumo de agua dulce.",
        categoria: "energia",
        tags: ["Agua", "Tratamiento", "Reutilización"]
    },
    {
        titulo: "AbandonmentPlanner",
        descripcion: "Sistema para planificación de abandono de pozos y campos con estimación de costos y cronogramas respetando normativa ambiental.",
        categoria: "energia",
        tags: ["Abandono", "Planificación", "Ambiente"]
    },
    
    // Automatización Industrial
    {
        titulo: "Automatización Industrial",
        descripcion: "Sistemas automáticos y robóticos para mejorar la eficiencia y seguridad en las operaciones.",
        categoria: "automatizacion",
        tags: ["Robótica", "Seguridad", "Eficiencia"]
    },
    {
        titulo: "PipelineGuardian",
        descripcion: "Monitoreo de integridad de oleoductos con detección temprana de fugas y anomalías mediante análisis de datos y sensores IoT distribuidos.",
        categoria: "automatizacion",
        tags: ["Oleoductos", "Seguridad", "IoT"]
    },
    {
        titulo: "TanqueSmart",
        descripcion: "Gestión inteligente de tanques de almacenamiento con medición automática de nivel, calidad y predicción de mantenimiento.",
        categoria: "automatizacion",
        tags: ["Almacenamiento", "IoT", "Mantenimiento"]
    },
    {
        titulo: "CorrosionMonitor",
        descripcion: "Sistema de predicción y monitoreo de corrosión en tuberías y equipos con alertas tempranas basadas en modelos predictivos.",
        categoria: "automatizacion",
        tags: ["Corrosión", "Monitoreo", "Predictivo"]
    },
    {
        titulo: "EORSimulator",
        descripcion: "Simulador de técnicas de recuperación mejorada (inyección de polímeros, vapor, CO2) con análisis económico integrado.",
        categoria: "automatizacion",
        tags: ["Recuperación", "Simulación", "Inyección"]
    },
    
    // Transformación Digital
    {
        titulo: "Transformación Digital",
        descripcion: "Digitalización integral de procesos petroleros para una mayor trazabilidad, transparencia y eficiencia operativa.",
        categoria: "digital",
        tags: ["Digital", "Transparencia", "Eficiencia"]
    },
    {
        titulo: "PetroBlockchain",
        descripcion: "Sistema de trazabilidad completa del petróleo producido mediante tecnología blockchain desde el pozo hasta refinería.",
        categoria: "digital",
        tags: ["Blockchain", "Trazabilidad", "Transparencia"]
    },
    {
        titulo: "TwinField",
        descripcion: "Gemelo digital integrado de campo petrolero que combina todos los subsistemas para simulación integral y toma de decisiones proactivas.",
        categoria: "digital",
        tags: ["Gemelo Digital", "Simulación", "Integración"]
    },
    {
        titulo: "SupplyChain-Oil",
        descripcion: "Optimización de cadena de suministro para operaciones petroleras con gestión de inventarios críticos y pronósticos de demanda basados en IA.",
        categoria: "digital",
        tags: ["Logística", "Suministro", "Optimización"]
    },
    {
        titulo: "ReservasManager",
        descripcion: "Gestión y auditoría de reservas petroleras con reportes ajustados a estándares SPE/PRMS.",
        categoria: "digital",
        tags: ["Reservas", "Auditoría", "Reportes"]
    },
    {
        titulo: "PetroPortfolio",
        descripcion: "Herramienta para evaluación y gestión de portafolio de activos petroleros con análisis de riesgo-retorno.",
        categoria: "digital",
        tags: ["Portafolio", "Activos", "Análisis"]
    },
    {
        titulo: "ContractModeler",
        descripcion: "Modelado y simulación de contratos petroleros con análisis de escenarios y condiciones cambiantes.",
        categoria: "digital",
        tags: ["Contratos", "Modelado", "Escenarios"]
    }
];

// Cantidad de elementos a mostrar inicialmente
let itemsPerPage = 12; // Aumentado para mostrar más tarjetas inicialmente
let currentItems = 0;
let filtroActivo = 'all';

// Función para renderizar las tarjetas de innovación
function renderInnovationCards(filter = 'all', start = 0, limit = itemsPerPage) {
    console.log("Renderizando tarjetas con filtro:", filter); // Depuración
    
    const innovationContent = document.querySelector('.innovation-content');
    
    // Si es la primera carga, limpiamos el contenido
    if (start === 0) {
        innovationContent.innerHTML = '';
    }
    
    // Filtrar los datos según el filtro seleccionado
    let filteredData = innovacionesData;
    if (filter !== 'all') {
        filteredData = innovacionesData.filter(item => item.categoria === filter);
    }
    
    console.log("Datos filtrados:", filteredData.length); // Depuración
    
    // Obtener los elementos a mostrar según la paginación
    const itemsToShow = filteredData.slice(start, start + limit);
    currentItems = start + itemsToShow.length;
    
    // Mostrar u ocultar el botón de cargar más
    const loadMoreBtn = document.getElementById('load-more-innovations');
    if (loadMoreBtn) {
        if (currentItems >= filteredData.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
    
    // Crear y añadir las tarjetas al contenedor
    itemsToShow.forEach(item => {
        const card = document.createElement('div');
        card.className = `innovation-card card-${item.categoria}`;
        card.setAttribute('data-category', item.categoria);
        
        // Obtener nombre legible de la categoría
        let categoryName = '';
        switch(item.categoria) {
            case 'desarrollo': 
                categoryName = 'Desarrollo'; 
                break;
            case 'ia': 
                categoryName = 'IA'; 
                break;
            case 'energia': 
                categoryName = 'Energía'; 
                break;
            case 'automatizacion': 
                categoryName = 'Automatización'; 
                break;
            case 'digital': 
                categoryName = 'Digital'; 
                break;
            default: 
                categoryName = item.categoria;
        }
        
        card.innerHTML = `
            <div class="category-indicator">${categoryName}</div>
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <div class="tech-tags">
                ${item.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        innovationContent.appendChild(card);
        
        // Aplicar animación con delay
        setTimeout(() => {
            card.classList.add('visible');
        }, 100);
    });
    
    // Observar las nuevas tarjetas para animaciones
    if (window.observador) {
        document.querySelectorAll('.innovation-card:not(.observed)').forEach(el => {
            el.classList.add('observed');
            window.observador.observe(el);
        });
    }
}

// Inicializar al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado"); // Depuración
    
    // Verificar si la sección de innovación existe
    const innovacionSection = document.getElementById('innovacion');
    if (!innovacionSection) {
        console.log("Sección de innovación no encontrada"); // Depuración
        return;
    }
    
    console.log("Sección de innovación encontrada"); // Depuración

    // Efecto de aparición al hacer scroll (si no existe, lo creamos)
    if (!window.observador) {
        window.observador = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });
    }
    
    // Configurar filtros
    const filterButtons = document.querySelectorAll('.innovation-filter .filter-btn');
    if (filterButtons.length === 0) {
        console.log("No se encontraron botones de filtro"); // Depuración
    } else {
        console.log(`Se encontraron ${filterButtons.length} botones de filtro`); // Depuración
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Botón de filtro clickeado:", button.getAttribute('data-filter')); // Depuración
            
            // Actualizar clase activa
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Obtener filtro y aplicarlo
            filtroActivo = button.getAttribute('data-filter');
            currentItems = 0;
            renderInnovationCards(filtroActivo);
            
            // Efecto de scroll suave hasta el principio de la sección
            document.querySelector('#innovacion').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Configurar botón de cargar más
    const loadMoreBtn = document.getElementById('load-more-innovations');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            console.log("Botón de cargar más clickeado"); // Depuración
            renderInnovationCards(filtroActivo, currentItems);
        });
    } else {
        console.log("Botón de cargar más no encontrado"); // Depuración
    }
    
    // Inicializar cards
    console.log("Inicializando tarjetas"); // Depuración
    renderInnovationCards();
});