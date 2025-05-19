import { UserRLConfig } from "../userRLConfig";
import { RateLimiter } from "./rateLimiter";

export class SlidingWindowRateLimiter implements RateLimiter{

    constructor(){
    }

    isAllowed(userRLConfig: UserRLConfig): boolean {
        const currentTime = new Date().getTime(); // 3472346786834
        const lastWindowTime = currentTime- userRLConfig.timeWindow; //3472346786824
        while(userRLConfig.requests.length>0 && userRLConfig.requests[0]<lastWindowTime){
            userRLConfig.requests.shift();
        }
        if(userRLConfig.requests.length>userRLConfig.capacity){
            return false;
        }
        userRLConfig.requests.push(currentTime);
        return true;
    }
}