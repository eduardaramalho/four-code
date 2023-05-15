const Joi = require('joi');
const knl = require('../knl');

knl.post('frete', async (req, resp) => {
    const schema = Joi.object({
        valorTotal: Joi.number().min(1).required(),
        valor: Joi.number().min(1).required(),
        desconto: Joi.number().required(),
        fkProduto: Joi.number().min(1).required(),
    })

    knl.validate(req.body, schema);

    const frete = await knl.sequelize().models.Frete.build({
        valorTotal: req.body.valorTotal,
        valor: req.body.valor,
        desconto: req.body.desconto,
        fkProduto: req.body.fkProduto,
        ativo: 1,
    });

    frete.save();
    resp.end();
});

knl.get("frete", async (req, resp) => {
    const fretes = await knl.sequelize().models.Frete.findAll({
        where : {
            ativo : 1
        }
     })

    resp.send(fretes);
    resp.end();
})

knl.put('frete', async(req, resp) => {
    const result = await knl.sequelize().models.Frete.update({
        valorTotal: req.body.valorTotal,
        valor     : req.body.valor,
        desconto  : req.body.desconto,
        fkfrete: req.body.fkfrete,
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