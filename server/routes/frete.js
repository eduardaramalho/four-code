const Joi = require('joi');
const knl = require('../knl');

knl.post('colecao', async (req, resp) => {
    const schema = Joi.object({
        ValorTotal: Joi.number().min(1).required(),
        descricao: Joi.string().required(),
        desconto: Joi.number()
    })

    knl.validate(req.body, schema);

   let TotalValor = req.body.ValorTotal*req.body.desconto/100

    const descricao = knl.sequelize().models.frete.build({
        ValorTotal: TotalValor,
        ativo:req.body.ativo,
        desconto: req.body.desconto,
        status: 1
    });

    await descricao.save();
    resp.end();
})