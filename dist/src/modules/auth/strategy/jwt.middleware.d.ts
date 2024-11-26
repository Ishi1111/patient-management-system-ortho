import { NestMiddleware } from '@nestjs/common';
export declare class JwtMiddleware implements NestMiddleware {
    use(req: any, res: any, next: any): Promise<void>;
}
