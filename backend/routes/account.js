const express = require("express");
const router = express.Router();
const User = require("../models/user");
// const passport = require("passport");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const Dishes = require("../models/dishes");
const MenuCafe = require("../models/canteencafe");
const MenuSOK = require("../models/canteencok");
const MenuOne = require("../models/canteenone");
const MenuFour = require("../models/canteenfour");
const Canteens = require("../models/canteens");
const Orders = require("../models/orders");
const config = require("../config/db");
const mailer = require("../mailer/mailer");
const datemenu = require("../datefrompage/datemenu");

router.post("/dashboard/order",async (req, res) => {
    const order = new Orders
    ({
        time: req.body.time,
        order : req.body.order,
        user : req.body.user,
        canteen: req.body.canteen,
        email: req.body.email,
        sum: req.body.sum
    });
    await order.save();
    Dishes.deleteMany({user : order.user},function(err,date)
    {
        if(err) throw err;
        if(date!=null){
            res.json({success: true, msg: "Order add"});
        }
    });
});

router.get("/admin/getorders",async (req, res) => {
    const order = await Orders.find();
    res.json(order);
});

router.post("/account/menu/dishes",async (req, res) => {
    const dish = new Dishes
    ({
        dish : req.body.dish,
        weight : req.body.weight,
        price : req.body.price,
        canteen: req.body.canteen,
        user: req.body.user
    });
    await dish.save();
    res.json({success: true, msg: "Dish add"});
});
// router.post("/account/admin/deleteorder",async (req, res) => {
//     const ord = {
//         user: req.body.user,
//         canteen: req.body.canteen,
//         email: req.body.email,
//         sum: req.body.sum
//       };
//     Orders.deleteOne({user: ord.user,canteen: ord.canteen,email: ord.email,sum: ord.sum},function(err,date)
//     {
//         if(err) throw err;
//         if(date!=null){
//             res.json({success: true, msg: "Order delete"});
//         }
//     });
// });
router.post("/account/main/deletedishes",async (req, res) => {
    const dish = {
        user: req.body.user,
        canteen: req.body.canteen,
        dish: req.body.dish,
        price: req.body.price,
        weight: req.body.weight
    };
    Dishes.deleteOne({dish: dish.dish,weight: dish.weight,price: dish.price,user : dish.user,canteen: dish.canteen},function(err,date)
    {
        if(err) throw err;
        if(date){
            res.json({success: true, msg: "Dish delete"});
        }
    });
});
// router.post("/account/admin/orders",async (req, res) => {
//     let ord = {
//         canteen: req.body.canteen,
//         time: req.body.time,
//         order: req.body.order,
//         email: req.body.email,
//         login: req.body.login
//     };
//     res.json({success: true, msg: "Success reg"});
//     process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//     const message = {
//         to: ord.email,
//         subject: 'Вас приветствует сеть столовых БНТУ',
//         html: `<p>Здравствуйте, ${ord.login}, мы получили от вас заказ.</p>
//         <p>Для получения и оплаты заказа приходите в ${ord.canteen} ${ord.time}.</p>
//         <p>Номер заказа: ${ord.order}.</p>`,
//     }
//     mailer(message);
// });
router.post("/account/dish",async (req, res) => {
    let user=req.body.user;
    const dish = await Dishes.find({user : user});
    res.json(dish);
});

// router.post("/account/main/order",async (req, res) => {
//     let user=req.body.user;
//     const order = await Orders.find({user : user});
//     res.json(order);
// });

// router.get("/account/main/cafe",async (req, res) => {
//     const menucafe = await MenuCafe.find();
//     res.json(menucafe);
// });

// router.get("/account/main/four",async (req, res) => {
//     const menufour = await MenuFour.find();
//     res.json(menufour);
// });

router.get("/account/menuone",async (req, res) => {
    const menuone = await MenuOne.find();
    res.json(menuone);
});

// router.get("/account/main/sok",async (req, res) => {
//     const menusok = await MenuSOK.find();
//     res.json(menusok);
// });
router.post("/reg/test",async (req, res) => {
    const user = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email
    };
    User.getUserByLogin(user.login, (err,user) => {
        if(err){
            res.json({success: false, msg: "Error reg"});
        }
        if(!user){
            res.json({success: true, msg: "User don't find"});
        }
        if(user){
            res.json({success: false, msg: "User find"});
        }
    });
});
router.get("/account/canteen",async (req, res) => {
    const canteens = await Canteens.find();
    res.json(canteens);
});
// зарегистрировать user
router.post("/reg", (req, res) => {
    let newUser = new User({
        login: req.body.login,
        password: req.body.pass,
        email: req.body.email,
        role: 'account'
    });
    User.addUser(newUser,(err, user) =>{
        if(err){
            res.json({success: false, msg: "Пользователь не добавлен"});
        }
        else{
            res.json({success: true, msg: "Успешная регистрация"});
            // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
            // const message = {
            //     to: newUser.email,
            //     subject: 'Поздравляем с регистрацией в тестовом приложении сети столовых БНТУ',
            //     text: `Рады приветствовать нового полозователя приложения сети столовых БНТУ, ${newUser.login}`,
            // }
            // mailer(message);
        }
    });
});

// router.post("/auth/forget",async (req, res) => {
//     const login = req.body.login;
//     const email = req.body.email;
//     User.getUserByLogin(login, email, (err,user) => {
//         if(err){
//             res.json({success: false, msg: "Error reg"});
//         }
//         if(!user){
//             return res.json({success: false, msg: "User don't find"});
//         }
//         if(user){
//             res.json({success: true, msg: "User finds"});
//             process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//             const message = {
//                 to: email,
//                 subject: 'Админ сети столовых БНТУ',
//                 html: `<p>Здравствуйте, вас приветствует админ сети столовых БНТУ.</p>
//                 <p>Мы получили запрос на изменение пароля.</p>
//                 <p><a href="http://localhost:4200/home/auth/forget/pass">Для изменения пароля перейдите по ссылке.</a></p>`,
//             }
//             mailer(message);
//         }
//     });
// });

// router.post("/auth/forget/password",async (req, res) => {
//     const login = req.body.login;
//     const email = req.body.email;
//     const password = req.body.password;
//     User.deleteOne({login: login, email: email},async function(err,date)
//     {
//         if(err) throw err;
//         if(date!=null){
//             const user = new User
//             ({
//                 login : login,
//                 password : password,
//                 email : email
//             });
//             User.addUser(user,(err, user) =>{
//                 if(err){
//                     res.json({success: false, msg: "Error reg"});
//                 }
//                 else{
//                     res.json({success: true, msg: "Success reg"});
//                 }
//             });
//         }
//     });
// });

router.post("/auth",(req,res)=>{
    const login = req.body.login;
    const password = req.body.pass;

    User.getUserByLogin(login, (err,user) => {
        if(err){
            res.json({success: false, msg: "Ошибка авторизации"});
        }
        if(!user){
            return res.json({success: false, msg: "Пользователь не был найден"});
            }
        if(user)
        {
            User.comparePass(password, user.password, (err, isMatch) => {
                if(err){
                    res.json({success: false, msg: "Error reg"});
                }
                if (isMatch){
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 3600*24
                    });
                    res.json({
                        success: true,
                        token: token,
                        user: {
                            id: user._id,
                            login: user.login,
                            email: user.email
                        }
                    });
                }else{
                    return res.json({success: false, msg: "Passwords aren't same"});
                }
            });
        }
        });
});

module.exports = router;
