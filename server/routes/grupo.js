const Joi = require('joi');
const knl = require('../knl');

knl.post('grupo', async (req, resp) => {
    const schema = Joi.object({
        descricao: Joi.string().min(1).max(100).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Grupo.findAll({
        where: {
            descricao: req.body.descricao,
            status: 1
        }
    })

    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const descricao = knl.sequelize().models.Grupo.build({
        descricao: req.body.descricao,
        status: 1
    });

    await descricao.save();
    resp.end();
})

knl.get('grupo', async (req, resp) => {
    const result = await knl.sequelize().models.Grupo.findAll({
        where: {
            status: 1
        }
    })
    resp.send(result);
    resp.end();
});

knl.put('grupo', async (req, resp) => {
    const result = await knl.sequelize().models.Grupo.update({
        descricao: req.body.descricao,
    }, {
        where: {
            id: req.body.id
        }
    });

    resp.send(result);
})

knl.patch('grupo', async (req, resp) => {
    await knl.sequelize().models.Grupo.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    }
       
);
