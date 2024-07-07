import bakedSalmon from './baked-salmon.jpeg'
import fruitSalad from './fruit-salad.jpeg'
import mongoalianBeef from './mongolian-beef.jpeg'
import spinachSalad from './spinach-salad.jpeg'
import spinachSaladshort from './spanishsaladshort.mp4'
import afterlife from './Afterlife.jpeg'

export const menupics = {
    bakedSalmon,
    fruitSalad,
    mongoalianBeef,
    spinachSalad,
    spinachSaladshort,
    afterlife
}
export const menuItems = [
    { id: 1, name: 'Spinach Salad', calories: '460 Cal', price: '$18.49',video: spinachSaladshort, image: spinachSalad, desc:"A vibrant Fresh Spinach Salad featuring crisp spinach leaves.",combinations:["Mongolian Beef", "Baked Salmon","Fruit Salad","Mongolian Beef"] ,category:"Salad"},

    { id: 2, name: 'Mongolian Beef', calories: '750 Cal', price: '$15.49', image: mongoalianBeef ,combinations:["Fruit Salad", "Spinach Salad"],category:"Beef"},

    { id: 3, name: 'Baked Salmon', calories: '260 Cal', price: '$20.49', image: bakedSalmon ,category:"Salad"},

    { id: 4, name: 'Fruit Salad', calories: '185 Cal', price: '$15.49', image: fruitSalad ,category:"nonveg"},

    { id: 5, name: 'Baked Salmon', calories: '260 Cal', price: '$20.49', image: bakedSalmon ,category:"veg"},

    { id: 6, name: 'Mongolian Beef', calories: '750 Cal', price: '$15.49', image: mongoalianBeef ,category:"mutton" },

    { id: 7, name: 'Baked Salmon', calories: '260 Cal', price: '$20.49', image: bakedSalmon ,category:"fish"}, 
    
    { id: 8, name: 'Mongolian Beef', calories: '750 Cal', price: '$15.49', image: mongoalianBeef ,category:"wine" },

    { id: 9, name: 'Baked Salmon', calories: '260 Cal', price: '$20.49', image: bakedSalmon,category:"Chicken" },
];