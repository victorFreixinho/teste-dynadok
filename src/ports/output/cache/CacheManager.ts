export interface CacheManager {
  saveCustomer(id: string, customer: Object): Promise<void>
  getCustomer(id: string): Promise<any> 
  close(): void 
}
