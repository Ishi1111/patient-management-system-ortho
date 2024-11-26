export declare const configuration: () => {
    server: {
        env: string;
        port: string;
    };
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
        cache: boolean;
    };
    jwt: {
        expire_in: number;
        secret: string;
    };
    cookie_secret: {
        secret: string;
    };
};
