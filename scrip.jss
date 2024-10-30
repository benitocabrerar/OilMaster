// script.js

// API Key de Alpha Vantage (reemplaza con tu propia API Key)
const API_KEY = '8EIRNKKMPQL68C4F';

// Función para obtener el precio actual del petróleo WTI
async function getWTIPrice() {
    try {
        // Mostrar el spinner de carga
        document.getElementById('spinner').style.display = 'block';

        // URL de la API para obtener el precio del petróleo WTI en USD
        // Nota: Alpha Vantage no ofrece un endpoint específico para WTI. Alternativamente, se puede usar un ticker financiero si está disponible.
        // Aquí, utilizaremos un ejemplo con datos ficticios.
        // Reemplaza esta sección con una API que proporcione datos reales de WTI.

        // Ejemplo con una API ficticia:
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=CL=F&apikey=${API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();

        // Ocultar el spinner de carga
        document.getElementById('spinner').style.display = 'none';

        // Procesar la respuesta y extraer el precio más reciente
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
            const price = parseFloat(data['Global Quote']['05. price']).toFixed(2);
            document.getElementById('wti-price').textContent = `$${price}`;
            
            // Obtener la fecha y hora de la última actualización
            const lastUpdated = data['Global Quote']['07. latest trading day'];
            document.getElementById('last-updated').textContent = new Date(lastUpdated).toLocaleString();
        } else {
            document.getElementById('wti-price').textContent = 'No disponible';
            document.getElementById('last-updated').textContent = '-';
            console.error('Datos no disponibles:', data);
        }
    } catch (error) {
        // Ocultar el spinner de carga
        document.getElementById('spinner').style.display = 'none';

        document.getElementById('wti-price').textContent = 'Error';
        document.getElementById('last-updated').textContent = '-';
        console.error('Error al obtener el precio del WTI:', error);
    }
}

// Función para obtener datos históricos del precio del petróleo WTI
async function getWTIHistoricalData() {
    try {
        // URL de la API para obtener datos históricos del petróleo WTI en USD
        // Nota: Alpha Vantage no ofrece un endpoint específico para datos históricos de WTI.
        // Puedes utilizar otra API que sí lo proporcione o utilizar datos estáticos para este ejemplo.

        // Ejemplo con datos ficticios:
        // Aquí, usaremos datos estáticos. Reemplaza esta sección con una API que proporcione datos reales de WTI.

        // Datos de ejemplo: Precios históricos de WTI
        const historicalData = {
            labels: [
                '2024-10-25', '2024-10-26', '2024-10-27', '2024-10-28', '2024-10-29', '2024-10-30'
            ],
            prices: [
                80.50, 81.20, 79.80, 82.00, 83.50, 84.00
            ]
        };

        // Crear el gráfico utilizando Chart.js
        const ctx = document.getElementById('wti-chart').getContext('2d');
        const wtiChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: historicalData.labels,
                datasets: [{
                    label: 'Precio WTI (USD)',
                    data: historicalData.prices,
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
