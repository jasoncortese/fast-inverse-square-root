const prototypes = new WeakMap();
const aggregates = new WeakMap();

class Aggregate {
    constructor(target = {}, source = this) {
        prototypes.has(target) || prototypes.set(target, Object.getPrototypeOf(target));
        prototypes.has(source) || prototypes.set(source, Object.getPrototypeOf(source));
        aggregates.has(target) || aggregates.set(target, Object.create(prototypes.get(target)));

        this.target = {
            self:  target,
            proto: prototypes.get(target),
            props: Object.getOwnPropertyDescriptors(prototypes.get(target)),
        };

        this.source = {
            self:  source,
            proto: prototypes.get(source),
            props: getAllPropertyDescriptors(prototypes.get(source)),
        };

        this.aggregate = aggregates.get(target);

        Object.defineProperties(this.aggregate, this.target.props);
        Object.defineProperties(this.aggregate, this.source.props);
        Object.setPrototypeOf(target, this.aggregate);
    }
}
