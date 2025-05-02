// Array de innovaciones en la industria petrolera
const innovacionesData = [
    // Desarrollo Tecnológico
    {
        titulo: "Desarrollo Tecnológico",
        descripcion: "Implementación de soluciones digitales avanzadas para la industria petrolera y optimización de procesos.",
        categoria: "desarrollo",
        icono: "fa-microchip",
        tags: ["Digital", "Procesos", "Optimización"],
        color: "#4CAF50"
    },
    {
        titulo: "PozoTracker",
        descripcion: "Aplicación móvil para ingenieros de campo que permite monitorear parámetros críticos de pozos en tiempo real y registrar intervenciones con alertas inteligentes.",
        categoria: "desarrollo",
        icono: "fa-mobile-alt",
        tags: ["Monitoreo", "Tiempo Real", "Móvil"],
        color: "#4CAF50"
    },
    {
        titulo: "WorkoverPlanner",
        descripcion: "Sistema de planificación y seguimiento de operaciones de reacondicionamiento de pozos, con cálculos de costos y tiempos.",
        categoria: "desarrollo",
        icono: "fa-tasks",
        tags: ["Planificación", "Optimización", "Costos"],
        color: "#4CAF50"
    },
    {
        titulo: "ReservorioVirtual",
        descripcion: "Modelado 3D de yacimientos integrando datos geológicos, geofísicos y de producción para simular comportamiento dinámico de fluidos.",
        categoria: "desarrollo",
        icono: "fa-cube",
        tags: ["Modelado 3D", "Simulación", "Yacimientos"],
        color: "#4CAF50"
    },
    {
        titulo: "EPF-Sim",
        descripcion: "Simulador de facilidades de producción temprana con dimensionamiento de equipos y análisis de cuellos de botella operativos.",
        categoria: "desarrollo",
        icono: "fa-industry",
        tags: ["Simulación", "Equipos", "Optimización"],
        color: "#4CAF50"
    },
    
    // Inteligencia Artificial
    {
        titulo: "Inteligencia Artificial",
        descripcion: "Aplicación de IA y machine learning para predicción de mantenimiento y análisis de datos petroleros.",
        categoria: "ia",
        icono: "fa-brain",
        tags: ["IA", "Análisis", "Predicción"],
        color: "#9C27B0"
    },
    {
        titulo: "SismoPredictor",
        descripcion: "Aplicación que analiza datos microsísmicos para predecir comportamiento de reservorios y optimizar ubicación de nuevos pozos.",
        categoria: "ia",
        icono: "fa-chart-line",
        tags: ["Predicción", "Reservorios", "Optimización"],
        color: "#9C27B0"
    },
    {
        titulo: "DrillingOptimizer",
        descripcion: "Simulador para optimización de parámetros de perforación, prevención de problemas y reducción de tiempos no productivos mediante redes neuronales.",
        categoria: "ia",
        icono: "fa-tachometer-alt",
        tags: ["Perforación", "Machine Learning", "Eficiencia"],
        color: "#9C27B0"
    },
    {
        titulo: "FracPredictor",
        descripcion: "Modelado de fracturas hidráulicas y análisis de respuesta del yacimiento, optimizando diseño y ejecución mediante algoritmos avanzados.",
        categoria: "ia",
        icono: "fa-network-wired",
        tags: ["Fracturas", "ML", "Diseño"],
        color: "#9C27B0"
    },
    {
        titulo: "OilInsights",
        descripcion: "Dashboard ejecutivo integral que muestra KPIs de producción, costos, reservas y proyecciones en tiempo real con análisis de tendencias.",
        categoria: "ia",
        icono: "fa-chart-pie",
        tags: ["Dashboard", "Analítica", "KPIs"],
        color: "#9C27B0"
    },
    {
        titulo: "RiskManager-Oil",
        descripcion: "Sistema de gestión integral de riesgos operacionales con evaluación de impacto ambiental y predicción de incidentes.",
        categoria: "ia",
        icono: "fa-exclamation-triangle",
        tags: ["Riesgos", "Predicción", "Seguridad"],
        color: "#9C27B0"
    },
    
    // Energías Renovables
    {
        titulo: "Energías Renovables",
        descripcion: "Integración de tecnologías sostenibles en la industria petrolera para reducir el impacto ambiental.",
        categoria: "energia",
        icono: "fa-leaf",
        tags: ["Sostenibilidad", "Ambiente", "Energía"],
        color: "#FF9800"
    },
    {
        titulo: "GasToWire",
        descripcion: "Planificación de proyectos de generación eléctrica distribuida a partir de gas asociado para comunidades cercanas.",
        categoria: "energia",
        icono: "fa-bolt",
        tags: ["Gas", "Electricidad", "Comunidades"],
        color: "#FF9800"
    },
    {
        titulo: "CarbonFootprint-Oil",
        descripcion: "Cálculo y gestión de huella de carbono en operaciones petroleras con estrategias de reducción y compensación mediante bonos verdes.",
        categoria: "energia",
        icono: "fa-cloud",
        tags: ["Carbono", "Ambiente", "Compensación"],
        color: "#FF9800"
    },
    {
        titulo: "WaterManager",
        descripcion: "Gestión integral de agua producida con opciones de tratamiento y reutilización para reducir consumo de agua dulce.",
        categoria: "energia",
        icono: "fa-water",
        tags: ["Agua", "Tratamiento", "Reutilización"],
        color: "#FF9800"
    },
    {
        titulo: "AbandonmentPlanner",
        descripcion: "Sistema para planificación de abandono de pozos y campos con estimación de costos y cronogramas respetando normativa ambiental.",
        categoria: "energia",
        icono: "fa-calendar-check",
        tags: ["Abandono", "Planificación", "Ambiente"],
        color: "#FF9800"
    },
    
    // Automatización Industrial
    {
        titulo: "Automatización Industrial",
        descripcion: "Sistemas automáticos y robóticos para mejorar la eficiencia y seguridad en las operaciones.",
        categoria: "automatizacion",
        icono: "fa-robot",
        tags: ["Robótica", "Seguridad", "Eficiencia"],
        color: "#F44336"
    },
    {
        titulo: "PipelineGuardian",
        descripcion: "Monitoreo de integridad de oleoductos con detección temprana de fugas y anomalías mediante análisis de datos y sensores IoT distribuidos.",
        categoria: "automatizacion",
        icono: "fa-shield-alt",
        tags: ["Oleoductos", "Seguridad", "IoT"],
        color: "#F44336"
    },
    {
        titulo: "TanqueSmart",
        descripcion: "Gestión inteligente de tanques de almacenamiento con medición automática de nivel, calidad y predicción de mantenimiento.",
        categoria: "automatizacion",
        icono: "fa-database",
        tags: ["Almacenamiento", "IoT", "Mantenimiento"],
        color: "#F44336"
    },
    {
        titulo: "CorrosionMonitor",
        descripcion: "Sistema de predicción y monitoreo de corrosión en tuberías y equipos con alertas tempranas basadas en modelos predictivos.",
        categoria: "automatizacion",
        icono: "fa-eye",
        tags: ["Corrosión", "Monitoreo", "Predictivo"],
        color: "#F44336"
    },
    {
        titulo: "EORSimulator",
        descripcion: "Simulador de técnicas de recuperación mejorada (inyección de polímeros, vapor, CO2) con análisis económico integrado.",
        categoria: "automatizacion",
        icono: "fa-pump-soap",
        tags: ["Recuperación", "Simulación", "Inyección"],
        color: "#F44336"
    },
    
    // Transformación Digital
    {
        titulo: "Transformación Digital",
        descripcion: "Digitalización integral de procesos petroleros para una mayor trazabilidad, transparencia y eficiencia operativa.",
        categoria: "digital",
        icono: "fa-digital-tachograph",
        tags: ["Digital", "Transparencia", "Eficiencia"],
        color: "#2196F3"
    },
    {
        titulo: "PetroBlockchain",
        descripcion: "Sistema de trazabilidad completa del petróleo producido mediante tecnología blockchain desde el pozo hasta refinería.",
        categoria: "digital",
        icono: "fa-link",
        tags: ["Blockchain", "Trazabilidad", "Transparencia"],
        color: "#2196F3"
    },
    {
        titulo: "TwinField",
        descripcion: "Gemelo digital integrado de campo petrolero que combina todos los subsistemas para simulación integral y toma de decisiones proactivas.",
        categoria: "digital",
        icono: "fa-copy",
        tags: ["Gemelo Digital", "Simulación", "Integración"],
        color: "#2196F3"
    },
    {
        titulo: "SupplyChain-Oil",
        descripcion: "Optimización de cadena de suministro para operaciones petroleras con gestión de inventarios críticos y pronósticos de demanda basados en IA.",
        categoria: "digital",
        icono: "fa-truck",
        tags: ["Logística", "Suministro", "Optimización"],
        color: "#2196F3"
    },
    {
        titulo: "ReservasManager",
        descripcion: "Gestión y auditoría de reservas petroleras con reportes ajustados a estándares SPE/PRMS.",
        categoria: "digital",
        icono: "fa-oil-can",
        tags: ["Reservas", "Auditoría", "Reportes"],
        color: "#2196F3"
    },
    {
        titulo: "PetroPortfolio",
        descripcion: "Herramienta para evaluación y gestión de portafolio de activos petroleros con análisis de riesgo-retorno.",
        categoria: "digital",
        icono: "fa-folder-open",
        tags: ["Portafolio", "Activos", "Análisis"],
        color: "#2196F3"
    },
    {
        titulo: "ContractModeler",
        descripcion: "Modelado y simulación de contratos petroleros con análisis de escenarios y condiciones cambiantes.",
        categoria: "digital",
        icono: "fa-file-contract",
        tags: ["Contratos", "Modelado", "Escenarios"],
        color: "#2196F3"
    }
];

