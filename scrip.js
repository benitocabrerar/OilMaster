// script.js

// API Key de Alpha Vantage (reemplaza con tu propia API Key)
const API_KEY = '8EIRNKKMPQL68C4F'; // <-- Reemplaza con tu API Key

// Función para obtener el precio actual del petróleo WTI
async function getWTIPrice() {
    try {
        // Mostrar el spinner de carga
        const spinner = document.getElementById('spinner');
        if (spinner) spinner.style.display = 'block';

        // URL de la API para obtener el precio del petróleo WTI en USD
        // Nota: Alpha Vantage utiliza símbolos de bolsa para commodities. "CL=F" es el símbolo para WTI Crude Oil.
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=CL=F&apikey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        // Ocultar el spinner de carga
        if (spinner) spinner.style.display = 'none';

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
            const priceElement = document.getElementById('wti-price');
            if (priceElement) priceElement.textContent = 'No disponible';
            const lastUpdatedElement = document.getElementById('last-updated');
            if (lastUpdatedElement) lastUpdatedElement.textContent = '-';
            console.error('Datos no disponibles:', data);
        }
    } catch (error) {
        // Ocultar el spinner de carga
        const spinner = document.getElementById('spinner');
        if (spinner) spinner.style.display = 'none';

        const priceElement = document.getElementById('wti-price');
        if (priceElement) priceElement.textContent = 'Error';
        const lastUpdatedElement = document.getElementById('last-updated');
        if (lastUpdatedElement) lastUpdatedElement.textContent = '-';
        console.error('Error al obtener el precio del WTI:', error);
    }
}

// Función para obtener datos históricos del precio del petróleo WTI
async function getWTIHistoricalData() {
    try {
        // URL de la API para obtener datos históricos del petróleo WTI en USD
        // Función TIME_SERIES_DAILY_ADJUSTED para obtener datos diarios
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=CL=F&apikey=${API_KEY}&outputsize=compact`;

        const response = await fetch(url);
        const data = await response.json();

        // Verificar si la respuesta contiene los datos necesarios
        if (data['Time Series (Daily)']) {
            const timeSeries = data['Time Series (Daily)'];
            const dates = Object.keys(timeSeries).sort(); // Ordenar fechas de menor a mayor
            const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

            // Limitar a los últimos 30 días para el gráfico
            const recentDates = dates.slice(-30);
            const recentPrices = prices.slice(-30);

            // Crear el gráfico utilizando Chart.js
            const ctx = document.getElementById('wti-chart').getContext('2d');
            const wtiChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: recentDates,
                    datasets: [{
                        label: 'Precio WTI (USD)',
                        data: recentPrices,
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
        } else {
            console.error('Datos históricos no disponibles:', data);
        }
    } catch (error) {
        console.error('Error al obtener datos históricos del WTI:', error);
    }
}

// Función para actualizar el precio cada cierto tiempo (por ejemplo, cada 5 minutos)
function startPriceUpdates() {
    // Obtener el precio inicialmente
    getWTIPrice();

    // Obtener datos históricos
    getWTIHistoricalData();

    // Actualizar el precio cada 5 minutos (300,000 milisegundos)
    setInterval(getWTIPrice, 300000);
}

// Iniciar las actualizaciones cuando el contenido esté cargado
document.addEventListener('DOMContentLoaded', startPriceUpdates);
