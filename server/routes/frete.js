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


knl.get("frete", async (req, resp) => {
    let result = await knl.sequelize().models.frete.findAll();
    resp.json(result);
})

knl.get("frete/:id", async (req, resp) => {
    let result = await knl.sequelize().models.frete.findAll({
        where: {
            id: req.params.id,
            status: 1
        }
    });
    resp.json(result);
})

knl.put("frete", async (req, resp) => {

    let TotalValor = req.body.ValorTotal * req.body.desconto / 100

    let result = await knl.sequelize().models.frete.update({
        ValorTotal: TotalValor,
        ativo: req.body.ativo,
        valor: req.body.ValorTotal,
        fkProduto: req.body.fkProduto,
        fkEndereco: req.body.fkEndereco,
        desconto: req.body.desconto,
    }, {
        where: {
            id: req.body.id,
            status: 1
        }
    });

    resp.json({ "Status": "ok" })
})

knl.patch("frete", async (req, resp) => {
    let result = await knl.sequelize().models.frete.update({
        status:0
    },{
        where: {
            id: req.body.id,
        }
    });

    resp.json({ "Status": "ok" })
})