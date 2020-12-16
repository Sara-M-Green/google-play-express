const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /apps', () => {
    it('Should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)
                const app = res.body[0]
                expect(app).to.include.any.keys(
                    'Category', 'Rating', 'Genre', 'Type'
                );
            });
    });
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400, 'We can only search by title or rank');
    });
    it('should be 400 if genre is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({genre: 'MISTAKE'})
            .expect(400, 'Must enter a valid genre');
    });
    it('Should sort by App', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'App'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;

                while (i < res.body.length - 1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i +1];

                    if(appAtIPlus1.App < appAtI.App) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });
    it('Should sort by Rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;

                while (i < res.body.length - 1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i +1];

                    if(appAtIPlus1.Rating < appAtI.Rating) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });

    it('Should filter by genre', () => {
        return supertest(app)
            .get('/apps')
            .query({genre: 'Action'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let filtered = true;

                let i = 0;
                while (i < res.body.length) {
                    const appAtI = res.body[i];
                    if (!appAtI.Genres.includes('Action')) {
                        filtered = false;
                        break;
                    }
                    i++
                }
                expect(filtered).to.be.true;
            })
    })
});