async function errorHandling(context) {
    try {
        return await context.next();
    } catch (err) {
        return new Response(`${err.message}\n${err.stack}`, {status: 500});
    }
}

function authentication(context) {
    const {request, env} = context;

    const originUrl = new URL(request.url);
    const token = request.headers.get("X-Token");

    if (originUrl.pathname.includes('manage/auth')) {
        context.next();
    }

    if (env.ACCESS_TOKEN !== token) {
        return new Response(null, {status: 401});
    }
    context.next();
}

export const onRequest = [errorHandling, authentication];
