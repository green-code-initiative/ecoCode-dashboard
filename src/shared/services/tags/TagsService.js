import { issuesStoreKey, rulesStoreKey } from '../../common/storageKeys';
import TagIssues from '../../models/TagIssues';
import TagRulesAnalytics from '../../models/TagRulesAnalytics';
import { getStoredData } from '../../storage/DataStorage';

export default class TagsService {
  static async buildTagIssues(projectKey, tag) {
    const tagIssue = new TagIssues();
    const tagLowerCase = tag.toLowerCase();
    let issues = await getStoredData(`${issuesStoreKey}/tag/${tagLowerCase}`);
    const rules = await getStoredData(`${rulesStoreKey}/tag/${tagLowerCase}`);

    issues = issues.filter((i) => !i.status.includes('CLOSED'));

    if (issues && rules) {
      const affectedRules = [...new Set(issues.map((item) => item.rule))];
      const optimizedRules = rules.filter(
        (val) => !affectedRules.includes(val.key),
      );

      if (affectedRules && optimizedRules) {
        tagIssue.tag = tag;
        tagIssue.tagRules = rules.length;
        tagIssue.rulesWithIssues = issues.length;
        tagIssue.affectedRules = affectedRules.length;

        const critical = issues.filter((i) => i.severity.includes('CRITICAL'));
        const major = issues.filter((i) => i.severity.includes('MAJOR'));
        const minor = issues.filter((i) => i.severity.includes('MINOR'));

        tagIssue.optimizedRules = new TagRulesAnalytics();
        tagIssue.optimizedRules.value = optimizedRules.length;
        if (tagIssue.optimizedRules.value) {
          tagIssue.optimizedRules.percentage =
            (optimizedRules.length / rules.length) * 100;
        }

        const restPercentage = 100 - tagIssue.optimizedRules.percentage;

        tagIssue.minorIssues = new TagRulesAnalytics();
        tagIssue.criticalIssues = new TagRulesAnalytics();
        tagIssue.majorIssues = new TagRulesAnalytics();

        if (critical.length) {
          tagIssue.criticalIssues.value = critical.length;
          tagIssue.criticalIssues.percentage = (
            (((critical.length / issues.length) * 100) / 100) *
            restPercentage
          ).toFixed(2);
        }
        if (major.length) {
          tagIssue.majorIssues.value = major.length;
          tagIssue.majorIssues.percentage = (
            (((major.length / issues.length) * 100) / 100) *
            restPercentage
          ).toFixed(2);
        }
        if (minor.length) {
          tagIssue.minorIssues.value = minor.length;
          tagIssue.minorIssues.percentage = (
            (((minor.length / issues.length) * 100) / 100) *
            restPercentage
          ).toFixed(2);
        }

        let firstSlice = (tagIssue.optimizedRules.percentage / 100) * 360;
        const secondSlice =
          firstSlice +
          (parseFloat(tagIssue.minorIssues.percentage) / 100) * 360;
        const thirdSlice =
          parseFloat(secondSlice) +
          (parseFloat(tagIssue.majorIssues.percentage) / 100) * 360;
        const lastSlice =
          parseFloat(thirdSlice) +
          (parseFloat(tagIssue.criticalIssues.percentage) / 100) * 360;

        if (
          tagIssue.minorIssues.percentage === 0 &&
          tagIssue.majorIssues.percentage === 0 &&
          tagIssue.optimizedRules.percentage === 0 &&
          tagIssue.criticalIssues.percentage === 0
        ) {
          firstSlice = 360;
        }
        const cercleStyle =
          `${
            'white conic-gradient(' +
            'from 0deg at 50% 50%,' +
            '#85BB2F 0deg, #85BB2F '
          }${firstSlice}deg,` +
          `#FECB02 ${firstSlice}deg, #FECB02 ${secondSlice}deg,` +
          `#FF8E12 ${secondSlice}deg, #FF8E12 ${thirdSlice}deg,` +
          `#E30021 ${thirdSlice}deg, #E30021 ${lastSlice}deg,` +
          '#85BB2F 360deg)';

        tagIssue.cercleStyle = cercleStyle;
      }
    }
    return tagIssue;
  }
}
