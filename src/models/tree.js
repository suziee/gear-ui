export default function Tree(args) {
    const {
        brand
        , models
        , branches
    } = args;

    this.brand = brand;
    this.branches = branches;
    this.models = models;
}