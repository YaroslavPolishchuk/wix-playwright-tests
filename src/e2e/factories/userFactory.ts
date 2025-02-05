import { User } from "../models/User";
import {faker} from '@faker-js/faker' 

export class UserFactory {
    static getUser(): User {
        return new User(faker.internet.username(),faker.internet.password());
    }
}