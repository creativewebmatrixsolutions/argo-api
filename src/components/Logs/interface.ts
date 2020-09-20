import { Types } from "mongoose";


export interface IDeploymentService {

    createAndDeployRepo(body: any): Promise<Types.ObjectId>;
}

export interface IInternalApiDto {
    github_url: string;
    folder_name: string;
    topic: string;
}

export interface IDeploymentDto {
    sitePreview: string;
    commitId: string;
    log: [string];
    createdAt: Date;
}