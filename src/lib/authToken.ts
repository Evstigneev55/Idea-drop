let accessToken: string | null = null;

export const storeAccessToken = (token: string | null) => {
    accessToken = token;
}

export const getStoredAcessToken = () => {
    return accessToken;
}