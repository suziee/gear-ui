export default function Cam(args) {
    const {
        id
        , guid
        , brand
        , model
        , size
        , color
        , weightInGrams
        , strengthInKilonewtons
        , usableMinInMillimeters
        , usableMaxInMillimeters
        , usableMinInInches
        , usableMaxInInches
    } = args;

    this.guid = guid;
    this.brand = brand;
    this.model = model;
    this.size = size;
    this.color = color;
    this.weight = weightInGrams
    this.weightUnit = "g";
    this.strength = strengthInKilonewtons
    this.strengthUnit = "kN";
    this.usableMin = usableMinInMillimeters;
    this.usableMax = usableMaxInMillimeters;
    this.usableRange = this.usableMax - this.usableMin;
    this.rangeUnit = "mm";
    this.usableMinInInches = usableMinInInches;
    this.usableMaxInInches = usableMaxInInches;
    this.averageInches = (usableMaxInInches + usableMinInInches) / 2;

    if (size == "00") {
        this.order = "-1";
    } else if (size == "000") {
        this.order = "-2";
    } else {
        this.order = size;
    }

    this.cssColor = color.replace(" ", "");
}