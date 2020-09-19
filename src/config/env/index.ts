import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
        MONGODB_ATLAS_OPTION: string;
    };
    github?: {
        CLIENT_ID: string;
        CLIENT_SECRET: string;
        CALLBACK_URL: string;
    };
    gitlab?: {
        CLIENT_ID: string;
        CLIENT_SECRET: string;
        CALLBACK_URL: string;
    };
    smtp?: { 
        USERNAME: string;
        PASSWORD: string;
    };
    secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
        MONGODB_ATLAS_OPTION: process.env.MONGODB_ATLAS_OPTION || 'retryWrites=true&w=majority',
    },
    github: {
        CLIENT_ID: process.env.GITHUB_CLIENT_ID || 'xyz',
        CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || 'uvx',
        CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || 'wq',
    },
    gitlab: {
        CLIENT_ID: process.env.GITLAB_CLIENT_ID || 'xyz',
        CLIENT_SECRET: process.env.GITLAB_CLIENT_SECRET || 'uvx',
        CALLBACK_URL: process.env.GITLAB_CALLBACK_URL || 'wq',
    },
    smtp: { 
        USERNAME: process.env.SMTP_USERNAME || 'abcd',
        PASSWORD: process.env.SMTP_PASSWORD || 'abcd',
    },
    secret: process.env.SECRET || '@QEGTUIARGOTEST'
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
        MONGODB_ATLAS_OPTION: process.env.MONGODB_ATLAS_OPTION || 'retryWrites=true&w=majority',
    },
    secret: process.env.SECRET || '@QEGTUI'
};

const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        MONGODB_DB_MAIN: 'test_users_db',
        MONGODB_ATLAS_OPTION: process.env.MONGODB_ATLAS_OPTION || 'retryWrites=true&w=majority',
    },
    secret: process.env.SECRET || '@QEGTUI'
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production
};

export default config[NODE_ENV];
