class Population {
    constructor(target, totalPopulation, mutationRate, generation) {
        this.target = target;
        this.totalPopulation = totalPopulation;
        this.mutationRate = mutationRate;
        this.generation = generation || 1;
        this.population = [];
        this.matingPool = [];
    }

    initalize(chars) {
        for (let x = 0; x < this.totalPopulation; x++) {
            let randomgenes = [];
            for (let y = 0; y < this.target.length; y++) {
                randomgenes.push(randomChar());
            }
            this.population.push(new DNA(randomgenes));
        }
    }

    calcFitness() {
        for (let x = 0; x < this.population.length; x++) {
            let genes = this.population[x];
            genes.calcFitness(this.target);
        }
    }

    naturalSelection() {
        this.matingPool = [];
        
        let maxFitness = 0;
        for (let x = 0; x < this.population.length; x++) {
            let dna = this.population[x];
            if (dna.fitness > maxFitness) {
                maxFitness = dna.fitness;
            }
        }

        for (let x = 0; x < this.population.length; x++) {
            let dna = this.population[x];
            let fitness = map(dna.fitness, 0, maxFitness, 0, 1);
            let n = floor(fitness * 100);
            for (let y = 0; y < n; y++) {
                this.matingPool.push(x);
            }
        }
    }

    generate() {
        let newPopulation = [];
        for (let x = 0; x < this.population.length; x++) {
            let partnerA = this.population[this.matingPool[floor(random(this.matingPool.length))]];
            let partnerB = this.population[this.matingPool[floor(random(this.matingPool.length))]];
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            newPopulation.push(child);
        }
        return newPopulation;
    }

    evaluate() {
        for (let x = 0; x < this.population.length; x++) {
            if (this.population[x].fitness === 1) {
                noLoop();
            }
        }
    }

    next(newPopulation) {
        this.population = newPopulation;
        this.generation++;
    }

    /* Getters */
    best() {
        let best = this.population[0];
        for (let x = 0; x < this.population.length; x++) {
            if (best.fitness < this.population[x].fitness) {
                best = this.population[x];
            }
        }
        return best.genes.join("");
    }

    avgFitness() {
        let totalFitness = 0;
        for (let x = 0; x < this.population.length; x++) {
            totalFitness += this.population[x].fitness;
        }
        return totalFitness / this.population.length;
    }

    getAllDna() {
        let allDna = [];
        for (let x = 0; x < this.population.length; x++) {
            allDna.push(this.population[x].genes.join(""));
        }
        return allDna;
    }
}