const Joi = require('joi');
const knl = require('../knl');


knl.post('sale', async(req, resp) => {
    const schema = Joi.object({
        meses : Joi.number().min(1).max(100).required(),
        porcentagem : Joi.number().min(1).max(100).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Sale.findAll({
        where : {
            meses : req.body.meses,
            porcentagem : req.body.porcentagem,
            ativo : 1,
        }
    })

    knl.createException('0011', '', !knl.objects.isEmptyArray(result));

    const descricao = knl.sequelize().models.Sale.build({
        meses : req.body.meses,
        porcentagem : req.body.porcentagem,
        ativo : 1,
    });

    await descricao.save();
    resp.end();
})

knl.get('sale', async(req, resp) => {
   const sale = knl.objects.copy(await knl.sequelize().models.Sale.findAll({
        where : {
            ativo : 1
        }
     }))

    resp.send(sale);
    resp.end();
});

knl.put('sale', async(req, resp) => {
    const result = await knl.sequelize().models.Sale.update({
        meses : req.body.meses,
        porcentagem : req.body.porcentagem
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
})

knl.patch('sale', async (req, resp) => {
         await knl.sequelize().models.Sale.update({
            ativo: 0
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    }
);
