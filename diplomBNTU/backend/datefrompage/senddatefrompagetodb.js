const MenuCafe=require('../models/canteencafe');
const MenuOne=require('../models/canteenone');
const MenuSOK=require('../models/canteencok');
const Canteens=require('../models/canteens');
const MenuFour=require('../models/canteenfour');

module.exports.sendDate=function(date, canteen){
    MenuOne.find({}).select({'__v':0,'_id':0}).then((data)=>{
        if (data){
            data= JSON.stringify(data);
            var str= JSON.stringify(date);
            if (data !== str) {
                MenuOne.deleteMany({}, (err,data) => {
                    if(err) throw err;
                });
                date.forEach(item => {
                    const dish = new MenuOne(
                        {
                            dish: item.dish,
                            weight: item.weight,
                            price: item.price,
                            description: item.description,
                            category: item.category
                        }
                    );
                    dish.save();
                })
            }
        }
    });
    Canteens.find({}).select({'__v':0,'_id':0}).then((date)=> {
        if(date) {
            date= JSON.stringify(date);
            var srtcant= JSON.stringify(canteen);
            if(date != srtcant) {
                Canteens.deleteMany({}, (err,data) => {
                    if(err) throw err;
                })
                canteen.forEach(element => {
                    const can= new Canteens(
                        {
                            name: element
                        }
                    );
                    can.save();
                });
            }
        }
    });
}