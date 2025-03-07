export interface MessagingManager {
    connect(): Promise<void>;
    publish(queue: string, message: string): Promise<void> 
    consume(queue: string, callback: (message: string) => void): Promise<void> 
    close(): Promise<void> 
}