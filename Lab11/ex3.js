attributes = "Russel;25;25.5;-24.5";

var pieces = attributes.split(";");

for (i=0; i < pieces.length; i++) {
    console.log(typeof(pieces[i]));
}

var pieces_join = pieces.join(",");