// Cantidad de elementos a mostrar inicialmente
let itemsPerPage = 12; // Aumentado para mostrar más tarjetas inicialmente
let currentItems = 0;
let filtroActivo = 'all';

// Función para renderizar las tarjetas de innovación
function renderInnovationCards(filter = 'all', start = 0, limit = itemsPerPage) {
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
    
    // Obtener los elementos a mostrar según la paginación
    const itemsToShow = filteredData.slice(start, start + limit);
    currentItems = start + itemsToShow.length;
    
    // Mostrar u ocultar el botón de cargar más
    const loadMoreBtn = document.getElementById('load-more-innovations');
    if (currentItems >= filteredData.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
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
            <div class="card-image">
                <div class="card-icon">
                    <i class="fas ${item.icono}"></i>
                </div>
            </div>
            <div class="card-content">
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
                <div class="tech-tags">
                    ${item.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        innovationContent.appendChild(card);
        
        // Aplicar animación con delay
        setTimeout(() => {
            card.classList.add('visible');
        }, 100);
    });
    
    // Observar las nuevas tarjetas para animaciones
    document.querySelectorAll('.innovation-card:not(.observed)').forEach(el => {
        el.classList.add('observed');
        observador.observe(el);
    });
}

// Inicializar al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si la sección de innovación existe
    const innovacionSection = document.getElementById('innovacion');
    if (!innovacionSection) return;

    // Inicializar cards
    renderInnovationCards();
    
    // Efecto de aparición al hacer scroll
    window.observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    
    // Configurar filtros
    const filterButtons = document.querySelectorAll('.innovation-filter .filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
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
    loadMoreBtn.addEventListener('click', () => {
        renderInnovationCards(filtroActivo, currentItems);
    });
});