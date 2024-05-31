import { componentsUrl, issuesUrl, measuresURL, rulesUrl } from './apiUrls';

export const issuesStoreKey = `${issuesUrl}/search`;
export const totalAppCodeLinesStoreKey = `${measuresURL}/component/total/ncloc`;
export const rulesStoreKey = `${rulesUrl}/search`;
export const dirComponentsStoreKey = `${componentsUrl}/tree/dir`;
export const fileComponentsStoreKey = `${componentsUrl}/tree/fil`;
export const numberIssuesOfEachRuleStoreKey = `${issuesUrl}/search&facets=rules`;
export const minorIssuesProjectStoreKey = `${issuesUrl}/search/severity/minor`;
export const majorIssuesProjectStoreKey = `${issuesUrl}/search/severity/major`;
export const criticalIssuesProjectStoreKey = `${issuesUrl}/search/severity/critical`;
export const blockerIssuesProjectStoreKey = `${issuesUrl}/search/severity/blocker`;
export const javaComponentsStoreKey = `${measuresURL}/component_tree/java`;
export const findTreeStoreKey = `${componentsUrl}/tree/root`;
