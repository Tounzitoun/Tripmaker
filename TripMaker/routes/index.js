var express = require('express');
var router = express.Router();
var countryModel = require('../model/Country')
var citiesModel = require('../model/Cities');WishesModel
const { isObjectIdOrHexString } = require('mongoose');
var userModel = require('../model/User')
var WishesModel = require('../model/wishlist');

/* GET home page. */
router.get('/', function(req, res, next) {

  //homepage
  //si bouton connexion redirect vers page connexion
  //si bouton quiz redirect vers la page quizz exemple de redirect : redirect(/quiz/questionnaire)
  // si hover sur les cartes ne rien faire 
  res.render('index', { title: 'Express' });
});

router.post("/addToWishList" ,async function(req, res, next) {

  var idUser = await userModel.find({email:req.body.email})
  console.log("idUser[0]._id)",idUser[0]._id);

  var addWishList = new WishesModel( {
    users: idUser[0]._id,
    Name: req.body.name,
    Description: req.body.description,
    Longitude: req.body.lng,
    Latitude: req.body.lat,
    Photo: req.body.photo,
    Temps:req.body.temps,
    Climat: req.body.climat,
    Continent:req.body.continent,
    Temperature:req.body.temperature
  })


  var wishListSaved = await addWishList.save();
  
 console.log("wishListSaved",wishListSaved);

 wishList=[]

 wishList.push({})

console.log("wishList------->",wishList);

  res.json({wishListSaved})
});


//avoir la wishlist du user
router.post("/wishlist" ,async function(req, res, next) {

  var userID = await userModel.find({email:req.body.email})
  console.log("userWishlist[0]._id)",userID[0]._id);

  
  var userWishlist = await WishesModel.find({users:userID[0]._id})
  console.log("userWishlist)",userWishlist);

  res.json({userWishlist})
});


//supprimer la wishlist du user
router.delete("/wishlist" ,async function(req, res, next) {

  var result = false
  var user = await userModel.findOne({ email: req.body.email })
  console.log("req.body ", req.body )

  var deletewishlistes = await WishesModel.deleteOne({users: user._id,
    _id: req.body.id})



console.log(deletewishlistes)

if(deletewishlistes.deletedCount ==1){
  result = true
}

  // if (user !== null) {
  //   user.articles = user.articles.filter(article => article.title !== req.body.title)

  //   var userUpdated = await user.save()
  //   if (userUpdated) {
  //     result = true
  //   }
  // }

  res.json({ result })
});

//creation pays  dans la base de donn??es

// router.post('/addpays', async function(req, res, next) {


//   //exemple
//   var tabPays = [{
//     name: "R??publique Dominicaine",
//     description: "La R??publique dominicaine est un pays des Cara??bes qui partage l'??le d'Hispaniola avec Ha??ti ?? l'ouest. Elle est connue pour ses plages, ses stations baln??aires et ses golfs. Son territoire se compose de for??t tropicale, de savane et de montagnes dont Pico Duarte, le plus haut sommet des Cara??bes. Saint-Domingue, la capitale, abrite des monuments construits par les Espagnols comme la cath??drale gothique Catedral Primada de America (ou cath??drale Notre-Dame de l'Incarnation) dans le quartier Zona Colonial datant du XVIe si??cle.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true

