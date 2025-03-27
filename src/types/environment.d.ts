declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string;
        NODE_ENV: 'development' | 'production' | 'test';
        JWT_SECRET_KEY: string;
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_USER: string;
        SMTP_PASS: string;
        SMTP_FROM: string;
        SMTP_SECURE: string;
        NEXT_PUBLIC_APP_URL: string;
        DATABASE_URL: string;
        TOSS_PAYMENTS_API_KEY: string;
        TOSS_PAYMENTS_API_SECRET: string;
    }
}

export {}; 