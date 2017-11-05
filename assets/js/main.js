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
    population.evaluate(target);

    let newPopulation = population.cross();

    newPopulation = population.mutate(newPopulation, chars);
    
    printStats();

    population.next(newPopulation);
}

function printStats() {
    $('span#target').html(target);
    $('span#best').html(population.best());

    $('span#totGenerations').html(population.generation);
    $('span#avgFitness').html((Math.floor(population.avgFitness() * 1000) / 10) + "%");
    $('span#totPopulation').html(totalPopulation);
    $('span#mutRate').html(mutationRate * 100 + "%");

    $('div#population').html("");
    let allDna = population.getAllDna();
    for (let x = 0; x < allDna.length; x++) {
        $('div#population').html($('div#population').html() + `<p>${allDna[x]}</p>`);
    }
}