// environments/environment.ts
export const environment = {
  production: false,
  useMockData: true,
  api: {
      url: 'http://localhost:4200/api',
      timeout: 30000,
      retryAttempts: 3
  },
  mock: {
      simulateDelay: true,
      delayMs: 500
  }
};

// environments/environment.prod.ts
export const environmentp = {
  production: true,
  useMockData: false,
  apiurl: {
      url: 'https://tu-api-azure.com/api',
      timeout: 30000,
      retryAttempts: 3
  },
  mock: {
      simulateDelay: false,
      delayMs: 0
  }
};