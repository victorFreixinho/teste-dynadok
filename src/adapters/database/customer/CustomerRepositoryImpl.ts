import { Model } from "mongoose";
import { CustomerEntity } from "./CustomerEntity";
import { CustomerRepository } from "./CustomerRepository";
import { BaseRepositoryImpl } from "../base/BaseRepositoryImpl";
import { inject, injectable } from "inversify";
import { DiTokens } from "../../../shared/DiTokens";

@injectable()
export class CustomerRepositoryImpl extends BaseRepositoryImpl<CustomerEntity> implements CustomerRepository {
    constructor(@inject(DiTokens.CustomerModel) model: Model<CustomerEntity>) {
        super(model);
    }
}