import { Injectable } from '@nestjs/common';
import * as pgPromise from 'pg-promise';

const pgp = pgPromise(); // Initialisez pg-promise

@Injectable()
export class DatabaseService {
  private readonly db;

  constructor() {
    // Configurez la connexion à la base de données
    this.db = pgp({
      host: 'localhost',
      port: 5432,
      database: 'placement-direct',
      user: 'postgres',
      password: 'Serbao"(',
    });
  }

  // Vous pouvez ajouter des méthodes pour interagir avec la base de données ici
}
