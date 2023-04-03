const Joi = require('joi');
const knl = require('../knl');

knl.post('subgrupo', async(req, resp) => {
    const schema = Joi.object({
        descricao : Joi.string().min(1).max(100).required(),
        fkgrupo : Joi.number().min(1).max(100).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Subgrupo.findAll({
        where : {
            descricao : req.body.descricao,
            status : 1,
            fkgrupo : req.body.fkgrupo
        }
    })


    knl.createException('0010', '', !knl.objects.isEmptyArray(result));

    const descricao = knl.sequelize().models.Subgrupo.build({
        descricao : req.body.descricao,
        status : 1,
        fkgrupo : req.body.fkgrupo
    });

    await descricao.save();
    resp.end();
})

knl.get('subgrupo', async(req, resp) => {
   const subgrupos = knl.objects.copy(await knl.sequelize().models.Subgrupo.findAll({
        where : {
            status : 1
        }
     }))

     if (!knl.objects.isEmptyArray(subgrupos)){
        for(const subgrupo of subgrupos){
            const group = await knl.sequelize().models.Grupo.findAll({
                where : {
                    id : subgrupo.fkgrupo
                }
            })

            if (!knl.objects.isEmptyArray(group)){
                subgrupo.group_description = group[0].descricao
            }

            console.log(subgrupo.group_description)
        }
     }

    resp.send(subgrupos);
    resp.end();
});

knl.put('subgrupo', async(req, resp) => {
    const result = await knl.sequelize().models.Subgrupo.update({
        descricao : req.body.descricao,
        fkgrupo : req.body.fkgrupo
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
})

knl.patch('subgrupo', async (req, resp) => {
         await knl.sequelize().models.Subgrupo.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    }
);
