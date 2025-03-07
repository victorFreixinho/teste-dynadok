import { BaseEntity } from "../base/BaseEntity";

export interface CustomerEntity extends BaseEntity {
    name: string;
    email: string;
    phone: string;
}