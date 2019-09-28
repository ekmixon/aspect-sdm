import { adjustBy, commonScorers, RepositoryScorer } from "@atomist/sdm-pack-aspect";
import * as idioms from "./spring/idioms";
import { DefaultPackageJavaFiles, JspFiles } from "./aspects";
import { XmlBeanDefinitions } from "./spring/xmlBeans";

export function createScorers(): RepositoryScorer[] {
    const allScorers = [
        // Penalize for not enough known about this repository
        commonScorers.anchorScoreAt(3),
        ...generalScorers(),
        ...springIdiomScorers(),
        ...springTwelveFactorScorers(),
    ];
    return allScorers;
}

export function generalScorers(): RepositoryScorer[] {
    return [
        commonScorers.penalizeForExcessiveBranches({ branchLimit: 5 }),
        commonScorers.requireRecentCommit({ days: 10 }),
    ];
}

export function springIdiomScorers(): RepositoryScorer[] {
    return [
        ...commonScorers.penalizeForAllReviewViolations({
            reviewerNames: [
                idioms.NonSpecificMvcAnnotationName,
                idioms.HardCodedPropertyName,
                idioms.DotStarUsageName,
                idioms.MutableInjectionUsageName,
            ],
            violationsPerPointLost: 2,
        }),
        commonScorers.penalizeGlobMatches({ type: XmlBeanDefinitions.name, pointsLostPerMatch: 2 }),
        commonScorers.penalizeGlobMatches({ type: JspFiles.name, pointsLostPerMatch: 2 }),
        commonScorers.penalizeGlobMatches({ type: DefaultPackageJavaFiles.name, pointsLostPerMatch: 3 }),
    ];
}

export function springTwelveFactorScorers(): RepositoryScorer[] {
    return [
        commonScorers.penalizeForReviewViolations({
            reviewerName: idioms.FileIOUsageName,
            violationsPerPointLost: 2,
        }),
    ];
}
