import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import saveDataToDb from './saveDataToDb';
import User from './models/User';
import Pet from './models/Pet';
import bodyParser from 'body-parser';
import isAdmin from './middlewares/isAdmin.js';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/ku_skb3');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/clear', isAdmin, async (req, res) => {
  await User.remove({});
  await Pet.remove({});
  return res.send('OK');
});


app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});


app.get('/pets', async (req, res) => {
  const pets = await Pet.find().populate('owner');
  return res.json(pets);
});

app.post ('/data', async (req, res) => {
  const data = req.body;
  if (!data.user) return res.status(400).send('user required');
  if (!data.pets) data.pets = [];

  const user = await User.findOne({
    name: data.user.name,
  });

  if (user) return res.status(400).send('ПОльзователь уже есть в базе');

  try {
      const result = await saveDataToDb(data);
      console.log('Ошибки не выдало!');
      return res.json(result);
  } catch (err) {

    return res.status(500).json(err);
  }

});



app.listen(3000, () => {
  console.log('Сервер запущен. Порт: 3000! Для остановки нажмите Ctrl + C.');
});
