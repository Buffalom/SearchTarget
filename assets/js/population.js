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
        for (let x = 0; x < this.population.length; x++) {
            let genes = this.population[x];
            for (let y = floor(genes.fitness * 100); y > 0; y--) {
                this.matingPool.push(x);
            }
        }
    }

    generate() {
        let newPopulation = [];
        for (let x = 0; x < this.population.length; x++) {
            let parent1 = this.population[this.matingPool[floor(random() * this.matingPool.length)]];
            let parent2 = this.population[this.matingPool[floor(random() * this.matingPool.length)]];
            let genes = [];
            for (let y = 0; y < parent1.genes.length; y++) {
                if (random() < 0.5) {
                    genes.push(parent1.genes[y]);
                } else {
                    genes.push(parent2.genes[y]);
                }
            }
            newPopulation.push(new DNA(genes));
        }
        this.mutate(newPopulation);
    }

    mutate(newPopulation) {
        for (let x = 0; x < newPopulation.length; x++) {
            newPopulation[x].mutate(this.mutationRate);
        }
        this.next(newPopulation);
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