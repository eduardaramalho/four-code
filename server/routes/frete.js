const Joi = require('joi');
const knl = require('../knl');

knl.post('frete', async (req, resp) => {

    const schema = Joi.object({
        ValorTotal: Joi.number().required().min(1),
        ativo: Joi.string().required(),
        desconto: Joi.number().required()
    })

    knl.validate(req.body, schema);

    // const result = await knl.sequelize().models.frete.findAll({
    //     where: {
    //         ValorTotal: req.body.ValorTotal,
    //         ativo: req.body.ativo,
    //         status: 1
    //     }
    // })

    // knl.createException('0009', '', !knl.objects.isEmptyArray(result))

    const TotalValor= req.body.ValorTotal * req.body.desconto / 100

    const frete = await knl.sequelize().models.frete.build({
        ValorTotal: TotalValor,
        ativo: req.body.ativo,
        status: 1,
        desconto: req.body.desconto
    })

    frete.save()
    resp.json({ "status": "ok" })


})