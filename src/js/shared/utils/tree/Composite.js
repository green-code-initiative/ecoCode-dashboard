import Component from './Component';

export default class Composite extends Component {
  constructor(
    component,
    children = [],
    numberOfLines,
    minorSeverities,
    majorSeverities,
    criticalSeverities,
    blockerSeverities,
  ) {
    super(
      component,
      numberOfLines,
      minorSeverities,
      majorSeverities,
      criticalSeverities,
      blockerSeverities,
    );

    if (children) {
      this.children = children;
    } else this.children = [];
  }

  getChildren() {
    return this.children;
  }

  get(index) {
    return this.children[index];
  }

  add(child) {
    if (child) {
      this.children.push(child);
    }
  }

  async operation() {
    for (let index = 0; index < this.children.length; index += 1) {
      const child = this.children[index];

      this.numberOfLines += child.numberOfLines;

      this.minorSeverities = this.minorSeverities.concat(child.minorSeverities);
      this.majorSeverities = this.majorSeverities.concat(child.majorSeverities);
      this.criticalSeverities = this.criticalSeverities.concat(
        child.criticalSeverities,
      );
      this.blockerSeverities = this.blockerSeverities.concat(
        child.blockerSeverities,
      );
    }
  }

  async print(margin) {
    for (let index = 0; index < this.children.length; index += 1) {
      const element = this.children[index];

      await element.print(`${margin}    `);
    }
  }
}
