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

import { projectClassificationAspect } from "@atomist/sdm-pack-aspect";
import { Aspect } from "@atomist/sdm-pack-fingerprint";
import { isSpringBootStarterFingerprint } from "./springBootStarter";
import { isXmlBeanDefinitionsFingerprint } from "./xmlBeans";

/**
 * Classification Spring projects
 * @type {ClassificationAspect}
 */
export const SpringClassificationAspect: Aspect = projectClassificationAspect(
    {
        name: "spring-boot-classification",
        // Deliberately don't display
        displayName: undefined,
        toDisplayableFingerprintName: () => "Spring classification",
    },
    {
        tags: "spring-security",
        reason: "has spring security",
        testFingerprints: async fps => fps.some(fp => isSpringBootStarterFingerprint(fp) && fp.data.artifact === "spring-boot-starter-security"),
    },
    {
        tags: "actuator",
        reason: "has spring boot actuator",
        testFingerprints: async fps => fps.some(fp => isSpringBootStarterFingerprint(fp) && fp.data.artifact === "spring-boot-starter-actuator"),
    },
    {
        tags: "spring-xml",
        reason: "uses spring XML",
        testFingerprints: async fps => fps.some(fp => isXmlBeanDefinitionsFingerprint(fp) && fp.data.matches.length > 0),
    },
);