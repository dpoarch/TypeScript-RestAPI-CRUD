"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
class Router {
    constructor(server) {
        const router = express.Router();
        const cats = new Map();
        cats[uuid_1.v4()] = { genus: "feline", name: "Cosmo", isHungry: true, lastFedDate: new Date() };
        cats[uuid_1.v4()] = { genus: "feline", name: "Emmy", isHungry: true, lastFedDate: new Date() };
        router.get('/', (req, res) => {
            res.json({
                message: `Nothing to see here, [url]/cats instead.`
            });
        });
        const dogs = new Map();
        dogs[uuid_1.v4()] = { genus: "dog", name: "Dogie", isHungry: true, lastFedDate: new Date() };
        dogs[uuid_1.v4()] = { genus: "dog", name: "Brownie", isHungry: true, lastFedDate: new Date() };
        router.get('/', (req, res) => {
            res.json({
                message: `Nothing to see here, [url]/dogs instead.`
            });
        });
        const birds = new Map();
        birds[uuid_1.v4()] = { genus: "bird", name: "Birdie", isHungry: true, lastFedDate: new Date() };
        birds[uuid_1.v4()] = { genus: "bird", name: "Twitty", isHungry: true, lastFedDate: new Date() };
        router.get('/', (req, res) => {
            res.json({
                message: `Nothing to see here, [url]/birds instead.`
            });
        });
        //get all cats
        router.get('/cats', cors_1.default(), (req, res) => {
            res.json({
                cats
            });
        });
        router.get('/dogs', cors_1.default(), (req, res) => {
            res.json({
                dogs
            });
        });
        router.get('/birds', cors_1.default(), (req, res) => {
            res.json({
                birds
            });
        });
        //create new cat
        router.post('/cats', cors_1.default(), (req, res) => {
            try {
                let cat = {};
                Object.assign(cat, req.body);
                const newUUID = uuid_1.v4();
                cats[newUUID] = cat;
                res.json({
                    uuid: newUUID
                });
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        router.post('/dogs', cors_1.default(), (req, res) => {
            try {
                let dog = {};
                Object.assign(dog, req.body);
                const newUUID = uuid_1.v4();
                cats[newUUID] = dog;
                res.json({
                    uuid: newUUID
                });
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        router.post('/birds', cors_1.default(), (req, res) => {
            try {
                let bird = {};
                Object.assign(bird, req.body);
                const newUUID = uuid_1.v4();
                cats[newUUID] = bird;
                res.json({
                    uuid: newUUID
                });
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        //get cat by id
        router.get('/cats/:id', cors_1.default(), (req, res) => {
            if (!!cats[req.params.id]) {
                res.json({
                    cat: cats[req.params.id]
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such cat" }));
            }
        });
        router.get('/dogs/:id', cors_1.default(), (req, res) => {
            if (!!dogs[req.params.id]) {
                res.json({
                    dog: dogs[req.params.id]
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such dog" }));
            }
        });
        router.get('/birds/:id', cors_1.default(), (req, res) => {
            if (!!birds[req.params.id]) {
                res.json({
                    bird: birds[req.params.id]
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such bird" }));
            }
        });
        //update cat
        router.put('/cats/:id', cors_1.default(), (req, res) => {
            try {
                if (!!cats[req.params.id]) {
                    let cat = {};
                    Object.assign(cat, req.body);
                    cats[req.params.id] = cat;
                    res.json({
                        cat: cats[req.params.id]
                    });
                }
                else {
                    res.status(404).send(JSON.stringify({ "error": "no such cat" }));
                }
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        router.put('/dogs/:id', cors_1.default(), (req, res) => {
            try {
                if (!!dogs[req.params.id]) {
                    let dog = {};
                    Object.assign(dog, req.body);
                    cats[req.params.id] = dog;
                    res.json({
                        dog: dogs[req.params.id]
                    });
                }
                else {
                    res.status(404).send(JSON.stringify({ "error": "no such dog" }));
                }
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        router.put('/birds/:id', cors_1.default(), (req, res) => {
            try {
                if (!!birds[req.params.id]) {
                    let bird = {};
                    Object.assign(bird, req.body);
                    birds[req.params.id] = bird;
                    res.json({
                        bird: birds[req.params.id]
                    });
                }
                else {
                    res.status(404).send(JSON.stringify({ "error": "no such bird" }));
                }
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        //delete cat
        router.delete('/cats/:id', cors_1.default(), (req, res) => {
            if (!!cats[req.params.id]) {
                delete cats[req.params.id];
                res.json({
                    uuid: req.params.id
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such cat" }));
            }
        });
        router.delete('/dogs/:id', cors_1.default(), (req, res) => {
            if (!!dogs[req.params.id]) {
                delete dogs[req.params.id];
                res.json({
                    uuid: req.params.id
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such dog" }));
            }
        });
        router.delete('/birds/:id', cors_1.default(), (req, res) => {
            if (!!birds[req.params.id]) {
                delete birds[req.params.id];
                res.json({
                    uuid: req.params.id
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such bird" }));
            }
        });
        router.options('*', cors_1.default());
        server.use('/', router);
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map