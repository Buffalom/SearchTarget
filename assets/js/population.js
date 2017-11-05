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
            let randomDna = [];
            for (let y = 0; y < this.target.length; y++) {
                randomDna.push(chars.substr(Math.floor(Math.random() * chars.length) , 1));
            }
            this.population.push(new DNA(randomDna));
        }
    }

    evaluate() {
        for (let x = 0; x < this.population.length; x++) {
            let dna = this.population[x];
            dna.evaluate(this.target);

            for (let y = Math.floor(dna.fitness * 100); y > 0; y--) {
                this.matingPool.push(x);
            }
        }
    }

    cross() {
        let newPopulation = [];
        for (let x = 0; x < this.population.length; x++) {
            let parent1 = this.population[this.matingPool[Math.floor(Math.random() * this.matingPool.length)]];
            let parent2 = this.population[this.matingPool[Math.floor(Math.random() * this.matingPool.length)]];
            let dna = [];
            for (let y = 0; y < parent1.dna.length; y++) {
                if (random() < 0.5) {
                    dna.push(parent1.dna[y]);
                } else {
                    dna.push(parent2.dna[y]);
                }
            }
            newPopulation.push(new DNA(dna));
        }
        return newPopulation;
    }

    mutate(newPopulation, chars) {
        for (let x = 0; x < newPopulation.length; x++) {
            newPopulation[x].mutate(this.mutationRate, chars);
        }
        return newPopulation;
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
        return best.dna.join("");
    }

    avgFitness() {
        let totalDna = 0;
        for (let x = 0; x < this.population.length; x++) {
            totalDna += this.population[x].fitness;
        }
        return totalDna / this.population.length;
    }

    getAllDna() {
        let allDna = [];
        for (let x = 0; x < this.population.length; x++) {
            allDna.push(this.population[x].dna.join(""));
        }
        return allDna;
    }
}