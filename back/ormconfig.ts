import { DataSource } from "typeorm";


export const connectionSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Serbao"(',
    database: 'placement-direct',
    synchronize: false, // À utiliser avec précaution en production
    logging: false,
    entities: ['src/users/**/*.entity.ts'], // Chemin relatif depuis le répertoire "back"
    migrations: ['migrations/**/*.ts'], // Chemin relatif depuis le répertoire "back"

});
