export class UserRLConfig {
     customerId: string;
     // Maximum allowed request
     capacity: number;
     // Time for sliding window
     timeWindow: number; //10sec
     // Keep all the allowed request;
     requests: number[];
 
     constructor(capacity: number, timeWindow: number, customerId: string){
        this.customerId = customerId;
        this.capacity = capacity;
        this.timeWindow = timeWindow;
        this.requests = [];
     }
 
}