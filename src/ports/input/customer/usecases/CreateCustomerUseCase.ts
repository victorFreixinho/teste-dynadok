import { CreateCustomerParams, CreateCustomerResult } from "./types/CreateCustomerUseCase.types";

export interface CreateCustomerUseCase {
    execute(params: CreateCustomerParams): CreateCustomerResult;
}