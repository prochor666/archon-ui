import { r } from './composables/useApi';

const callApiRefresh = async (apiUrl, authToken) => {
    return await r({
        endpoint: `${apiUrl}/v1/login`,
        method: 'put',
        authToken: authToken,
    });
};

// When the parent thread requires it, render the response
self.addEventListener('message', async ({ data }) => {
    const response = await callApiRefresh(data.apiUrl, data.authToken);
    const responseFs = await callApiRefresh(data.fileStorageApiUrl, data.sessionFsToken);
    const result = {
        authToken: response.jwt || false,
        sessionFsToken: responseFs.jwt || false,
    };
    self.postMessage(result);
});
