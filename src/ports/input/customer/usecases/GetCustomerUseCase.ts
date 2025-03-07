import { GetCustomerParams, GetCustomerResult } from "./types";

export interface GetCustomerUseCase {
    execute(params: GetCustomerParams): GetCustomerResult
}