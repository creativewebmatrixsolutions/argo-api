import { Types } from "mongoose";
import { IDeployment } from "../Organization/model";


export interface IDeploymentService {

    createAndDeployRepo(body: any, topic: string): Promise<Types.ObjectId>;
    FindOneDeployment(deploymentId: string): Promise<IDeployment>;
}

export interface IInternalApiDto {
    github_url: string;
    folder_name: string;
    topic: string;
    package_manager: string;
    branch: string
}

export interface IDeploymentDto {
    sitePreview: string;
    commitId: string;
    log: [string];
    createdAt: any;
    topic: string;
}