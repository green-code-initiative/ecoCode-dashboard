/**
 * Managing Sonar API requests for sensitizations business logic.
 */
import {
  blockerIssuesProjectStoreKey,
  criticalIssuesProjectStoreKey,
  majorIssuesProjectStoreKey,
  minorIssuesProjectStoreKey,
} from '../../common/storageKeys';
import { getStoredData } from '../../storage/DataStorage';

export default class SensitizationService {
  static async calculateOptimizationRate() {
    let rate = { letter: 'A', percentage: '100' };

    const minorSeverities = await getStoredData(minorIssuesProjectStoreKey);
    const majorSeverities = await getStoredData(majorIssuesProjectStoreKey);
    const criticalSeverities = await getStoredData(
      criticalIssuesProjectStoreKey,
    );
    const blockerSeverities = await getStoredData(blockerIssuesProjectStoreKey);
    const nombreDeLigne = 1000;

    const ratioMinor = minorSeverities.length / nombreDeLigne;
    const ratioMajeur = majorSeverities.length / nombreDeLigne;
    const ratioCritical = criticalSeverities.length / nombreDeLigne;
    const ratioBlocker = blockerSeverities.length / nombreDeLigne;

    console.log(ratioMinor, ratioMajeur, ratioCritical, ratioBlocker);

    if (blockerSeverities.length >= 1) {
      rate = { letter: 'E', percentage: '0' };
    } else if (
      ratioMinor >= 0.08 ||
      majorSeverities.length >= 10 ||
      criticalSeverities.length >= 1
    ) {
      rate = { letter: 'D', percentage: '25' };
    } else if (
      (minorSeverities.length >= 10 && minorSeverities.length <= 19) ||
      majorSeverities.length >= 1
    ) {
      rate = { letter: 'C', percentage: '50' };
    } else if (
      minorSeverities.length >= 1 &&
      minorSeverities.length <= 9 &&
      majorSeverities.length === 0 &&
      criticalSeverities.length === 0
    ) {
      rate = { letter: 'B', percentage: '75' };
    }
    return rate;
  }
}
