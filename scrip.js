// script.js

// API Key de Alpha Vantage (reemplaza con tu propia API Key)
const API_KEY = '8EIRNKKMPQL68C4F'; 

// Datos de fallback en caso de que la API falle
const fallbackData = {
    price: '75.23',
    lastUpdated: new Date().toISOString().split('T')[0],
    historicalData: [
        { date: '2024-03-20', price: 75.23 },
        { date: '2024-03-19', price: 74.98 },
        { date: '2024-03-18', price: 76.15 },
        { date: '2024-03-15', price: 77.42 },
        { date: '2024-03-14', price: 78.01 },
        { date: '2024-03-13', price: 77.56 },
        { date: '2024-03-12', price: 77.84 }
        // Añadir más datos si es necesario
    ]
};

// Función para obtener el precio actual del petróleo WTI
async function getWTIPrice() {
    try {
        // Mostrar el spinner de carga
        const spinner = document.getElementById('spinner');
        if (spinner) spinner.style.display = 'block';

        // URL de la API para obtener el precio del petróleo WTI en USD
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=CL=F&apikey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        // Ocultar el spinner de carga
        if (spinner) spinner.style.display = 'none';

        // Verificar si hay algún mensaje de error en la respuesta
        if (data.Note || data['Information']) {
            console.warn('Limitación de API detectada:', data);
            useFallbackPrice();
            return;
        }

        // Procesar la respuesta y extraer el precio más reciente
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
            const price = parseFloat(data['Global Quote']['05. price']).toFixed(2);
            const priceElement = document.getElementById('wti-price');
            if (priceElement) priceElement.textContent = `$${price}`;
            
            // Obtener la fecha y hora de la última actualización
            const lastUpdated = data['Global Quote']['07. latest trading day'];
            const lastUpdatedElement = document.getElementById('last-updated');
            if (lastUpdatedElement) lastUpdatedElement.textContent = new Date(lastUpdated).toLocaleString();
        } else {
            console.error('Datos no disponibles:', data);
            useFallbackPrice();
        }
    } catch (error) {
        console.error('Error al obtener el precio del WTI:', error);
        useFallbackPrice();
    }
}

// Función para usar datos de respaldo cuando la API falla
function useFallbackPrice() {
    const spinner = document.getElementById('spinner');
    if (spinner) spinner.style.display = 'none';

    const priceElement = document.getElementById('wti-price');
    if (priceElement) priceElement.textContent = `$${fallbackData.price}`;
    
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) lastUpdatedElement.textContent = 
        `${new Date(fallbackData.lastUpdated).toLocaleDateString()} (datos locales)`;
}

// Función para obtener datos históricos del precio del petróleo WTI
async function getWTIHistoricalData() {
    try {
        // URL de la API para obtener datos históricos del petróleo WTI en USD
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=CL=F&apikey=${API_KEY}&outputsize=compact`;

        const response = await fetch(url);
        const data = await response.json();

        // Verificar si hay algún mensaje de error en la respuesta
        if (data.Note || data['Information']) {
            console.warn('Limitación de API detectada:', data);
            useHistoricalFallbackData();
            return;
        }

        // Verificar si la respuesta contiene los datos necesarios
        if (data['Time Series (Daily)']) {
            const timeSeries = data['Time Series (Daily)'];
            const dates = Object.keys(timeSeries).sort(); // Ordenar fechas de menor a mayor
            const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

            // Limitar a los últimos 30 días para el gráfico
            const recentDates = dates.slice(-30);
            const recentPrices = prices.slice(-30);

            createChart(recentDates, recentPrices);
        } else {
            console.error('Datos históricos no disponibles:', data);
            useHistoricalFallbackData();
        }
    } catch (error) {
        console.error('Error al obtener datos históricos del WTI:', error);
        useHistoricalFallbackData();
    }
}

// Función para usar datos históricos de respaldo
function useHistoricalFallbackData() {
    const dates = fallbackData.historicalData.map(item => item.date);
    const prices = fallbackData.historicalData.map(item => item.price);
    createChart(dates, prices);
}

// Función para crear el gráfico con Chart.js
function createChart(dates, prices) {
    const ctx = document.getElementById('wti-chart');
    
    // Verificar si el canvas existe
    if (!ctx) {
        console.error('El elemento canvas #wti-chart no existe en el DOM');
        return;
    }
    
    // Verificar si ya existe un gráfico y destruirlo
    if (window.wtiChartInstance) {
        window.wtiChartInstance.destroy();
    }
    
    window.wtiChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Precio WTI (USD)',
                data: prices,
                backgroundColor: 'rgba(241, 196, 15, 0.2)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff'
                    }
                },
                title: {
                    display: true,
                    text: 'Tendencia Histórica del Precio del Petróleo WTI',
                    color: '#ffffff',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    beginAtZero: false
                }
            }
        }
    });
}

// Comprobar si la página está funcionando
function checkPageStatus() {
    console.log('Página OilMaster cargada correctamente');
    console.log('Verificando componentes...');
    
    // Verificar elementos críticos
    const criticalElements = [
        'wti-price', 
        'last-updated', 
        'spinner', 
        'wti-chart'
    ];
    
    let allElementsPresent = true;
    
    criticalElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Elemento #${id} no encontrado en el DOM`);
            allElementsPresent = false;
        } else {
            console.log(`Elemento #${id} encontrado correctamente`);
        }
    });
    
    if (allElementsPresent) {
        console.log('Todos los elementos críticos están presentes');
    } else {
        console.error('Faltan algunos elementos críticos, la página puede no funcionar correctamente');
    }
}

// Función para actualizar el precio cada cierto tiempo
function startPriceUpdates() {
    // Verificar el estado de la página
    checkPageStatus();
    
    // Obtener el precio inicialmente
    getWTIPrice();

    // Obtener datos históricos
    getWTIHistoricalData();

    // Actualizar el precio cada 5 minutos (300,000 milisegundos)
    setInterval(getWTIPrice, 300000);
}

// Iniciar las actualizaciones cuando el contenido esté cargado
document.addEventListener('DOMContentLoaded', startPriceUpdates);
