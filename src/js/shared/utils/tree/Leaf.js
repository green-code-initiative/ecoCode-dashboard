import { issuesStoreKey } from '../../common/storageKeys';
import { getStoredData } from '../../storage/DataStorage';
import Component from './Component';

export default class Leaf extends Component {
  async operation() {
    if (
      'component' in this &&
      'measures' in this.component &&
      this.component.measures.length > 0
    ) {
      this.numberOfLines = parseInt(this.component.measures[0].value);
      const issues = await getStoredData(issuesStoreKey);
      if (issues) {
        this.minorSeverities = issues.filter(
          (issue) =>
            issue.component.includes(this.component.key) &&
            issue.severity.includes('MINOR'),
        );
        this.majorSeverities = issues.filter(
          (issue) =>
            issue.component.includes(this.component.key) &&
            issue.severity.includes('MAJOR'),
        );
        this.criticalSeverities = issues.filter(
          (issue) =>
            issue.component.includes(this.component.key) &&
            issue.severity.includes('CRITICAL'),
        );
        this.blockerSeverities = issues.filter(
          (issue) =>
            issue.component.includes(this.component.key) &&
            issue.severity.includes('BLOCKER'),
        );
      }
    }
  }

  async print(margin) {
    console.log(`${margin}> file : ${this.component.name}`);
  }
}
