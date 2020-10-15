const needle = require('needle');
const xlsx = require("node-xlsx").default;
const cheerio = require('cheerio');
const url = require('../config/dateparse');
const send=require('./senddatefrompagetodb');

// needle.get(url.url,(err,res)=>{
//     if(err)  console.log(err);
//     let $ = cheerio.load(res.body);
//     send.sendDate($('span#details > a').attr().href);
// });

// needle.get(url.url,(err,res)=>{
//     if(err)  console.log(err);
//     let $ = cheerio.load(res.body);
//     let canteens = [];
//     let tr=[];
//     let td={};
//     let count=0;
//     $('div > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td.xl70').each(function(i, val){
//         canteens.push($(val).text());
//     });
//     $('div > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr').each(function(i, val){
//         let item = $(val).html();
//         if(item.includes('Меню')){
//             count=1;
//             if(td.length!=0){
//                 tr.push(td);
//             }
//             td={};
//             item.replace(/\n([\s\S]*?)\n/g, (m, g) => {
//                 if(g!=''){
//                     td.name=g;
//                 }
//             });
//         }
//         else{
//             if(count==1){
//                 let it=[];
//                 item.replace(/\n([\s\S]*?)\n/g, (m, g) => {
//                     if(g!=''){
//                         it.push(g);
//                     }
//                 });
//                 if(it.length!=0){
//                     td.push(it);
//                 }
//             }
//         }
//     });
    // названия заведений

    // console.log($('div > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td.xl70').text());

    // console.log(tr[4]);

    // категории

    // console.log($('div > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td.xl71').text());

    // console.log($('div > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td.xl71').text());

    // for(let i=2;i<208;i++){
    //     let e=`td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(${i})`;
    //     if($(e + ' > td.xl70').text()!='')
    //     {
    //         console.log($(e + ' > td.xl70').text());
    //         if(int!=0){
    //             canteensdb.push(arr);
    //             arr=[];
    //         }
    //         int++;
    //         options.canteenname=$(e + ' > td.xl70').text();
    //     }
    //     if($(`${e} > td.xl71`).text()!='')
    //     {
    //         options.categoryname=$(e+' > td.xl71').text();
    //     }
    //     if($(e+' > td.xl72').text()!='')
    //     {
    //         options.dishname=$(e+' > td.xl72').text();
    //     }
    //     if($(e+' > td.xl73').text()!='')
    //     {
    //         options.weight=$(e+' > td.xl73').text();
    //     }
    //     if($(e+' > td.xl74').text()!='')
    //     {
    //         options.desc=$(e+' > td.xl74').text();
    //     }
    //     if($(e+' > td:nth-child(3)'!='')){
    //         if($(e+' > td:nth-child(3)').text().match(/[0-9]/g)!=null){
    //             options.price=$(e+' > td:nth-child(3)').text();
    //         }
    //     }
    //     if(Object.keys(options).length!=0){
    //         arr.push(options);
    //         if(i==207)
    //         {
    //             canteensdb.push(arr);
    //         }
    //     }
    //     options={};
    // }
    // canteensdb.forEach((e)=>{
    //     e.forEach((item,index,arr)=>{
    //         if(item.desc)
    //         {
    //             arr[index-1].desc=item.desc;
    //             arr[index]={};
    //         }
    //         if(Object.keys(arr[index]).length==0){
    //             arr.splice(index,1);
    //         }
    //     });
    // });
    // console.log(canteensdb);
//     send.sendDate(canteens);
// });

// const workSheetsFromFile = xlsx.parse('G:/diplomBNTU/backend/xls/cafe.xlsx');
// console.log(workSheetsFromFile[0].data);






// Получаю данные из таблицы
if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('./xls/cafe.xlsx', {type:"binary"});
var first_sheet_name = workbook.SheetNames[0];
var worksheet = workbook.Sheets[first_sheet_name];
let list = XLSX.utils.sheet_to_json(worksheet, {raw: 0});
// Создаю массив для имён столовых
let canteens=[];
// Создаю массив для преобразованного массива объектов
let lists = [];
// Проверка на элемент категории
let categories = ["Холодные закуски", "Супы", "Горячие блюда", "Напитки", "Мучные изделия, хлеб", "Гарниры и дополнения к нему"];
let addedCategory = [];
list.forEach((element,index) => {
    let item = {};
    if(![0,1,2].includes(index)){
        delete element['Меню'];
        if (Object.keys(element).length == 1){
            if(categories.includes(element["__EMPTY"]) && !addedCategory.includes(element["__EMPTY"])){
                item["category"]=element["__EMPTY"].trim();
                lists.push(item);
                addedCategory.push(element["__EMPTY"]);
                item={};
            }
            if(!addedCategory.includes(element["__EMPTY"].replace(/ +/g, ' ').trim())) {
                lists[lists.length-1]["description"]=element["__EMPTY"].trim();
            }
        }
        if(Object.keys(element).length == 3) {
            item["dish"]=element["__EMPTY"].trim();
            item["weight"]=element["__EMPTY_5"].trim();
            item["price"]=element["__EMPTY_7"].trim();
            lists.push(item);
            item={};
        }
    }
});
canteens.push({name:list[2]["__EMPTY"].replace(/ +/g, ' ').replace(/\d|[.]/g,'').trim()});
send.sendDate(lists , canteens);
