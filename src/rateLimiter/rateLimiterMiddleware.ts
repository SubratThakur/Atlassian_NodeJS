import { NextFunction, Request, Response } from "express";
import { RateLimiter } from "./rateLimiter";
import { UserRLConfig } from "../userRLConfig";
import { isEmpty } from "lodash";

export function RateLimiterMiddleware(rl: RateLimiter, userRateLimitMap: Map<string, UserRLConfig>) {
    // Return an Express middleware function

    return function rlMiddleware(req: Request, res:Response, next:NextFunction) {
        console.log('Request intercepted: ', req.header);
        const customerID = req.query.customerId;
        let userrlCofig: UserRLConfig;
        if(!isEmpty(customerID)){
            if(userRateLimitMap.has(customerID as string)){
                userrlCofig = userRateLimitMap.get(customerID as string) || new UserRLConfig(4, 10, customerID as string);
            } else {
                userrlCofig = new UserRLConfig(4, 10000, customerID as string);
                userRateLimitMap.set(customerID as string, userrlCofig);
            }
            if(rl?.isAllowed(userrlCofig)){
                next();
            } else {
                res
                .status(429)
                .json({
                    success: true,
                    message: 'Request added for async processing'
                });
            }
        } else {
            res
            .status(429)
            .json({
                success: true,
                message: 'Request added for async processing'
            });
        }
    }
}
