const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerify = async (token) => {

    // try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    // console.log('intento de verify');

    const payload = ticket.getPayload();
    const userid = payload['sub'];

    const { name, picture, email } = payload;

    // console.log(payload);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    return { name, picture, email };
    // } catch (error) {

    //     console.log(error)
    //     throw error;

    // }
}
// verify().catch(console.error);

module.exports = {
    googleVerify
}