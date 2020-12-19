/*
-----Author: Russel Pearson
-----Date: 11/1/2020
-----Purpose: Provide index.html with the array of products to generate storefront
*/
// fun fact: all of these prices are only 10% of their actual value according to CardKingdom
var products_array = [    
    {
        name: "Black Lotus",
        price: 8999.99,
        img: "../images/a_black_lotus.jpg"
    },
    
    {
        name: "Mox Pearl",
        price: 799.99,
        img:"../images/a_mox_pearl.jpg"
    },
       
    {
        name: "Mox Sapphire",
        price: 1499.99,
        img:"../images/a_mox_sapphire.jpg"
    },

    {
        name: "Mox Jet",
        price: 879.99,
        img:"../images/a_mox_jet.jpg"
    },

    {
        name: "Mox Ruby",
        price: 999.99,
        img:"../images/a_mox_ruby.jpg"
    },
 
    {
        name: "Mox Emerald",
        price: 659.99,
        img:"../images/a_mox_emerald.jpg"
    },

    {
        name: "Ancestral Recall",
        price: 959.99,
        img:"../images/a_ancestral_recall.jpg"
    },

    {
        name: "Timetwister",
        price: 1000.99,
        img:"../images/a_timetwister.jpg"
    },
    
    {
        name: "Time Walk",
        price: 839.99,
        img:"../images/a_time_walk.jpg"
    }
];

if(typeof module != 'undefined') {
    module.exports.products_array = products_array;
  }