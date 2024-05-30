export default class Bloc {
  constructor(
    key,
    numberOfLines,
    blocName,
    numberOfErrors,
    color,
    blocSize,
    blocType,
    path,
    minorIssues,
    majorIssues,
    criticalIssues,
  ) {
    this.key = key;
    this.numberOfLines = numberOfLines;
    this.blocName = blocName;
    this.numberOfErrors = numberOfErrors;
    this.color = color;
    this.blocSize = blocSize;
    this.blocType = blocType;
    this.path = path;
    this.minorIssues = minorIssues;
    this.majorIssues = majorIssues;
    this.criticalIssues = criticalIssues;
  }
}
