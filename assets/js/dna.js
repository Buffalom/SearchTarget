class DNA {
    constructor(genes) {
        this.genes = genes;
        this.fitness;
    }

    calcFitness(target) {
        let correct = 0;
        for (let x = 0; x < target.length; x++) {
            if (this.genes[x] === target.charAt(x)) {
                correct++;
            }
        }
        this.fitness = correct / target.length;
    }

    crossover(partner) {
        let genes = [];
        for (let x = 0; x < this.genes.length; x++) {
            if (random() < 0.5) {
                genes.push(this.genes[x]);
            } else {
                genes.push(partner.genes[x]);
            }
        }
        let child = new DNA(genes);
        return child;
    }

    mutate(mutationRate) {
        for (let y = 0; y < this.genes.length; y++) {
            if (random() < mutationRate) {
                this.genes[y] = randomChar();
            }
        }
    }
}