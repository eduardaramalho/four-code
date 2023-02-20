const Joi = require('joi');
const knl = require('../knl');

knl.post('produto', async (req, resp) => {
    const schema = Joi.object({
        descricao: Joi.string().min(1).max(100).required(),
        precoVenda: Joi.number().min(0.01).required(),
        fkgrupo: Joi.number().min(1).max(100).required(),
        fksubGrupo: Joi.number().min(1).max(100).required(),
        fkColecao: Joi.number().min(1).max(100).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Produto.findAll({
        where: {
            descricao: req.body.descricao,
            precoVenda: req.body.precoVenda,
            status: 1,
            fkgrupo : req.body.fkgrupo,
            fksubGrupo : req.body.fksubGrupo,
            fkColecao : req.body.fkColecao
        }
    })

    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const descricao = knl.sequelize().models.Produto.build({
        descricao: req.body.descricao,
        precoVenda: req.body.precoVenda,
        status: 1,
        fkgrupo : req.body.fkgrupo,
        fksubGrupo : req.body.fksubGrupo,
        fkColecao : req.body.fkColecao
    });

    await descricao.save();
    resp.end();
})

knl.get('produto', async(req, resp) => {

    const produtos = knl.objects.copy(await knl.sequelize().models.Produto.findAll({
        where : {
            status : 1
        }
     }))

     // DROP DE GRUPO
     if(!knl.objects.isEmptyArray(produtos)){
        for(const produto of produtos){
            const group = await knl.sequelize().models.Grupo.findAll({
                where : {
                    id : produto.fkgrupo
                }
            })
            if(!knl.objects.isEmptyArray(group)){
                produto.group_description = group[0].descricao
            }
            console.log(produto.group_description)
        }
     }

      // DROP DE SUBGRUPO
     if(!knl.objects.isEmptyArray(produtos)){
        for(const produto of produtos){
            const subgroup = await knl.sequelize().models.Subgrupo.findAll({
                where : {
                    id : produto.fksubGrupo
                }
            })
            if(!knl.objects.isEmptyArray(subgroup)){
                produto.subgroup_description = subgroup[0].descricao
            }
        }
     }

     
      // DROP DE COLEÇÃO
     if(!knl.objects.isEmptyArray(produtos)){
        for(const produto of produtos){
            const collection = await knl.sequelize().models.Colecao.findAll({
                where : {
                    id : produto.fkColecao
                }
            })
            if(!knl.objects.isEmptyArray(collection)){
                produto.collection_description = collection[0].descricao
            }
        }
     }
    resp.send(produtos);
    resp.end();

});


knl.put('produto', async (req, resp) => {
    const result = await knl.sequelize().models.Produto.update({
        descricao: req.body.descricao,
        precoVenda: req.body.precoVenda,
        fkgrupo : req.body.fkgrupo,
        fksubGrupo : req.body.fkgrupo,
        fkColecao : req.body.fkColecao
    }, {
        where: {
            id: req.body.id
        }
    });

    resp.send(result);
})


knl.patch('produto', async (req, resp) => {
         await knl.sequelize().models.Produto.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    }
       
);
