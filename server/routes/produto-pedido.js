/*const Joi = require('joi');
const knl = require('../knl');

knl.post('produto-pedido', async (req, resp) => {
    
    const schema = Joi.object({
        fkpedido: Joi.number().min(1).max(100).required(),
        fkproduto: Joi.number().min(1).max(100).required(),
        quantidade:  Joi.number().required(),
        valorUnitario: Joi.number().min(0.01).required(),
        desconto: Joi.number(),
        acrescimo: Joi.number(),
        total: Joi.number().min(0.01).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Produtos_pedidos.findAll({
        where: {
            fkpedido: req.body.fkpedido,
            fkproduto: req.body.fkproduto,
            quantidade: req.body.quantidade,
            valorUnitario : req.body.valorUnitario,
            desconto : req.body.desconto,
            acrescimo : req.body.acrescimo,
            total : req.body.total
        }
    })
        
    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const descricao = knl.sequelize().models.Produtos_pedidos.build({
        fkpedido: req.body.fkpedido,
        fkproduto: req.body.fkproduto,
        quantidade: req.body.quantidade,
        valorUnitario : req.body.valorUnitario,
        desconto : req.body.desconto,
        acrescimo : req.body.acrescimo,
        total : req.body.total,               
        status : 1 
    });

    await descricao.save();

    resp.end();
});

knl.get('produto-pedido', async (req, resp) => {
    const result = await knl.sequelize().models.Produtos_pedidos.findAll({
        where: {
            status: 1
        }
    })
    resp.send(result);
    resp.end();
});

knl.put('produto-pedido', async(req, resp) => {
    const resultEnd = await knl.sequelize().models.Produtos_pedidos.update({
         fkpedido: req.body.fkpedido,
         fkproduto: req.body.fkproduto,
         quantidade: req.body.quantidade,
         valorUnitario : req.body.valorUnitario,
         desconto : req.body.desconto,
         acrescimo : req.body.acrescimo,
         total : req.body.total
    }, {
        where : {
        id : req.body.id
    }});
    resp.send(resultEnd);
    resp.end();
})


knl.patch('produto-pedido', async (req, resp) => {
        await knl.sequelize().models.Produtos_pedidos.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    }
       
);
*/