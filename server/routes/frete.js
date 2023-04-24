const Joi = require('joi');
const knl = require('../knl');

knl.post('frete', async (req, resp) => {
    const schema = Joi.object({
        // fkProduto: Joi.number().min(1).required(),
        valorTotal: Joi.number().min(1).required(),
        valor: Joi.number().min(1).required(),
        desconto: Joi.number()
    })

    knl.validate(req.body, schema);

    const frete = await knl.sequelize().models.Frete.build({
        valorTotal: req.body.valorTotal,
        valor: req.body.valor,
        desconto: req.body.desconto,
        ativo: 1,
        status: 1
    });

    frete.save();
    resp.end();
});

knl.get("frete", async (req, resp) => {
    const result = await knl.sequelize().models.Frete.findAll({
        where : {
            ativo : 1
        }
     })

    resp.send(result);
    resp.end();
})

knl.get("frete/:id", async (req, resp) => {
    let result = await knl.sequelize().models.Frete.findAll({
        where: {
            id: req.params.id
        }
    });
    resp.json(result);
})

knl.put('frete', async(req, resp) => {
    const result = await knl.sequelize().models.Frete.update({
        valorTotal: req.body.valorTotal,
        valor     : req.body.valor,
        desconto  : req.body.desconto,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
})

knl.patch('frete', async (req, resp) => {
    await knl.sequelize().models.Frete.update({
       ativo: 0
   }, {
       where: {
           id: req.body.id,
       }
   });
   resp.end();
}
);