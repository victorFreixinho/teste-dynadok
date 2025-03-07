import { ListCustomersResult } from "./types";

export interface ListCustomersUseCase {
    execute(): ListCustomersResult;
}