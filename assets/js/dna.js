class DNA {
    constructor(genes) {
        this.genes = genes;
        this.fitness;
    }

    calcFitness(target) {
        let targetArray = target.split("");
        let correct = 0;
        for (let x = 0; x < target.length; x++) {
            if (this.genes[x] === targetArray[x]) {
                correct++;
            }
        }
        this.fitness = correct / target.length;
    }

    mutate(mutationRate) {
        for (let y = 0; y < this.genes.length; y++) {
            if (random() < mutationRate) {
                this.genes[y] = randomChar();
            }
        }
    }
}