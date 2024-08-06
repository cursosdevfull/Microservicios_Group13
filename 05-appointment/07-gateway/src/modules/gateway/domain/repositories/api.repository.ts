export type ApiRepository = {
  requestByType(url: string, method: string, data?: any): Promise<any>;
};
