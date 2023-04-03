const Joi = require('joi');
const knl = require('../knl');
const moment = require('moment');  

knl.post('pedido', async (req, resp) => {
    
    const schema = Joi.object({
        fkcliente   : Joi.number().min(1).max(100).required(),
        dataEmissao : Joi.string().min(10).max(10).required(),
        dataEntrega : Joi.string().min(10).max(10).required(),
        fkendereco  : Joi.number().min(1).max(100).required(),

        produtos : Joi.array().items(Joi.object({
            fkproduto       : Joi.number().min(1).max(100).required(),
            quantidade      : Joi.number().min(0.01).required(),
            valorUnitario   : Joi.number().min(0.01).required(),
            desconto        : Joi.number().min(0.00),
            acrescimo       : Joi.number().min(0.00),
            total           : Joi.number().min(0.01).required(),
        }))
    })

    knl.validate(req.body, schema);

    req.body.dataEmissao = moment(req.body.dataEmissao, 'DD/MM/YYYY').toDate();
    req.body.dataEntrega = moment(req.body.dataEntrega, 'DD/MM/YYYY').toDate();   


    req.body.total = req.body.produtos.reduce((acumulator, value) => {
        return acumulator + value.total
    }, 0);


    const pedido = await knl.sequelize().models.Pedidos.build({
         fkcliente  : req.body.fkcliente,
         dataEmissao: req.body.dataEmissao,
         dataEntrega: req.body.dataEntrega,
         fkendereco : req.body.fkendereco,
         total      : req.body.total,
         status     : 1

    })
        
    await pedido.save();
    
    for( const produtos of req.body.produtos){
        const produto = knl.sequelize().models.Produtos_pedidos.build({
            fkproduto       : produtos.fkproduto,
            quantidade      : produtos.quantidade,
            valorUnitario   : produtos.valorUnitario,
            desconto        : produtos.desconto,
            acrescimo       : produtos.acrescimo,
            total           : produtos.total,
            status          : 1,
            fkpedido        : pedido.id

        })
        
        await produto.save();
    }

    resp.end();
    
});

knl.get('pedido', async (req, resp) => {
    const result = knl.objects.copy(await knl.sequelize().models.Pedidos.findAll({
        where: {
            status: 1
        }
    }));

    //Formatar data
    //-----------------------------------------------------------------------------------------------------
    for (const element of result){
        element.dataEmissao_str = moment(element.dataEmissao).format('DD/MM/YYYY');
        element.dataEntrega_str = moment(element.dataEntrega).format('DD/MM/YYYY');
    }
    //-----------------------------------------------------------------------------------------------------

    //Transformando fkcliente em String

    if (!knl.objects.isEmptyArray(result)){
        for(const element of result){
            const newClient = await knl.sequelize().models.Cliente.findAll({
                where : {
                    id : element.fkcliente
                }
            })

            if (!knl.objects.isEmptyArray(newClient)){
                element.newClient_description = newClient[0].razaoSocial
            }

          
        }
     }

     //Transformando fkendereco em String
  
     if (!knl.objects.isEmptyArray(result)){
        for(const element of result){
            const address = await knl.sequelize().models.Endereco.findAll({
                where : {
                    id : element.fkendereco
                }
            })

            if (!knl.objects.isEmptyArray(address)){
                element.address_description = address[0].rua
            }

            
        }
     }
     

     resp.send(result);
     resp.end();

});

knl.get('pedido/:id', async(req, resp)=>{
    const result = knl.objects.copy(await knl.sequelize().models.Pedidos.findAll({
        where: {
            id : req.params.id,
            status : 1
        }
    }));

    const pedido = result[0];

    const produto = knl.objects.copy(await knl.sequelize().models.Produtos_pedidos.findAll({
        where : {
            fkpedido : req.params.id,
            status : 1
        }
     }));

    pedido.produtos = produto;

    for(const produto of pedido.produtos){
        const result = knl.objects.copy(await knl.sequelize().models.Produto.findAll({
            where : {
                id : produto.fkproduto
            }
        }))

        if(knl.objects.isEmptyArray(result)){
            continue;
        }

        produto.produto_descricao = result[0].descricao;
    
    }

    resp.json(pedido);
})

knl.put('pedido/:id', async(req, resp) => {
    
    req.body.dataEmissao = moment(req.body.dataEmissao, 'DD/MM/YYYY').toDate();
    req.body.dataEntrega = moment(req.body.dataEntrega, 'DD/MM/YYYY').toDate();    

    let total = knl.objects.sum(req.body.produtos, 'total');

    await knl.sequelize().models.Pedidos.update({
        fkcliente: req.body.fkcliente,
        dataEmissao: req.body.dataEmissao,
        dataEntrega: req.body.dataEntrega,
        fkendereco : req.body.fkendereco,
        total      : total
    }, {
        where : {
            id : req.params.id
        }
    });

    await knl.sequelize().models.Produtos_pedidos.destroy({
        where : {
            fkpedido : pedido.id
        }
    })

    for( const produtos of req.body.produtos){
        const produto = knl.sequelize().models.Produtos_pedidos.build({
            fkproduto       : produtos.fkproduto,
            quantidade      : produtos.quantidade,
            valorUnitario   : produtos.valorUnitario,
            desconto        : produtos.desconto,
            acrescimo       : produtos.acrescimo,
            total           : produtos.total,
            status          : 1,
            fkpedido        : req.params.id

        })
        
        await produto.save();
    }
    
    resp.end();
})

knl.patch('pedido', async (req, resp) => {
        await knl.sequelize().models.Pedidos.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    }
       
);
   
