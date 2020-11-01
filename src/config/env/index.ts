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
    flaskApi?: {
        HOST_ADDRESS: string;
        BASE_ADDRESS: string;
    };
    argoReact?: {
        BASE_ADDRESS: string;
    };
    secret: string;
    pushNotifyUrl?: string;
    arweaveUrl?: string;
    githubApp: {
        GITHUB_APP_CLIENT_ID: string;
        GITHUB_APP_CLIENT_SECRET: string;
        GITHUB_APP_CALLBACK_URL: string;
        GIT_HUB_APP_ID: string;
    },
    privateKey: {
        PRIVATE_KEY: string
    }
}

const NODE_ENV: string = process.env.NODE_ENV || 'test';

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
    flaskApi: {
        HOST_ADDRESS: process.env.INTERNAL_API || "http://localhost:5000/request_build/",
        BASE_ADDRESS: process.env.INTERNAL_API_BASE_ADDRESS || "http://localhost:5000"
    },
    argoReact: {
        BASE_ADDRESS: process.env.INTERNAL_FE_BASE_ADDRESS || "http://localhost:3000"
    },
    secret: process.env.SECRET || '@QEGTUIARGOTEST',
    pushNotifyUrl: process.env.PUSH_NOTIFY_URL,
    arweaveUrl: process.env.ARWEAVE_URL || "https://arweave.net/",
    githubApp: {
        GITHUB_APP_CLIENT_ID: process.env.GITHUB_APP_CLIENT_ID,
        GITHUB_APP_CLIENT_SECRET: process.env.GITHUB_APP_CLIENT_SECRET,
        GITHUB_APP_CALLBACK_URL: process.env.GITHUB_APP_CALLBACK_URL,
        GIT_HUB_APP_ID: process.env.GIT_HUB_APP_ID
    },
    privateKey: {
        PRIVATE_KEY: process.env.PRIVATE_KEY
    }
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN,
        MONGODB_ATLAS_OPTION: process.env.MONGODB_ATLAS_OPTION
    },
    github: {
        CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        CALLBACK_URL: process.env.GITHUB_CALLBACK_URL
    },
    gitlab: {
        CLIENT_ID: process.env.GITLAB_CLIENT_ID,
        CLIENT_SECRET: process.env.GITLAB_CLIENT_SECRET,
        CALLBACK_URL: process.env.GITLAB_CALLBACK_URL
    },
    smtp: {
        USERNAME: process.env.SMTP_USERNAME,
        PASSWORD: process.env.SMTP_PASSWORD
    },
    flaskApi: {
        HOST_ADDRESS: process.env.INTERNAL_API,
        BASE_ADDRESS: process.env.INTERNAL_API_BASE_ADDRESS
    },
    argoReact: {
        BASE_ADDRESS: process.env.INTERNAL_FE_BASE_ADDRESS
    },
    secret: process.env.SECRET,
    pushNotifyUrl: process.env.PUSH_NOTIFY_URL,
    arweaveUrl: process.env.ARWEAVE_URL,
    githubApp: {
        GITHUB_APP_CLIENT_ID: process.env.GITHUB_APP_CLIENT_ID,
        GITHUB_APP_CLIENT_SECRET: process.env.GITHUB_APP_CLIENT_SECRET,
        GITHUB_APP_CALLBACK_URL: process.env.GITHUB_APP_CALLBACK_URL,
        GIT_HUB_APP_ID: process.env.GIT_HUB_APP_ID
    },
    privateKey: {
        PRIVATE_KEY: process.env.PRIVATE_KEY
    }
};
const test: IConfig = {
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
    flaskApi: {
        HOST_ADDRESS: process.env.INTERNAL_API || "http://35.194.19.236:5000/request_build",
        BASE_ADDRESS: process.env.INTERNAL_API_BASE_ADDRESS || "http://35.194.19.236:5000/"
    },
    argoReact: {
        BASE_ADDRESS: process.env.INTERNAL_FE_BASE_ADDRESS || "http://35.194.19.236:3000/"
    },
    secret: process.env.SECRET || '@QEGTUIARGOTEST',
    pushNotifyUrl: process.env.PUSH_NOTIFY_URL,
    arweaveUrl: process.env.ARWEAVE_URL || "https://arweave.net/",
    githubApp: {
        GITHUB_APP_CLIENT_ID: process.env.GITHUB_APP_CLIENT_ID,
        GITHUB_APP_CLIENT_SECRET: process.env.GITHUB_APP_CLIENT_SECRET,
        GITHUB_APP_CALLBACK_URL: process.env.GITHUB_APP_CALLBACK_URL,
        GIT_HUB_APP_ID: process.env.GIT_HUB_APP_ID
    },
    privateKey: {
        PRIVATE_KEY: process.env.PRIVATE_KEY
    }
};

const config: {
    [name: string]: IConfig
} = {
    development,
    production,
    test
};

export default config[NODE_ENV];
