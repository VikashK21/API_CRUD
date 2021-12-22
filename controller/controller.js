const { knex, knex2 } = require('../models/db.config')
const express = require('express');
const fs = require('fs');
const joi = require('joi')
const { generateAccessToken, authenticateToken } = require('./security');
const route = express.Router();


route.post('/login', async (req, res) => {
    const data = await req.body;
    try {
        const result = await knex2('loginSignup').where({ email: data.email, password: data.password });
        if (result.length > 0) {
            const token = generateAccessToken(data)
            res.cookie(`Token = ${token}`).send('You are successfully logged in.')
        } else {
            res.send('This account does not exist, go for Signup!!')
        }
    } catch (err) {
        res.send(err)
        console.log(err);
    }
})

route.post('/signup', async(req, res) => {
    const data = await req.body;
    const schema = joi.object({
        name: joi.string().min(3).max(30),
        email: joi.string().email().min(10).max(30).required(),
        password: joi.string().min(8).max(16).required()
    })
    const schemaValidate = schema.validate(data);
    let validated;
    if (schemaValidate.error){
        return res.status(500).json({
            message: schemaValidate.error.message
        })
    }else{
        validated=schemaValidate.value;

    }
    try {
        const result = await knex2('loginSignup').where({email: validated.email, password: validated.password})
        if (result.length>0){
            res.send('This account already exist!!')
        }else{
            await knex2('loginSignup').insert(validated);
            res.cookie('Token = 0').send('You are signed up successfully.')
        }
    } catch (err) {
        res.send(err)
        console.log(err);
        
    }
})



route.post('/fillData', authenticateToken, (req, res) => {
    const data = JSON.parse(fs.readFileSync('/home/student/Desktop/sarla_api/controller/api.json', 'utf-8'))
    data.forEach(element => {
        knex('saral_api').insert(element).then((result) => {
            res.send('Now fully filled.')
            console.log(result);
        }).catch((err) => {
            console.log(err.sqlMessage)
            res.send(err.sqlMessage)
        });
    });
})

route.post('/insertOneMore', authenticateToken, async (req, res) => {
    const data = await req.body;
    try {
        const check = await knex('saral_api').where({ name: data.name, id: data.id });
        if (check.length > 0) {
            console.log(data);
            res.send('This data already exist!!', check)
        } else {
            await knex('saral_api').insert(data)
            res.send('The data is inserted successfully.')

        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }

})

route.get('/getBy/:id', authenticateToken, async (req, res) => {
    try {
        const result = await knex('saral_api').where({ id: req.params.id });
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send('The id does not exist!!')

        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }

})

route.patch('/updateBy/:id', authenticateToken, async (req, res) => {
    const data = await req.body;
    try {
        const result = await knex('saral_api').where({ id: req.params.id });
        if (result.length > 0) {
            await knex('saral_api').where({ id: req.params.id }).insert(data)
            res.send('The data is updated.')
        } else {
            res.send('The id does not exist!!')

        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }

})

route.delete('/deleteBy/:id', authenticateToken, async (req, res) => {
    try {
        const result = await knex('saral_api').where({ id: req.params.id });
        if (result.length > 0) {
            await knex('saral_api').where({ id: req.params.id }).del()
            res.send('The data is deleted.')
        } else {
            res.send('The id does not exist!!')

        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }

})

route.get('/getAll', authenticateToken, async (req, res) => {
    try {
        const result = await knex('saral_api')
        res.send(result)
    } catch (err) {
        console.log(err);
        res.send(err)
    }

})

route.delete('/deleteAll', authenticateToken, async (req, res) => {
    try {
        await knex('saral_api').del()
        res.send('Now the table is empty.')
    } catch (err) {
        console.log(err);
        res.send(err)

    }
})

module.exports = route;
