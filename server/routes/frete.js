const Joi = require('joi');
const knl = require('../knl');

knl.post('frete', async (req, resp) => {
    const schema = Joi.object({
        fkProduto: Joi.number().min(1).required(),
        fkEndereco: Joi.number().min(1).required(),
        ValorTotal: Joi.number().min(1).required(),
        ativo: Joi.string().required(),
        desconto: Joi.number()
    })

    knl.validate(req.body, schema);

    let TotalValor = req.body.ValorTotal * req.body.desconto / 100

    const frete = knl.sequelize().models.frete.build({
        ValorTotal: TotalValor,
        ativo: req.body.ativo,
        valor: req.body.ValorTotal,
        fkProduto: req.body.fkProduto,
        fkEndereco: req.body.fkEndereco,
        desconto: req.body.desconto,
        status: 1
    });

    frete.save();
    resp.send(frete)
});


knl.get('frete/:id', async (resp, req) => {
    const frete = knl.sequelize().models.frete.findAll({
        where: {
            id : req.params.id,
            status : 1
        }
    })

    resp.json(frete)
})

