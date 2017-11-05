class Population {
    constructor(target, totalPopulation, mutationRate, generation) {
        this.target = target;
        this.totalPopulation = totalPopulation;
        this.mutationRate = mutationRate;
        this.generation = generation || 1;
        this.dna = [];
        this.matingPool = [];
    }

    initalize(chars) {
        for (let x = 0; x < this.totalPopulation; x++) {
            let randomDna = [];
            for (let y = 0; y < this.target.length; y++) {
                randomDna.push(chars.substr(Math.floor(Math.random() * chars.length) , 1));
            }
            this.dna.push(new DNA(randomDna));
        }
    }

    evaluate() {
        for (let x = 0; x < this.dna.length; x++) {
            let dna = this.dna[x];
            dna.evaluate(this.target);

            for (let y = Math.floor(dna.fitness * 100); y > 0; y--) {
                this.matingPool.push(x);
            }
        }
    }

    cross() {
        let newDna = [];
        for (let x = 0; x < this.dna.length; x++) {
            let parent1 = this.dna[this.matingPool[Math.floor(Math.random() * this.matingPool.length)]];
            let parent2 = this.dna[this.matingPool[Math.floor(Math.random() * this.matingPool.length)]];
            let dna = [];
            for (let y = 0; y < parent1.dna.length; y++) {
                if (random() < 0.5) {
                    dna.push(parent1.dna[y]);
                } else {
                    dna.push(parent2.dna[y]);
                }
            }
            newDna.push(new DNA(dna));
        }
        return newDna;
    }

    mutate(newDna, chars) {
        for (let x = 0; x < newDna.length; x++) {
            newDna[x].mutate(this.mutationRate, chars);
        }
        return newDna;
    }

    next(newDna) {
        this.dna = newDna;
        this.generation++;
    }

    /* Getters */
    best() {
        let best = this.dna[0];
        for (let x = 0; x < this.dna.length; x++) {
            if (best.fitness < this.dna[x].fitness) {
                best = this.dna[x];
            }
        }
        return best.dna.join("");
    }

    avgFitness() {
        let totalDna = 0;
        for (let x = 0; x < this.dna.length; x++) {
            totalDna += this.dna[x].fitness;
        }
        return totalDna / this.dna.length;
    }

    getAllDna() {
        let allDna = [];
        for (let x = 0; x < this.dna.length; x++) {
            allDna.push(this.dna[x].dna.join(""));
        }
        return allDna;
    }
}