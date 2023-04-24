const Joi = require('joi');
const knl = require('../knl');

knl.post('frete', async (req, resp) => {
    const schema = Joi.object({
        valor: Joi.number().min(1).required(),
        fkProduto: Joi.number().min(1).required(),
        fkEndereco: Joi.number().min(1).required(),
        ValorTotal: Joi.number().min(1).required(),
        ativo: Joi.string().required(),
        desconto: Joi.number()
    })

    knl.validate(req.body, schema);

   let TotalValor = req.body.ValorTotal*req.body.desconto/100

    const descricao = knl.sequelize().models.frete.build({
        ValorTotal: TotalValor,
        ativo:req.body.ativo,
        valor: req.body.valor,
        fkProduto: req.body.fkProduto,
        fkEndereco: req.body.fkEndereco,
        desconto: req.body.desconto,
        status: 1
    });

    await descricao.save();
    resp.end();
});

