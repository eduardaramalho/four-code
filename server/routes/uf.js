const Joi = require('joi');
const knl = require('../knl');

knl.post('uf', async (req, resp) => {
    const schema = Joi.object({
        uf: Joi.string().min(1).max(100).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.UF.findAll({
        where: {
            uf: req.body.uf,
            status: 1
        }
    })

    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const descricao = knl.sequelize().models.UF.build({
        uf: req.body.uf,
        status: 1
    });

    await descricao.save()
    
    resp.end();
})

knl.get('uf', async (req, resp) => {
    const result = await knl.sequelize().models.UF.findAll({
        where: {
            status: 1
        }
    })
    resp.send(result);
    resp.end();
});


