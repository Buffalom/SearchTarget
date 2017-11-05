var totalPopulation = 200;
var mutationRate = 0.01;
var target = "To be or not to be.";
let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,:_-";

var population;

function setup() {
    //noLoop();
    population = new Population(target, totalPopulation, mutationRate);
    population.initalize(chars);
}

function draw() {
    // Calculate Fitness
    population.calcFitness(target);
    // Generate mating pool
    population.naturalSelection();
    // Print stats
    printStats();
    // Create next generate
    population.generate();
}

function printStats() {
    $('span#target').html(target);
    $('span#best').html(population.best());

    $('span#totGenerations').html(population.generation);
    $('span#avgFitness').html((floor(population.avgFitness() * 1000) / 10) + "%");
    $('span#totPopulation').html(totalPopulation);
    $('span#mutRate').html(mutationRate * 100 + "%");

    $('div#population').html("");
    let allDna = population.getAllDna();
    for (let x = 0; x < allDna.length; x++) {
        $('div#population').html($('div#population').html() + `<p>${allDna[x]}</p>`);
    }
}

function randomChar() {
    var c = floor(random(63, 122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;

    return String.fromCharCode(c);
}