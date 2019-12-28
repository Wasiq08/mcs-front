import { Hobby } from './hobby';

export interface User {
    _id?: any;
    name: String;
    email?: String;
    hobbies?: Array<Hobby>;
}
