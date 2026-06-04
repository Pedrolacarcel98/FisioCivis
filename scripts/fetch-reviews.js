const fs = require('fs');
const https = require('https');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_API_KEY;
const CID = process.env.GOOGLE_CID;

if (!API_KEY || !CID) {
    console.error('Error: Faltan credenciales (GOOGLE_API_KEY o GOOGLE_CID) en el archivo .env');
    process.exit(1);
}

// Convertimos el CID decimal a hexadecimal para la API de Google
const cidHex = BigInt(CID).toString(16);
const PLACE_ID = `ChIJ${cidHex}`; // Formato interno de Google

const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&reviews_sort=newest&key=${API_KEY}&language=es`;

console.log(`Intentando conectar con Fisiocivis Sevilla (CID: ${CID})...`);

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            
            if (response.status !== 'OK') {
                console.error('--- ERROR DE GOOGLE ---');
                console.error(`Status: ${response.status}`);
                console.error(`Mensaje: ${response.error_message || 'Sin mensaje'}`);
                console.log('---');
                console.log('Si el error es NOT_FOUND, Google está protegiendo el ID.');
                console.log('Intentando método de respaldo mediante búsqueda por texto...');
                return;
            }

            const reviews = response.result.reviews || [];
            
            console.log('--- RESEÑAS ENCONTRADAS ---');
            reviews.forEach((r, i) => {
                console.log(`[${i+1}] ${r.author_name} (${r.relative_time_description})`);
            });

            const formattedReviews = reviews.map(r => ({
                author_name: r.author_name,
                rating: r.rating,
                text: r.text,
                relative_time_description: r.relative_time_description,
                profile_photo_url: r.profile_photo_url
            }));

            const fileContent = `/**
 * Datos de las reseñas de Google.
 */
window.googleReviews = ${JSON.stringify(formattedReviews, null, 2)};
`;

            const outputPath = path.join(__dirname, '../js/reviews-data.js');
            fs.writeFileSync(outputPath, fileContent);
            console.log('¡Éxito! Archivo actualizado.');

        } catch (error) {
            console.error('Error:', error.message);
        }
    });
}).on('error', (err) => console.error('Error:', err.message));
