

var sizes = [16,24,32,48,64,96,128,256,512,1024]
for(let i =0; i < sizes.length; i++){
    console.log("inkscape -z -e " + sizes[i] + "x" + sizes[i] + ".png -w " + sizes[i] + " -h " + sizes[i] + " load_icon.svg")
}