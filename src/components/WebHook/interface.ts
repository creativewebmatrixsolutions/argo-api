import { IWebHook } from './model';

/**
 * @export
 * @interface IWebHookService
 */
export interface IWebHookService {
  /**
   * @param {IWebHookService} IUserInvite
   * @returns {Promise<IWebHook>}
   * @memberof IWebHookService
   */
    createHook(webHookCreationDto: IWebHook): Promise<any>;
}
