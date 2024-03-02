export default function Branch(args) {
    const {
        brand
        , model
        , cams
    } = args;

    this.brand = brand;
    this.model = model;
    this.cams = cams;

    //https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    cams.sort((a, b) => {
        let sizeA = parseFloat(a.order);
        let sizeB = parseFloat(b.order);

        // order by asc
        if (sizeA < sizeB) {
            return -1;
        } else if (sizeA > sizeB) {
            return 1;
        } else {
            return 0;
        }
    });
}