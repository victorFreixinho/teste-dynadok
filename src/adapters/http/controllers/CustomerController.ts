import { NextFunction, Request, Response } from "express";
import { CreateCustomerUseCase, ListCustomersUseCase, GetCustomerUseCase, UpdateCustomerUseCase } from "../../../ports/input/customer";
import { DeleteCustomerUseCase } from "../../../ports/input/customer/usecases/DeleteCustomerUseCase";
import { inject, injectable } from "inversify";
import { DiTokens } from "../../../shared/DiTokens";

@injectable()
export class CustomerController {

    constructor(
        @inject(DiTokens.CreateCustomerUseCase) private readonly createCustomerUseCase: CreateCustomerUseCase,
        @inject(DiTokens.GetCustomerUseCase) private readonly getCustomerUseCase: GetCustomerUseCase,
        @inject(DiTokens.ListCustomersUseCase) private readonly listCustomersUseCase: ListCustomersUseCase,
        @inject(DiTokens.UpdateCustomerUseCase) private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        @inject(DiTokens.DeleteCustomerUseCase) private readonly deleteCustomerUseCase: DeleteCustomerUseCase
    ) {}

    async createCustomer(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const params = request.body;
            const customer = await this.createCustomerUseCase.execute(params);
            response.status(201).json(customer);
        }   catch (error) {
            next(error);
        }
    }

    async getCustomer(request: Request, response: Response, next: NextFunction):  Promise<void> {
        try {
            const params = {
                id: request.params.id
            }
            const customer = await this.getCustomerUseCase.execute(params);
            response.status(200).json(customer);
        }   catch (error) {
            next(error);
        }
    }

    async listCustomers(request: Request, response: Response, next: NextFunction):  Promise<void> {
        try {
            const customers = await this.listCustomersUseCase.execute();
            response.status(200).json(customers);
        } catch (error) {
            next(error);
        }
    }

    async updateCustomer(request: Request, response: Response, next: NextFunction):  Promise<void> {
        try {
            const params = {
                id: request.params.id,
                ...request.body
            }
            const customer = await this.updateCustomerUseCase.execute(params);
            response.status(200).json(customer);
        } catch(error) {
            next(error);
        }
    }

    async deleteCustomer(request: Request, response: Response, next: NextFunction):  Promise<void> {
        try {
            const params = {
                id: request.params.id
            }
            await this.deleteCustomerUseCase.execute(params);
            response.status(204).send();
        } catch(error) {
            next(error);
        }
    }
}