const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
  * Génération des nouvelles couleurs et enregistrement de ces
  * couleurs dans un tableau.
  */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentCulor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}
// <-- FIN


/**
  * CASE 1
  */
describe('/GET /colors Récupérer la liste de couleur', () => {
  // Vérification du status de la réponse.
  it('Verifier le status 200', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  // Vérification de l'header de la réponse.
  it('Vérifier qu’il s’agit de json', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        expect(res).to.be.json
        done()
      })
  })

  // Vérification du type du body.
  it('Vérifier que le body est bien un objet', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        res.body.should.be.an('object')
        done()
      })
  })

  // Vérification du type des couleurs.
  it('Vérifier que le résultat du body est bien un array', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        expect(res.body.results).to.be.an('array')
        done()
      })
  })

  // Vérification des couleurs obtenu.
  it('Vérifier que le contenu retourné est correct', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        for (color of res.body.results) {
          expect(color).to.be.a.string
        }
        done()
      })
  })
})

/**
  * CASE 2
  */
describe('/POST /colors Récupérer un path invalide', () => {
  // Vérification du status de la réponse.
  it('Verifier le status 201', (done) => {
    chai.request(app)
      .post('/colors')
      .send(payloadColor())
      .end((err, res) => {
        res.should.have.status(201)
        done()
      })
  })

  // Vérification de l'header de la réponse.
  it('Vérifier qu’il s’agit de json', (done) => {
    chai.request(app)
      .post('/colors')
      .send(payloadColor())
      .end((err, res) => {
        expect(res).to.be.json
        done()
      })
  })

  // Vérification du type du body.
  it('Vérifier que le body est bien un objet', (done) => {
    chai.request(app)
      .post('/colors')
      .send(payloadColor())
      .end((err, res) => {
        res.body.should.be.an('object')
        done()
      })
  })

  // Vérification que le type du résultat est un array.
  it('Vérifier que le résultat du body est bien un array', (done) => {
    chai.request(app)
      .post('/colors')
      .send(payloadColor())
      .end((err, res) => {
        expect(res.body.results).to.be.an('array')
        done()
      })
  })

  // Vérification de la nouvelle couleur lors d'un ajout.
  it('Vérifier que le contenu inclut bien la nouvelle valeur ajoutée', (done) => {
    chai.request(app)
      .post('/colors')
      .send(payloadColor())
      .end((err, res) => {
        expect(res.body.results).that.does.include(getCurrentCulor());
        done()
      })
  })
})

/**
  * CASE 3
  */
describe('/POST /colors Poster une nouvelle couleur', () => {
  // Vérification du status de la réponse.
  it('Verifier le status 404 (throw catch)', (done) => {
    chai.request(app)
      .post('/colorss')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })
})

/**
  * CASE 4
  */
describe('/GET /colors Récupérer la nouvelle liste de couleur', () => {
  // Vérification du status de la réponse.
  it('Verifier le status 200', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  // Vérification de l'header de la réponse.
  it('Vérifier qu’il s’agit de json', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        expect(res).to.be.json
        done()
      })
  })

  // Vérification du type du body.
  it('Vérifier que le body est bien un objet', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        res.body.should.be.an('object')
        done()
      })
  })

  // Vérification du type des couleurs.
  it('Vérifier que le résultat du body est bien un array', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        expect(res.body.results).to.be.an('array')
        done()
      })
  })

  // Vérification des nouvelles couleurs ajoutés.
  it('Vérifier que le contenu retourné est correct', (done) => {
    chai.request(app)
      .get('/colors')
      .end((err, res) => {
        expect(res.body.results).any.to.be.a.string
        expect(res.body.results).to.include.members(newValues);
        done()
      })
  })
})