//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   },{
//     name: "Porto Rico",
//     description: "Porto Rico est une ??le des Cara??bes et un territoire non incorpor?? des ??tats-Unis dont le paysage est constitu?? de montagnes, de chutes d'eau et de la for??t tropicale d'El Yunque. ?? San Juan, la capitale et la plus grande ville de l'??le, la r??gion d'Isla Verde est r??put??e pour ses h??tels, ses bars sur la plage et ses casinos. Le quartier Old San Juan abrite des b??timents coloniaux espagnols color??s, ainsi que le fort El Morro et La Fortaleza, d'immenses forteresses vieilles de plusieurs si??cles.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   },{
//     name: "Panama",
//     description: "Le Panama est un pays situ?? sur l'isthme rattachant l'Am??rique centrale et l'Am??rique du Sud. Le canal de Panama, c??l??bre prouesse d'ing??nierie, coupe cet isthme en son centre pour relier les oc??ans Atlantique et Pacifique, cr??ant ainsi une voie de navigation essentielle. Dans la capitale du m??me nom, les gratte-ciel modernes, casinos et discoth??ques contrastent avec les b??timents de style colonial du quartier de Casco Viejo et la for??t tropicale du parc naturel m??tropolitain.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   },{
//     name: "Venezuela",
//     description: "Le Venezuela est un pays de la c??te nord de l???Am??rique du Sud, aux attractions naturelles vari??es. Le long de sa c??te carib??enne se trouvent des ??les tropicales de vill??giature, dont l'??le Margarita et l'archipel de Los Roques. Au nord-ouest s'??tend la cordill??re des Andes, et la ville coloniale de M??rida, point de d??part des visites du parc national Sierra Nevada. Caracas, la capitale, se situe au nord.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   },
//   {
//     name: "Suriname",
//     description: "Le Suriname est un petit pays de la c??te nord-est de l'Am??rique du Sud. On y trouve de grandes zones recouvertes de for??t tropicale, une architecture coloniale hollandaise et une culture m??tiss??e. Sur sa c??te Atlantique, Paramaribo, sa capitale, abrite des palmeraies ?? c??t?? du fort Zeelandia, qui prot??geait un comptoir commercial du XVIIe si??cle. La ville est ??galement dot??e de la cath??drale Saints-Pierre-et-Paul, un ??difice en bois imposant consacr?? en 1885.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   },
//   {
//     name: "Guatemala",
//     description: "Guatemala est la capitale du Guatemala, en Am??rique centrale. Elle est r??put??e pour son histoire maya, ses hautes altitudes et les volcans de ses environs. Sur la Plaza Mayor dans le centre, ??galement appel??e Parque Central, la Cath??drale m??tropolitaine pr??sente des peintures coloniales et des sculptures religieuses. Le Palais national de la culture offre une vue sur la place depuis son balcon. Dans le sud de la ville, des sentiers de randonn??e m??nent au volcan actif Pacaya.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   },
//   {
//     name: "Nicaragua",
//     description: "Le Nicaragua, entre l'oc??an Pacifique et la mer des Cara??bes, est un pays d'Am??rique centrale connu pour la force de son relief form?? de lacs, de volcans et de plages. Le grand lac Managua et l'embl??matique stratovolcan Momotombo se trouvent au nord de la capitale, Managua. Au sud, la ville de Granada se distingue par son architecture coloniale hispanique et un archipel d'??lots navigables et peupl??s d'oiseaux tropicaux.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   },
//   {
//     name: "Guyane Fran??aise",
//     description: "La Guyane fran??aise est une r??gion d'outre-mer situ??e sur la c??te nord-est de l'Am??rique du Sud, couverte en grande partie de for??t tropicale. Les ruines du fort C??p??rou, datant du XVIIe si??cle, surplombent la capitale, Cayenne, ses maisons cr??oles color??es et ses march??s de rue. Des boutiques et des caf??s entourent la place principale dite des Palmistes qui tire son nom des nombreux palmiers qui s'y ??l??vent. La banlieue de Remire-Montjoly est bord??e de plages donnant sur l'oc??an Atlantique.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   },
//   {
//     name: "Bolivie",
//     description: "La Bolivie est un pays d???Am??rique du Sud qui dispose d???une g??ographie vari??e : on y trouve aussi bien la vaste cordill??re des Andes, que le d??sert d???Atacama, ou la for??t tropicale du bassin amazonien. Sa capitale administrative, La Paz, est perch??e ?? plus de 3 500 m d???altitude sur la plaine de l???Altiplano, surplomb??e par le mont Illimani enneig?? en arri??re-plan. Non loin de l?? se trouvent les eaux calmes du lac Titicaca, le plus grand lac du continent, travers?? par la fronti??re entre la Bolivie et le P??rou.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Am??rique",
//     budget: 3000,
//   }
// ]


//   for(i =0; i<tabPays.length; i++){
//     let newPays=  new countryModel({
//       name: tabPays[i].name,
//     description:  tabPays[i].description,
//     moyenDeTransport:  tabPays[i].moyenDeTransport,
//     photoDrapeau: tabPays[i].photoDrapeau,
//     continent: tabPays[i].continent,
//     budget: tabPays[i].budget,
//     })

  
//     var countrySaved = await newPays.save()

//   }
  
//   res.json('respond with a resource');
// });




//creation ville  dans la base de donn??es

// router.post('/addcities', async function(req, res, next) {
// var idCountry = await countryModel.find({name: "Bolivie"})
// console.log(idCountry[0]._id)
  
//   var tabcities = [
//     {
//     name: "Departamento de Cochabamba",
//     temperature: 10,
//     photo: "blabla",
//     description: "Cochabamba est une ville de Bolivie, si??ge du Parlement sud-am??ricain, capitale du d??partement de Cochabamba et de la province de Cercado. Elle est situ??e ?? 234 km au sud-est de La Paz.",
//     climat: "tropical",
//     activities: {
//       plage: false,
//       neige: false,
//       volcan: false,
//       safari: true,
//       montagne: true
//     },
//     country: idCountry[0]._id,
//     destinationCles: false,
//   }, {
//     name: "Departamento de Oruro",
//     temperature: 10,
//     photo: "blabla",
//     description: "Le d??partement d'Oruro est un d??partement de l'ouest de la Bolivie, situ?? dans les Andes. Sa capitale est la ville d'Oruro. Sa population s'??l??ve ?? 494 587 habitants en 2012. Le d??partement est cr???? le 5 septembre 1826 par un d??cret du pr??sident Antonio Jos?? de Sucre.",
//     climat: "tropical",
//     activities: {
//       plage: true,
//       neige: false,
//       volcan: false,
//       safari: false,
//       montagne: true
//     },
//     country: idCountry[0]._id,
//     destinationCles: false,
//   },{
//     name: "Departamento de Tarija",
//     temperature: 10,
//     photo: "blabla",
//     description: "Le d??partement de Tarija est un d??partement du sud de la Bolivie. Sa capitale est la ville de Tarija.",
//     climat: "tropical",
//     activities: {
//       plage: false,
//       neige: false,
//       volcan: false,
//       safari: true,
//       montagne: true
//     },
//     country: idCountry[0]._id,
//     destinationCles: false,
//   },
// ]


//   for(i =0; i<tabcities.length; i++){
//     let newCities=  new citiesModel({

//       name: tabcities[i].name,
//     temperature: tabcities[i].temperature,
//     photo: tabcities[i].photo,
//     description: tabcities[i].description,
//     climat: tabcities[i].climat,
//     activities: tabcities[i].activities,
//     country: tabcities[i].country,
//     destinationCles: tabcities[i].destinationCles,

//     })

//     var citieSaved = await newCities.save()


//   }
//   console.log(citieSaved)
  
//   res.json(idCountry);
// });



//effacer les users
router.delete('/deleteUser', async function(req, res, next) {




  var deleteUser = await userModel.deleteMany()

  //console.log(deleteMovie)

    res.json({result: true});
  });



module.exports = router;
