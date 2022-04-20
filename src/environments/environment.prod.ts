export const environment = {
  production: true,
  baseUrl: (<any>window)['env']['backendBaseUrl'] || 'https://localhost:7184',
  nodeEventsFetchingInterval: (<any>window)['env']['nodeEventsFetchingInterval'] || 30000,
};
