const Joi = require('joi');
const knl = require('../knl');

knl.post('cliente', async (req, resp) => {
    
    const schema = Joi.object({
        nomeFantasia: Joi.string().min(1).max(100).required(),
        razaoSocial: Joi.string().min(1).max(100).required(),
        CNPJ: Joi.string().min(1).max(100).required(),
        clienteDesde: Joi.date().required(),

        addresses : Joi.array().items(Joi.object({
            cep: Joi.string().min(1).max(100).required(),
            rua: Joi.string().min(1).max(100).required(),
            numero: Joi.string().required(),
            complemento: Joi.string().min(1).max(100).required(),
            bairro : Joi.string().min(1).max(100).required(),
            cidade : Joi.string().min(1).max(100).required(),
            uf : Joi.string().required()
        })) 
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Cliente.findAll({
        where: {
            nomeFantasia: req.body.nomeFantasia,
            razaoSocial: req.body.razaoSocial,
            CNPJ: req.body.CNPJ ,
            clienteDesde : req.body.clienteDesde,
            status : 1
        }
    })
        
    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const descricao = knl.sequelize().models.Cliente.build({
        nomeFantasia: req.body.nomeFantasia,
        razaoSocial: req.body.razaoSocial,
        CNPJ: req.body.CNPJ,
        clienteDesde : req.body.clienteDesde,
        status : 1 
    });

    await descricao.save();

    for (const address of req.body.addresses){
        const res = knl.sequelize().models.Endereco.build({
            cep : address.cep,
            rua : address.rua,
            numero : address.numero,
            bairro : address.bairro,
            cidade : address.cidade,
            uf : address.uf,
            complemento : address.complemento,
            status : 1,
            fkCliente : descricao.id
        })

        await res.save(); 
        console.log(res);       
    }

    resp.end();
});

knl.get('cliente', async (req, resp) => {
    const result = await knl.sequelize().models.Cliente.findAll({
        where: {
            status: 1
        }
    })
    resp.send(result);
    resp.end();
});

knl.get('enderecos', async (req, resp) => {
    const enderecos = knl.objects.copy(await knl.sequelize().models.Endereco.findAll({
        where : {
            status : 1
        }
     }))

    resp.send(enderecos);
    resp.end();
});

knl.get('cliente/:id', async(req, resp) => {
    const customers = knl.objects.copy(await knl.sequelize().models.Cliente.findAll({
        where : {
            id : req.params.id,
            status : 1
        }
     })); 
     
     const customer = customers[0];

     const address = knl.objects.copy(await knl.sequelize().models.Endereco.findAll({
        where : {
            fkCliente : req.params.id,
            status : 1
        }
     }));

     customer.address = address;

     resp.json(customer);
})

knl.put('cliente', async(req, resp) => {
    await knl.sequelize().models.Cliente.update({
        nomeFantasia: req.body.nomeFantasia,
        razaoSocial: req.body.razaoSocial,
        CNPJ: req.body.CNPJ ,
        clienteDesde : req.body.clienteDesde,
    }, {
        where : {
        id : req.body.id
    }});
    
    for(const address of Object.keys(req.body.obj)){
        await knl.sequelize().models.Endereco.update({
            cep         : address.cep,
            rua         : address.rua,
            numero      : address.numero,
            bairro      : address.bairro,
            cidade      : address.cidade,
            uf          : address.uf,
            complemento : address.complemento
    }, {
        where : {
        id : address.id
    }});
    }
    resp.send();
    resp.end();
})

knl.put('endereco', async(req, resp) => {
    const resultEnd = await knl.sequelize().models.Endereco.update({
            cep          : req.body.cep,
            rua          : req.body.rua,
            numero       : req.body.numero,
            complemento  : req.body.complemento,
            bairro       : req.body.bairro,
            cidade       : req.body.cidade,
            uf           : req.body.uf,
            fkCliente    : req.body.fkCliente,
    }, {
        where : {
        id : req.body.id
    }});
    resp.send(resultEnd);
})


knl.patch('cliente', async (req, resp) => {
        await knl.sequelize().models.Cliente.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    }
       
);

knl.patch('endereco', async (req, resp) => {
    await knl.sequelize().models.Endereco.update({
        status: "0"
    }, {
        where: {
            id: req.body.id,
        }
    });
    resp.end();
}
   
);
