import * as express from 'express'
import Cat from './models/Cat'
import Dog from './models/Dog'
import Bird from './models/Bird'
import { v4 as uuid } from 'uuid';
import cors from 'cors'

class Router {

    constructor(server: express.Express) {
        const router = express.Router()

        const cats = new Map<string, Cat>();
        cats[uuid()] = { genus: "feline", name: "Cosmo", isHungry: true, lastFedDate: new Date() }
        cats[uuid()] = { genus: "feline", name: "Emmy", isHungry: true, lastFedDate: new Date() }

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `Nothing to see here, [url]/cats instead.`
            })
        })
        const dogs = new Map<string, Dog>();
        dogs[uuid()] = { genus: "dog", name: "Dogie", isHungry: true, lastFedDate: new Date() }
        dogs[uuid()] = { genus: "dog", name: "Brownie", isHungry: true, lastFedDate: new Date() }

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `Nothing to see here, [url]/dogs instead.`
            })
        })
        const birds = new Map<string, Bird>();
        birds[uuid()] = { genus: "bird", name: "Birdie", isHungry: true, lastFedDate: new Date() }
        birds[uuid()] = { genus: "bird", name: "Twitty", isHungry: true, lastFedDate: new Date() }

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `Nothing to see here, [url]/birds instead.`
            })
        })

        //get all cats
        router.get('/cats', cors(), (req: express.Request, res: express.Response) => {
            res.json({
                cats
            })
        })
        router.get('/dogs', cors(), (req: express.Request, res: express.Response) => {
            res.json({
                dogs
            })
        })
        router.get('/birds', cors(), (req: express.Request, res: express.Response) => {
            res.json({
                birds
            })
        })

        //create new cat
        router.post('/cats', cors(), (req: express.Request, res: express.Response) => {
            try {
                let cat: Cat = {} as Cat;
                Object.assign(cat, req.body)
                const newUUID = uuid();
                cats[newUUID] = cat;
                res.json({
                    uuid: newUUID
                })
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })
        router.post('/dogs', cors(), (req: express.Request, res: express.Response) => {
            try {
                let dog: Dog = {} as Dog;
                Object.assign(dog, req.body)
                const newUUID = uuid();
                cats[newUUID] = dog;
                res.json({
                    uuid: newUUID
                })
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })
        router.post('/birds', cors(), (req: express.Request, res: express.Response) => {
            try {
                let bird: Bird = {} as Bird;
                Object.assign(bird, req.body)
                const newUUID = uuid();
                cats[newUUID] = bird;
                res.json({
                    uuid: newUUID
                })
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })

        //get cat by id
        router.get('/cats/:id', cors(), (req: express.Request, res: express.Response) => {
            if (!!cats[req.params.id]) {
                res.json({
                    cat: cats[req.params.id]
                })
            } else {
                res.status(404).send(JSON.stringify({ "error": "no such cat" }));
            }
        })
        router.get('/dogs/:id', cors(), (req: express.Request, res: express.Response) => {
            if (!!dogs[req.params.id]) {
                res.json({
                    dog: dogs[req.params.id]
                })
            } else {
                res.status(404).send(JSON.stringify({ "error": "no such dog" }));
            }
        })
        router.get('/birds/:id', cors(), (req: express.Request, res: express.Response) => {
            if (!!birds[req.params.id]) {
                res.json({
                    bird: birds[req.params.id]
                })
            } else {
                res.status(404).send(JSON.stringify({ "error": "no such bird" }));
            }
        })

        //update cat
        router.put('/cats/:id', cors(), (req: express.Request, res: express.Response) => {
            try {
                if (!!cats[req.params.id]) {
                    let cat: Cat = {} as Cat;
                    Object.assign(cat, req.body)
                    cats[req.params.id] = cat;
                    res.json({
                        cat: cats[req.params.id]
                    })
                } else {
                    res.status(404).send(JSON.stringify({ "error": "no such cat" }));
                }
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })
        router.put('/dogs/:id', cors(), (req: express.Request, res: express.Response) => {
            try {
                if (!!dogs[req.params.id]) {
                    let dog: Dog = {} as Dog;
                    Object.assign(dog, req.body)
                    cats[req.params.id] = dog;
                    res.json({
                        dog: dogs[req.params.id]
                    })
                } else {
                    res.status(404).send(JSON.stringify({ "error": "no such dog" }));
                }
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })
        router.put('/birds/:id', cors(), (req: express.Request, res: express.Response) => {
            try {
                if (!!birds[req.params.id]) {
                    let bird: Bird = {} as Bird;
                    Object.assign(bird, req.body)
                    birds[req.params.id] = bird;
                    res.json({
                        bird: birds[req.params.id]
                    })
                } else {
                    res.status(404).send(JSON.stringify({ "error": "no such bird" }));
                }
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })

        //delete cat
        router.delete('/cats/:id', cors(), (req: express.Request, res: express.Response) => {
            if (!!cats[req.params.id]) {
                delete cats[req.params.id]
                res.json({
                    uuid: req.params.id
                })
            } else {
                res.status(404).send(JSON.stringify({ "error": "no such cat" }));
            }
        });
        router.delete('/dogs/:id', cors(), (req: express.Request, res: express.Response) => {
            if (!!dogs[req.params.id]) {
                delete dogs[req.params.id]
                res.json({
                    uuid: req.params.id
                })
            } else {
                res.status(404).send(JSON.stringify({ "error": "no such dog" }));
            }
        });
        router.delete('/birds/:id', cors(), (req: express.Request, res: express.Response) => {
            if (!!birds[req.params.id]) {
                delete birds[req.params.id]
                res.json({
                    uuid: req.params.id
                })
            } else {
                res.status(404).send(JSON.stringify({ "error": "no such bird" }));
            }
        });

        router.options('*', cors());

        server.use('/', router)
    }
}

export default Router;