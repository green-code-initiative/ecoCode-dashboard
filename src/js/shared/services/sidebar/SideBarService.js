import {
  fileComponentsStoreKey,
  numberIssuesOfEachRuleStoreKey,
  rulesStoreKey,
  totalAppCodeLinesStoreKey,
} from '../../common/storageKeys';
import { getStoredData } from '../../storage/DataStorage';

export default class SideBarService {
  static async calculatePluginCoverage() {
    const components = await getStoredData(fileComponentsStoreKey);
    if (components) {
      let totalNumberLinesOfComponents = 0;

      for (let index = 0; index < components.length; index += 1) {
        const component = components[index];
        const codeLinesComponent = component.numberOfLines;

        totalNumberLinesOfComponents += parseInt(codeLinesComponent, 10);
      }

      const totalAppLines = await getStoredData(totalAppCodeLinesStoreKey);

      return ((totalNumberLinesOfComponents * 100) / totalAppLines).toFixed(2);
    }

    return undefined;
  }

  static async calculateOptimizedRules() {
    const res = {
      optimizableRulesCircleColorClass: '',
      optimizableRulesPercentage: 0,
      optimizableRulesIssues: 0,
    };
    const issuesOfEachRule = await getStoredData(
      numberIssuesOfEachRuleStoreKey,
    );
    const totalRules = await getStoredData(rulesStoreKey);
    if (issuesOfEachRule && totalRules) {
      const optimizedRules = totalRules.length - issuesOfEachRule.length;

      res.optimizableRulesIssues = optimizedRules;
      res.optimizableRulesPercentage =
        (optimizedRules * 100) / totalRules.length;

      if (res.optimizableRulesPercentage === 100) {
        res.optimizableRulesCircleColorClass = 'circle-shadow-inset--green';
      } else if (
        res.optimizableRulesPercentage >= 66 &&
        res.optimizableRulesPercentage <= 99
      ) {
        res.optimizableRulesCircleColorClass = 'circle-shadow-inset--yellow';
      } else if (
        res.optimizableRulesPercentage >= 33 &&
        res.optimizableRulesPercentage <= 65
      ) {
        res.optimizableRulesCircleColorClass = 'circle-shadow-inset--orange';
      } else if (
        res.optimizableRulesPercentage >= 0 &&
        res.optimizableRulesPercentage <= 33
      ) {
        res.optimizableRulesCircleColorClass = 'circle-shadow-inset--red';
      }
    }

    return res;
  }
}
