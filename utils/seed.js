const Dish=require('../models/dish.js');
const Comment=require('../models/comment.js')

const sample_dishes=[
	{
	name_of_dish:"Cheese burger max",
	ingredients:"250 gm minced mutton4 Tbsp onions - finely chopped1/2 tsp ginger-garlic paste1/2 tsp black pepper powderSalt - to taste oil3-4 Tbsp butter3-4 burger buns4 tomato slices4 onion slicesColeslaw (optional)Mayonnaise (optional)For French Fries:3-4 large potatoesSalt - to tastePepper (optional)Oil - for deep frying",
	recipe:"1.Mix the minced mutton, onion, garlic-ginger paste, salt and pepper together.2.Shape the mixture in 3 or 4 round patties and refrigerate for an hour.3.Pan fry these patties by browning both sides over a high heat, then lower the heat and let them cook through and remove.4.In the same pan, melt some butter, slit the buns in half and semi-toast them in the butter.5.Now make the hamburger with onion and tomato slices, coleslaw or mayonnaise.6.Serve with ketchup or mustard and fries.",
	description:"A Cheese burger is a sandwich consisting of a cooked meat patty on a bun or roll. ... Hamburgers are traditionally made with ground beef and served with onions, tomatoes, lettuce, ketchup, and other garnishes.",
	health_indicator:"high calorie high fat ",
	image:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
	"cuisine":"AMERICAN",
	"rating":2},
	{
	name_of_dish:"Dahi Samosa Chaat",
	ingredients:'Maida, Mashed potato, Matar (optional), Garam Masala, Chaat Masala, Salt, Imli Ki Chutney, Mint Chutney, Dahi, Oil To Fry, Red Chilli Powder, Chopped Green Chillies, Black salt, Coriander Leaves, Sev To Garnish',
	recipe:"1.Firstly, prepare the knead by using maida, carrom seeds, salt and water. Set it aside for at least 15 minutes.2.Mash some boiled potatoes along with matar, green chillies and all the dry spices. Mix everything well.3.Now, take a small portion from the dough, roll it and stuff it with the aloo filling. Seal all the sides and drop them into the kadhai of hot oil. Fry until the samosa turns crispy and golden.4.Transfer the samosa on a plate, pour beaten curd, chutneys, sprinkle some chaat masala, coriander leaves and sev on the top.5.Your samosa chaat is ready to relish",
	description:"Made with rich freshly grounded spices, crispy aloo samosa and a lot of dahi, this chaat is surely to die for.",
	health_indicator:"tasty snack",
	image:"https://c.ndtvimg.com/2021-05/4dl2mfao_rasgulla-chaat_625x300_25_May_21.jpg",
	"cuisine":"INDIAN",
	"rating":5},
	{
	name_of_dish:"Gud Til Ladoo ",
	ingredients:"Jaggery, Roasted Sesame (til), Ghee, Cardamom Powder, Almonds (Crushed), Cashews (Crushed)",
	recipe:"1.First of all, roast sesame seeds in a pan and keep them aside to cool down. Then, place a wok on the gas and heat it by adding ghee.2.Add jaggery to it and let it melt completely. Slow down the flame.3.After melting the jaggery, add sesame seeds, cardamom powder, crushed almonds and cashews and mix it well.4.Now turn off the gas. After the mixture cools down a bit, grease your hands and make laddus from it.5.Keep these laddoos in an airtight container and enjoy them.",
	description:"These laddus made in winter are not only delicious and also keep your health in check. Consumption of sesame and jaggery in winter is very beneficial. It helps to keep you warm from inside.",
	health_indicator:"high calcium food ",
	image:"https://i.ndtvimg.com/i/2018-01/til-ladoo_620x350_41515484858.jpg",
	"cuisine":"INDIAN",
	"rating":5}
	
]

const seed= async()=>{
	await Dish.deleteMany();
	console.log('deleted all existing dishes')

	await Comment.deleteMany();
	console.log('deleted all commnets')

	 for(const dish of sample_dishes){
		const get_dish_id=await Dish.create(dish);
		console.log('created a dish')
		await Comment.create({
			user: 'pavan kumar',
			text: `${get_dish_id.name_of_dish} is yummy and fills the tummy` ,
			dishId: get_dish_id._id
			});
		console.log(`created comment for${get_dish_id.name_of_dish}`)
	 };
};


module.exports = seed ;