let model;
let strokePath = null;
let x;
let y;
let pen = 'down'

function setup () {
    createCanvas(600, 600);    
    background(255);
    x = width / 2;
    y = width / 2;
    model = ml5.SketchRNN("bus", modelReady)
}

function draw () {
    if(strokePath != null) {
        let newX = x + strokePath.dx;
        let newY = y + strokePath.dy;
        if(pen == 'down') {
            strokeWeight(4);
            line(x, y, newX, newY);
        }
        pen = strokePath.pen;
        strokePath = null;
        x = newX;
        y = newY;
        if(pen !== 'end') {
            model.generate(gotSketch);

        } else {
            console.log("DRAWING IS COMPLETE.")
            model.reset();
        }
    }
}


function modelReady () {
    console.log("MODEL IS FETCHED AND IS READY FOR USE.");
    model.reset();
    model.generate(gotSketch)
}

// Get the strokepath as an argument.
function gotSketch (error, s) {
    if(error) {
        console.error(error)
    }
    strokePath = s;
    console.log(strokePath);
}