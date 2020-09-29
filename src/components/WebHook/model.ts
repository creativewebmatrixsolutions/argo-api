/**
 * @export
 * @interface IWebHook
 */
export interface IWebHook{
    owner: String;
    repo: String;
    events: String[];
    configUrl: String;
}