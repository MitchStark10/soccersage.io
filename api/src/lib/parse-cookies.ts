export const parseCookies = (request) => {
    const cookieMap = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) {
        return cookieMap;
    }

    cookieHeader.split(`;`).forEach((cookie) => {
        const [name, ...rest] = cookie.split(`=`);
        const trimmedName = name?.trim();
        if (!trimmedName) {
            return;
        }
        const value = rest.join(`=`).trim();
        if (!value) {
            return;
        }
        cookieMap[name] = decodeURIComponent(value);
    });

    return cookieMap;
};
