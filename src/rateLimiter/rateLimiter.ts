import { UserRLConfig } from "../userRLConfig";

export interface RateLimiter {
    isAllowed(userRLConfig: UserRLConfig): boolean;
}