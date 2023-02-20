const knl = require('../knl');

knl.get('hello', async (req, resp) => {
    resp.json({});
    resp.end();
})