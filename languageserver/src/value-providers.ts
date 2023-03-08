import {ValueProviderConfig} from "@github/actions-languageservice";
import {WorkflowContext} from "@github/actions-languageservice/context/workflow-context";
import {ValueProviderKind} from "@github/actions-languageservice/value-providers/config";
import {Octokit} from "@octokit/rest";
import {RepositoryContext} from "./initializationOptions";
import {TTLCache} from "./utils/cache";
import {getActionInputValues} from "./value-providers/action-inputs";
import {getEnvironments} from "./value-providers/job-environment";
import {getRunnerLabels} from "./value-providers/runs-on";

export function valueProviders(
  client: Octokit | undefined,
  repo: RepositoryContext | undefined,
  cache: TTLCache
): ValueProviderConfig {
  if (!repo || !client) {
    return {};
  }

  return {
    "job-environment": {
      kind: ValueProviderKind.AllowedValues,
      caseInsensitive: true,
      get: (_: WorkflowContext) => getEnvironments(client, cache, repo.owner, repo.name)
    },
    "job-environment-name": {
      kind: ValueProviderKind.AllowedValues,
      caseInsensitive: true,
      get: (_: WorkflowContext) => getEnvironments(client, cache, repo.owner, repo.name)
    },
    "runs-on": {
      kind: ValueProviderKind.SuggestedValues,
      get: (_: WorkflowContext) => getRunnerLabels(client, cache, repo.owner, repo.name)
    },
    "step-with": {
      kind: ValueProviderKind.AllowedValues,
      get: (context: WorkflowContext) => getActionInputValues(client, cache, context)
    }
  };
}
