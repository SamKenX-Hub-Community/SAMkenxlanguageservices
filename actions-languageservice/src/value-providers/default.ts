import {WorkflowContext} from "../context/workflow-context";
import {ValueProviderConfig, ValueProviderKind} from "./config";
import {needs} from "./needs";
import {reusableJobInputs} from "./reusable-job-inputs";
import {stringsToValues} from "./strings-to-values";

export const defaultValueProviders: ValueProviderConfig = {
  needs: {
    kind: ValueProviderKind.AllowedValues,
    get: needs
  },
  "workflow-job-with": {
    kind: ValueProviderKind.AllowedValues,
    get: async context => reusableJobInputs(context)
  },
  "runs-on": {
    kind: ValueProviderKind.SuggestedValues,
    get: async (_: WorkflowContext) =>
      stringsToValues([
        "ubuntu-latest",
        "ubuntu-22.04",
        "ubuntu-20.04",
        "ubuntu-18.04",
        "windows-latest",
        "windows-2022",
        "windows-2019",
        "macos-latest",
        "macos-12",
        "macos-11",
        "macos-10.15",
        "self-hosted"
      ])
  }
};
