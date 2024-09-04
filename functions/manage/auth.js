
export async function onRequest(context) {
    const { request, env } = context;
    const { token } = await request.json();

    try {

        return Response.json(null,{
            headers: {
                'X-Token': token
            },
            status: 200
        })
    } catch (e) {
        // console.log(e);
        return Response.json({ message: e.message },{
            status: 500
        })
    }
}



