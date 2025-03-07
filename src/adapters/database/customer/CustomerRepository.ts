import { BaseRepository } from "../base/BaseRepository";
import { CustomerEntity } from "./CustomerEntity";

export interface CustomerRepository extends BaseRepository<CustomerEntity> {}