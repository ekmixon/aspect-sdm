import { GitCommandGitProject, Project } from "@atomist/automation-client";
import { GitHubRepoRef } from "@atomist/automation-client/lib/operations/common/GitHubRepoRef";
import { DirectoryManager } from "@atomist/automation-client/lib/spi/clone/DirectoryManager";
import { Cloner, GitHubSearchResult } from "./GitHubSpider";

/**
 * Cloner implementation using GitCommandGitProject directly
 */
export class GitCommandGitProjectCloner implements Cloner {

    public async clone(sourceData: GitHubSearchResult): Promise<Project> {
        return GitCommandGitProject.cloned(
            process.env.GITHUB_TOKEN ? { token: process.env.GITHUB_TOKEN } : undefined,
            GitHubRepoRef.from({
                owner: sourceData.owner.login,
                repo: sourceData.name,
                rawApiBase: "https://api.github.com", // for GitHub Enterprise, make this something like github.yourcompany.com/api/v3
            }), {
                alwaysDeep: false,
                noSingleBranch: true,
                depth: 1,
            },
            this.directoryManager);
    }

    public constructor(private readonly directoryManager: DirectoryManager) {}
}