import express, { NextFunction } from 'express';
import { RateLimiterMiddleware } from './rateLimiter/rateLimiterMiddleware';
import { SlidingWindowRateLimiter } from './rateLimiter/slidingWindowRateLimiter';
import { RateLimiter } from './rateLimiter/rateLimiter';
import { UserRLConfig } from './userRLConfig';

class App {

    public express;

    private userRateLimitMap: Map<string, UserRLConfig>;
    
    constructor () {
        this.express = express();
        this.userRateLimitMap = new Map();
        this.express.use(RateLimiterMiddleware(new SlidingWindowRateLimiter(), this.userRateLimitMap));
        this.mountRoutes();
    }

    private mountRoutes (): void {
        try {
            const router = express.Router()
            router.get('/', (req, res) => {
                res.json({
                message: 'Hello World!'
                });
            });
            this.express.use('/', router);
        } catch(exception){
            console.log(`Exception while calling route`,exception);
        }
    }
}

export default new App().express