class Dna {
    constructor(dna) {
        this.dna = dna;
        this.fitness;
    }

    evaluate(target) {
        let targetArray = target.split("");
        let correct = 0;
        for (let x = 0; x < target.length; x++) {
            if (this.dna[x] === targetArray[x]) {
                correct++;
            }
        }
        this.fitness = correct / target.length;
    }

    mutate(mutationRate, chars) {
        for (let y = 0; y < this.dna.length; y++) {
            if (random() < mutationRate) {
                this.dna[y] = chars.substr(Math.floor(Math.random() * chars.length) , 1);
            }
        }
    }
}