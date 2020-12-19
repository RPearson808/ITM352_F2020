/*
-----Author: Russel Pearson
-----Date: 12/17/2020
-----Purpose: Provide pages within the secure folder access to the array of products here.  This was done because I kept encountering
              an error with the MIME type when trying to access the exact same file within the public folder, the same one one being 
              used in index.html.  This is pretty much copy-pasted from the public folder.
*/
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
    },

    {
        name: "Copy Artifact",
        price: 74.99,
        img:"../images/a_copy_artifact.jpg"
    },   

    {
        name: "Mind Twist",
        price: 89.99,
        img:"../images/a_mind_twist.jpg"
    },
        
    {
        name: "Volcanic Island",
        price: 699.99,
        img:"../images/a_volcanic_island.jpg"
    }
];

if(typeof module != 'undefined') {
    module.exports.products_array = products_array;
  }