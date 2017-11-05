class Population {
    constructor(mutationRate, generation) {
        this.mutationRate = mutationRate;
        this.generation = generation || 1;
        this.dna = [];
        this.matingPool = [];
        this.newDna = [];
    }

    initalize(totalPopulation, target, chars) {
        for (let x = 0; x < totalPopulation; x++) {
            let randomDna = [];
            for (let y = 0; y < target.length; y++) {
                randomDna.push(chars.substr(Math.floor(Math.random() * chars.length) , 1));
            }
            this.dna.push(new Dna(randomDna));
        }
    }

    evaluate(target) {
        for (let x = 0; x < this.dna.length; x++) {
            let dna = this.dna[x];
            dna.evaluate(target);

            for (let y = Math.floor(dna.fitness * 100); y > 0; y--) {
                this.matingPool.push(x);
            }
        }
    }

    cross() {
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
            this.newDna.push(new Dna(dna));
        }
    }

    mutate(chars) {
        for (let x = 0; x < this.newDna.length; x++) {
            this.newDna[x].mutate(this.mutationRate, chars);
        }
    }

    next() {
        this.dna = this.newDna;
        this.generation++;
        this.newDna = [];
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