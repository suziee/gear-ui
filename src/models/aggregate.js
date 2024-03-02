export default function Aggregate(args) {
    const {
        minRange
        , minStrength
        , maxStrength
        , maxRange
    } = args;

    this.minRange = minRange;
    this.minStrength = minStrength;
    this.maxStrength = maxStrength;
    this.maxRange = maxRange;

    this.strengthRange = [];

    for (let i = minStrength; i <= maxStrength; i++) {
        this.strengthRange[i - minStrength] = i;
    }
}