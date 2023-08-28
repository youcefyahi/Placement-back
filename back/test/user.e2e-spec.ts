import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';



describe('UserController E2E test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();

    });

    it('un nouvelle utilsateur doit étre crée', () => {
        return request(app.getHttpServer()).post('/api/auth/register').send({
            email: "qsdqsdsqsd@gmail.com", password: "motdepasse", firstName: "teste", lastName: "teste", phone: "0626262626"
        })
            .expect(201)
    });

    it('utilisateur connecter', () => {
        return request(app.getHttpServer()).post('/api/auth/login').send({
            email: "teste@gmail.com", password: "motdepasse",
        })
            .expect(201)
    });

    it('utilisateur modifier', () => {


        const userData = {
            email: "teste@gmail.com",
            password: "motdepasse",
            firstName: "tesssste",
            lastName: "teste",
            phone: "0101010101"
        };
        const yourAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJpYXQiOjE2OTMxNTIwMzEsImV4cCI6MTY5MzIzODQzMX0.fYPAuQm6AO13MgTU2foK4lIjMHQDBE_-47Nyh6A3ecg"

        return request(app.getHttpServer()).put(`/api/user/`)
            .send(userData)
            .set('Authorization', `Bearer ${yourAuthToken}`)

    });

    it('motdepasse modifier', () => {


        const userData = {
            email: "teste@gmail.com",
            password: "motdepassenouveau",
        };
        const yourAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJpYXQiOjE2OTMxNTIwMzEsImV4cCI6MTY5MzIzODQzMX0.fYPAuQm6AO13MgTU2foK4lIjMHQDBE_-47Nyh6A3ecg"

        return request(app.getHttpServer()).put(`/api/user/password`)
            .send(userData)
            .set('Authorization', `Bearer ${yourAuthToken}`)

    });

});

