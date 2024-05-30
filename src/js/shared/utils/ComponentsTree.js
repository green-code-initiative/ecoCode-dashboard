import { findAllComponents } from '../api/MeasuresApi';
import Composite from './tree/Composite';
import Leaf from './tree/Leaf';

export default class ComponentsTree {
  constructor(baseComponent, composites = [], leaves = []) {
    this.baseComponent = baseComponent;
    this.composites = composites;
    this.leaves = leaves;
  }

  async build(repo) {
    this.root = await this.createComponent(this.baseComponent, repo);
  }

  async createComponent(component, repo) {
    const temp = repo.split('-');
    const lang = temp[0];
    if (component) {
      if (component.qualifier === 'FIL' && component.language === lang) {
        const leaf = new Leaf(component);
        await leaf.operation();

        return leaf;
      }
      if (component.qualifier === 'DIR' || component.qualifier === 'TRK') {
        const composite = new Composite(component);
        let children = [];
        children = await findAllComponents(component.key);

        const componentPromise = [];
        children.forEach((child) =>
          componentPromise.push(this.createComponent(child, repo)),
        );

        (await Promise.all(componentPromise)).forEach((child) => {
          if (child) {
            if (
              child.component.qualifier === 'FIL' ||
              (child.component.qualifier === 'DIR' && child.children.length > 0)
            ) {
              composite.add(child);
            }
          }
        });

        if (composite.children.length > 0) {
          await composite.operation();
          return composite;
        }
      }
    }

    return null;
  }

  async getComposites() {
    this.composites = [];
    this.leaves = [];
    if (this.root) {
      await this.iterate(this.root);
      return this.composites;
    }
    return undefined;
  }

  async getLeaves() {
    this.composites = [];
    this.leaves = [];
    if (this.root) {
      await this.iterate(this.root);
      return this.leaves;
    }
    return undefined;
  }

  async iterate(component) {
    const promises = [];
    if (component) {
      for (let index = 0; index < component.children.length; index += 1) {
        const child = component.children[index];

        if (child.component.qualifier === 'FIL') {
          this.leaves.push(child);
        } else {
          this.composites.push(child);
          promises.push(this.iterate(child));
        }
      }
      await Promise.all(promises);
    }
  }
}
