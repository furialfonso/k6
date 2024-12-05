import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10, // Número de usuarios virtuales
    duration: '30s', // Duración de la prueba
};

export default function () {
    const url = 'http://host.docker.internal:8081/users';
    
    // Leer el token de la variable de entorno
    const token = __ENV.AUTH_TOKEN;

    if (!token) {
        throw new Error('El token de autorización no está definido en las variables de entorno.');
    }

    const params = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    const res = http.get(url, params);

    // Imprimir el cuerpo de la respuesta
    console.log(`status: ${res.status}`);

    // Validar que el status sea 200
    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // Pausa entre solicitudes (opcional)
    sleep(1);
}
