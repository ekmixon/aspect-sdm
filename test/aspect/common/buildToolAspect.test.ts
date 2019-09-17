/*
 * Copyright © 2019 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    InMemoryProject,
    Project,
} from "@atomist/automation-client";
import { ClassificationData } from "@atomist/sdm-pack-aspect";
import { FP } from "@atomist/sdm-pack-fingerprint";
import * as assert from "assert";
import { BuildToolAspect } from "../../../lib/aspect/common/buildToolAspect";
import { FrameworkAspect } from "../../../lib/aspect/common/frameworkAspect";

describe("buildToolAspect", () => {

    describe("ivy", () => {
        it("tags Ivy", async () => {
            const p = InMemoryProject.of({path: "ivy.xml", content: ""});
            const fp = await doExtract(p);
            return assert.deepStrictEqual(fp.data.tags, ["ivy"]);
        });
    });

});

async function doExtract(p: Project): Promise<FP<ClassificationData>> {
    return BuildToolAspect.extract(p, undefined) as any;
}
