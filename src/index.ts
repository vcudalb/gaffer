import 'reflect-metadata';
import 'dotenv/config';
import container from "./inversify.config";
import {TYPES} from "./Types";
import {Gaffer} from "./Gaffer";

let gaffer = container.get<Gaffer>(TYPES.Gaffer);

gaffer.listen().then(() => {
    console.log('Logged in!')
}).catch((error) => {
    console.log('Oh no! ', error)
});