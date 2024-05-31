export default class TagIssues {
  constructor(
    tag,
    tagRules,
    rulesWithIssues,
    affectedRules,
    optimizedRules,
    minorIssues,
    majorIssues,
    criticalIssues,
    cercleStyle,
  ) {
    this.tag = tag;
    this.tagRules = tagRules;
    this.rulesWithIssues = rulesWithIssues;
    this.affectedRules = affectedRules;
    this.optimizedRules = optimizedRules;
    this.minorIssues = minorIssues;
    this.majorIssues = majorIssues;
    this.criticalIssues = criticalIssues;
    this.cercleStyle = cercleStyle;
  }
}
