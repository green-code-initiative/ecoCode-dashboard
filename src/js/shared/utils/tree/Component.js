export default class Component {
  constructor(
    component,
    numberOfLines = 0,
    minorSeverities = [],
    majorSeverities = [],
    criticalSeverities = [],
    blockerSeverities = [],
    leaves = [],
    composites = [],
  ) {
    this.component = component;
    this.numberOfLines = numberOfLines;
    this.minorSeverities = minorSeverities;
    this.majorSeverities = majorSeverities;
    this.criticalSeverities = criticalSeverities;
    this.blockerSeverities = blockerSeverities;

    if (this.constructor === Component) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  add(component) {
    throw new Error("Method 'add()' must be implemented.");
  }

  get(index) {
    throw new Error("Method 'get()' must be implemented.");
  }

  async remove(component) {
    throw new Error("Method 'remove()' must be implemented.");
  }

  getChildren() {
    throw new Error("Method 'getChildren()' must be implemented.");
  }

  async operation(margin) {
    throw new Error("Method 'operation()' must be implemented.");
  }

  async print(margin) {
    throw new Error("Method 'print()' must be implemented.");
  }
}
