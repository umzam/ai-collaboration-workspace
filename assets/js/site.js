(() => {
  "use strict";

  const DEFAULT_LOCALE = "zh-CN";
  const SUPPORTED_LOCALES = new Set(["zh-CN", "en-US"]);
  const LOCALE_STORAGE_KEY = "portfolio.locale";
  let initialHashHandled = false;

  const getElement = (selector, root = document) => root.querySelector(selector);

  const setText = (selector, value, root = document) => {
    const element = getElement(selector, root);

    if (element) {
      element.textContent = value;
    }
  };

  const setOptionalText = (selector, value, root = document) => {
    const element = getElement(selector, root);

    if (element) {
      element.textContent = value;
      element.hidden = !value;
    }
  };

  const createWorkflowNode = ({ label, type, substeps = [] }) => {
    const item = document.createElement("li");
    item.className = `workflow-node workflow-node--${type}`;
    item.dataset.type = type;

    const mainLabel = document.createElement("span");
    mainLabel.className = "workflow-node-label";
    mainLabel.textContent = label;
    item.append(mainLabel);

    if (substeps.length) {
      item.classList.add("workflow-node--layered");

      const substepList = document.createElement("ul");
      substepList.className = "workflow-node-substeps";

      substeps.forEach((substep) => {
        const substepItem = document.createElement("li");
        substepItem.textContent = substep;
        substepList.append(substepItem);
      });

      item.append(substepList);
    }

    return item;
  };

  const renderWorkflowNodes = (container, nodes) => {
    container.classList.toggle(
      "workflow--layered",
      nodes.some((node) => node.substeps?.length)
    );
    container.replaceChildren(...nodes.map(createWorkflowNode));
  };

  const resolveTarget = (target) => `#${target}`;

  const createContentLink = ({ label, target }) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = resolveTarget(target);
    link.textContent = label;
    item.append(link);
    return item;
  };

  const renderLinks = (container, links) => {
    container.replaceChildren(...links.map(createContentLink));
  };

  const renderHeader = (header) => {
    setText("#header-brand", header.brand);

    const languageSwitch = getElement("#language-switch");
    languageSwitch.textContent = header.languageSwitch.label;
    languageSwitch.dataset.locale = header.languageSwitch.locale;
  };

  const renderHero = (hero) => {
    setText("#hero-title", hero.title);
    setText("#hero-core-value", hero.coreValue);
    setText("#hero-supporting-text", hero.supportingText);
    setText("#hero-task-nature", hero.workflow.taskNature);
    setText("#hero-human-gate-label", hero.workflow.humanGate.label);
    setText("#hero-human-gate-text", hero.workflow.humanGate.text);

    const workflow = getElement("#hero-workflow");
    workflow.setAttribute("aria-label", hero.workflow.taskNature);

    const paths = hero.workflow.paths.map((pathNode, index) => {
      const row = document.createElement("div");
      row.className = "hero-workflow-path";

      const pathList = document.createElement("ol");
      const nodes = [pathNode];
      const collaborationNode = hero.workflow.collaborationModes[index];

      if (collaborationNode) {
        nodes.push(collaborationNode);
      }

      renderWorkflowNodes(pathList, nodes);
      row.append(pathList);
      return row;
    });

    getElement("#hero-workflow-paths").replaceChildren(...paths);
  };

  const findLaneLink = (lane, footer) => {
    const links = [
      ...footer.collaborationModeLinks,
      ...footer.caseStudyLinks
    ];

    return links.find((link) => link.label === lane.name);
  };

  const renderLane = (key, lane, footer) => {
    const laneElement = getElement(`[data-lane="${key}"]`);
    const laneLink = findLaneLink(lane, footer);

    setText('[data-field="number"]', lane.number, laneElement);
    setText('[data-field="modeLabel"]', lane.modeLabel, laneElement);
    setText('[data-field="taskNature"]', lane.taskNature, laneElement);
    setText('[data-field="collaborationMode"]', lane.collaborationMode, laneElement);

    const name = getElement('[data-field="name"]', laneElement);
    const nameContent = laneLink
      ? Object.assign(document.createElement("a"), {
          href: resolveTarget(laneLink.target),
          textContent: lane.name
        })
      : document.createTextNode(lane.name);

    name.replaceChildren(nameContent);

    laneElement.id = `${key}-lane`;

    const workflow = getElement('[data-field="workflow"]', laneElement);

    if (workflow) {
      workflow.hidden = !lane.workflow?.length;
    }

    if (workflow && lane.workflow?.length) {
      renderWorkflowNodes(workflow, lane.workflow);
    }

  };

  const renderCollaborationModes = (collaborationModes, footer) => {
    setText("#collaboration-modes-title", collaborationModes.title);
    setText("#collaboration-modes-introduction", collaborationModes.introduction);

    ["exploration", "structured", "creative"].forEach((key) => {
      renderLane(key, collaborationModes[key], footer);
    });
  };

  const createDetailBlock = (className, label, text) => {
    const block = document.createElement("div");
    block.className = `workspace-detail ${className}`;

    const blockLabel = document.createElement("p");
    blockLabel.className = "workspace-detail-label";
    blockLabel.textContent = label;

    const blockText = document.createElement("p");
    blockText.className = "workspace-detail-text";
    blockText.textContent = text;

    block.append(blockLabel, blockText);
    return block;
  };

  const createWorkspaceEvidence = (evidence) => {
    const element = document.createElement(evidence.image ? "figure" : "article");
    element.className = `workspace-evidence workspace-evidence--${evidence.kind || "artifact"}`;
    element.dataset.evidenceKind = evidence.kind || "artifact";

    if (evidence.image) {
      const image = document.createElement("img");
      image.src = evidence.image;
      image.alt = evidence.alt;
      image.loading = "lazy";
      element.append(image);
    }

    const caption = document.createElement(evidence.image ? "figcaption" : "div");
    caption.className = "workspace-evidence-caption";

    const label = document.createElement("p");
    label.className = "workspace-detail-label";
    label.textContent = evidence.label;

    const title = document.createElement("h3");
    title.textContent = evidence.title;

    const description = document.createElement("p");
    description.textContent = evidence.description;

    caption.append(label);

    if (evidence.title) {
      caption.append(title);
    }

    if (evidence.description) {
      caption.append(description);
    }

    if (evidence.groups?.length) {
      const comparison = document.createElement("div");
      comparison.className = "workspace-evidence-comparison";

      evidence.groups.forEach((group) => {
        const groupElement = document.createElement("div");
        groupElement.className = "workspace-evidence-comparison-group";

        const groupLabel = document.createElement("p");
        groupLabel.className = "workspace-detail-label";
        groupLabel.textContent = group.label;

        const heading = document.createElement("h3");
        heading.textContent = group.heading;

        const items = document.createElement("ul");
        group.items.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          items.append(listItem);
        });

        groupElement.append(groupLabel, heading, items);
        comparison.append(groupElement);
      });

      caption.append(comparison);
    }

    element.append(caption);
    return element;
  };

  const createMethodGroup = (group) => {
    const container = document.createElement("div");
    container.className = "workspace-method-group";

    const label = document.createElement("p");
    label.className = "workspace-detail-label";
    label.textContent = group.label;

    const list = document.createElement("ul");

    group.items.forEach((item) => {
      const listItem = document.createElement("li");

      if (item.title) {
        const title = document.createElement("strong");
        title.textContent = item.title;
        listItem.append(title);
      }

      const text = document.createElement("span");
      text.textContent = item.text;
      listItem.append(text);
      list.append(listItem);
    });

    container.append(label, list);
    return container;
  };

  const createSkillArchitecture = (architecture) => {
    const container = document.createElement("div");
    container.className = "workspace-detail workspace-architecture";

    const label = document.createElement("p");
    label.className = "workspace-detail-label";
    label.textContent = architecture.label;

    const introduction = document.createElement("p");
    introduction.className = "workspace-architecture-introduction";
    introduction.textContent = architecture.introduction;

    const layerElements = new Map();

    architecture.layers.forEach((layer) => {
      const item = document.createElement("article");
      item.className = "workspace-architecture-layer";
      item.dataset.layer = layer.role;

      const number = document.createElement("span");
      number.className = "workspace-architecture-layer-number";
      number.textContent = layer.number;

      const name = document.createElement("h3");
      name.textContent = layer.name;

      const responsibility = document.createElement("p");
      responsibility.className = "workspace-architecture-responsibility";
      responsibility.textContent = layer.responsibility;

      const condition = document.createElement("p");
      condition.className = "workspace-architecture-condition";
      condition.textContent = layer.condition;

      item.append(number, name, responsibility, condition);
      layerElements.set(layer.role, item);
    });

    const createConnector = (direction = "horizontal") => {
      const connector = document.createElement("span");
      connector.className = `workspace-architecture-connector workspace-architecture-connector--${direction}`;
      connector.textContent = direction === "vertical" ? "↓" : "→";
      connector.setAttribute("aria-hidden", "true");
      return connector;
    };

    const createRoutingNode = (text, modifier) => {
      const node = document.createElement("p");
      node.className = `workspace-architecture-routing-node workspace-architecture-routing-node--${modifier}`;
      node.textContent = text;
      return node;
    };

    const map = document.createElement("div");
    map.className = "workspace-architecture-map";

    const layerStack = document.createElement("div");
    layerStack.className = "workspace-architecture-layers";
    architecture.layers.forEach((layer) => {
      layerStack.append(layerElements.get(layer.role));
    });

    const mainPath = document.createElement("div");
    mainPath.className = "workspace-architecture-main-path";
    mainPath.append(
      createRoutingNode(
        `${layerElements.get("core").querySelector("h3").textContent} + ${layerElements.get("platform").querySelector("h3").textContent}`,
        "source"
      ),
      createConnector(),
      createRoutingNode(architecture.routing.decision, "decision")
    );

    const boundary = document.createElement("aside");
    boundary.className = "workspace-architecture-boundary";

    const boundaryLabel = document.createElement("p");
    boundaryLabel.className = "workspace-detail-label";
    boundaryLabel.textContent = architecture.boundary.label;

    const boundaryText = document.createElement("p");
    boundaryText.textContent = architecture.boundary.text;

    boundary.append(boundaryLabel, boundaryText);

    const branches = document.createElement("div");
    branches.className = "workspace-architecture-branches";

    const determinedBranch = document.createElement("div");
    determinedBranch.className = "workspace-architecture-branch workspace-architecture-branch--determined";
    determinedBranch.append(
      createRoutingNode(architecture.routing.determined, "determined"),
      createConnector(),
      createRoutingNode(architecture.routing.confirmed, "confirmed")
    );

    const humanBranch = document.createElement("div");
    humanBranch.className = "workspace-architecture-branch workspace-architecture-branch--human";
    humanBranch.append(
      boundary,
      createConnector(),
      createRoutingNode(architecture.routing.confirmed, "confirmed")
    );
    branches.append(determinedBranch, humanBranch);

    const outputPath = document.createElement("div");
    outputPath.className = "workspace-architecture-output-path";
    outputPath.append(
      createRoutingNode(
        layerElements.get("company").querySelector("h3").textContent,
        "company"
      ),
      createConnector(),
      createRoutingNode(architecture.routing.output, "output")
    );

    map.append(layerStack, mainPath, branches, outputPath);
    container.append(label, introduction, map);
    return container;
  };

  const createSectionTransition = (target) => {
    const transitionAssets = {
      "exploration": {
        kind: "stars",
        src: "assets/images/transitions/star-trail-v4-wide.png"
      },
      "prototype-to-prd": {
        kind: "staff",
        src: "assets/images/transitions/music-staff-treble.svg"
      },
      "reference-to-style": {
        kind: "stars-reverse",
        src: "assets/images/transitions/star-trail-v4-wide.png"
      }
    };

    const asset = transitionAssets[target];

    if (!asset) {
      return null;
    }

    const transition = document.createElement("div");
    transition.className = `section-transition section-transition--${asset.kind}`;
    transition.setAttribute("aria-hidden", "true");

    const image = document.createElement("img");
    image.src = asset.src;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";

    transition.append(image);
    return transition;
  };

  const createWorkspaceSection = (section) => {
    const sectionButtonAssets = {
      "exploration": "assets/images/transitions/button-01-cloud-cutout.png",
      "prototype-to-prd": "assets/images/transitions/button-02-fish-cutout.png",
      "reference-to-style": "assets/images/transitions/button-03-butterfly-cutout.png"
    };
    const sectionElement = document.createElement("section");
    sectionElement.className = `workspace-section workspace-section--${section.kind}`;
    sectionElement.id = section.target;

    const header = document.createElement("header");
    const eyebrow = document.createElement("p");
    eyebrow.className = "workspace-section-eyebrow";

    const buttonAsset = sectionButtonAssets[section.target];

    if (buttonAsset) {
      const button = document.createElement("img");
      button.className = "workspace-section-button";
      button.src = buttonAsset;
      button.alt = "";
      button.setAttribute("aria-hidden", "true");
      eyebrow.append(button);
    }

    const eyebrowText = document.createElement("span");
    eyebrowText.textContent = section.eyebrow;
    eyebrow.append(eyebrowText);

    const title = document.createElement("h2");
    title.id = `${section.target}-title`;
    title.textContent = section.title;

    const introduction = document.createElement("p");
    introduction.className = "workspace-section-introduction";
    introduction.textContent = section.introduction;

    header.append(eyebrow, title);

    if (section.introduction) {
      header.append(introduction);
    }
    sectionElement.setAttribute("aria-labelledby", title.id);

    const content = document.createElement("div");
    content.className = "workspace-section-content";
    content.append(
      createDetailBlock("workspace-problem", section.problem.label, section.problem.text)
    );

    if (section.goal) {
      content.append(
        createDetailBlock("workspace-goal", section.goal.label, section.goal.text)
      );
    }

    const architecture = section.architecture
      ? createSkillArchitecture(section.architecture)
      : null;

    if (architecture && section.target !== "prototype-to-prd") {
      content.append(architecture);
    }

    const method = document.createElement("div");
    method.className = "workspace-detail workspace-method";

    const methodLabel = document.createElement("p");
    methodLabel.className = "workspace-detail-label";
    methodLabel.textContent = section.method.label;

    const workflow = document.createElement("ol");
    workflow.className = "workspace-detail-workflow";
    renderWorkflowNodes(workflow, section.method.workflow);

    method.append(methodLabel, workflow);

    if (section.method.groups.length) {
      const groups = document.createElement("div");
      groups.className = "workspace-method-groups";
      groups.append(...section.method.groups.map(createMethodGroup));
      method.append(groups);
    }

    content.append(method);

    if (section.evidence.length) {
      const evidenceGroup = document.createElement("div");
      evidenceGroup.className = "workspace-evidence-group";
      evidenceGroup.append(...section.evidence.map(createWorkspaceEvidence));

      if (section.target === "prototype-to-prd") {
        const evidenceRouting = document.createElement("div");
        evidenceRouting.className = "workspace-evidence-routing";
        evidenceRouting.append(evidenceGroup);

        if (architecture) {
          evidenceRouting.append(architecture);
        }

        content.insertBefore(evidenceRouting, method);
      } else {
        content.append(evidenceGroup);
      }
    } else if (architecture && section.target === "prototype-to-prd") {
      content.insertBefore(architecture, method);
    }

    content.append(
      createDetailBlock("workspace-result", section.result.label, section.result.text)
    );

    const transition = createSectionTransition(section.target);

    if (transition) {
      sectionElement.append(transition);
    }

    sectionElement.append(header, content);
    return sectionElement;
  };

  const renderWorkspaceSections = (sections) => {
    const explorationSections = sections.filter((section) => section.kind === "mode");
    const caseSections = sections.filter((section) => section.kind === "case");

    getElement("#exploration-section").replaceChildren(
      ...explorationSections.map(createWorkspaceSection)
    );

    getElement("#workspace-sections").replaceChildren(
      ...caseSections.map(createWorkspaceSection)
    );
  };

  const renderPrincipleSpace = (selector, space) => {
    const container = getElement(selector);
    const principleButtonAssets = {
      "#ai-space": "assets/images/transitions/button-shared-structured-flower.png",
      "#human-space": "assets/images/transitions/button-shared-creative-apple.png"
    };
    setText('[data-field="heading"]', space.heading, container);
    setOptionalText('[data-field="description"]', space.description, container);

    const buttonAsset = principleButtonAssets[selector];

    if (buttonAsset) {
      const button = document.createElement("img");
      button.className = "principle-space-button";
      button.src = buttonAsset;
      button.alt = "";
      button.setAttribute("aria-hidden", "true");
      getElement('[data-field="heading"]', container).prepend(button);
    }

    const verbs = space.verbs.map((verb) => {
      const item = document.createElement("li");
      item.textContent = verb;
      return item;
    });

    getElement('[data-field="verbs"]', container).replaceChildren(...verbs);
  };

  const renderSharedPrinciple = (sharedPrinciple) => {
    setText("#shared-principle-title", sharedPrinciple.title);
    setOptionalText("#shared-principle-introduction", sharedPrinciple.introduction);
    setOptionalText("#closing-principle", sharedPrinciple.closingPrinciple);

    renderPrincipleSpace("#ai-space", sharedPrinciple.aiSpace);
    renderPrincipleSpace("#human-space", sharedPrinciple.humanSpace);

    const humanGate = getElement("#principle-human-gate");
    setText('[data-field="label"]', sharedPrinciple.humanGate.label, humanGate);
    setText('[data-field="text"]', sharedPrinciple.humanGate.text, humanGate);
  };

  const renderFooter = (footer) => {
    setText("#footer-brand", footer.brand);
    setText("#footer-closing-statement", footer.closingStatement);
    renderLinks(getElement("#footer-mode-links"), footer.collaborationModeLinks);
    renderLinks(getElement("#footer-case-links"), footer.caseStudyLinks);
  };

  const renderPage = (content, locale) => {
    document.documentElement.lang = locale;
    document.title = content.header.brand;
    getElement('meta[name="description"]').content = content.hero.coreValue;

    renderHeader(content.header);
    renderHero(content.hero);
    renderCollaborationModes(content.collaborationModes, content.footer);
    renderWorkspaceSections(content.expandedSections);
    renderSharedPrinciple(content.sharedPrinciple);
    renderFooter(content.footer);
  };

  const restoreInitialHash = () => {
    if (initialHashHandled) {
      return;
    }

    initialHashHandled = true;

    const targetId = window.location.hash.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;

    if (target) {
      window.requestAnimationFrame(() => target.scrollIntoView());
    }
  };

  const fetchLocale = async (locale) => {
    const response = await fetch(`content/${locale}.json`);

    if (!response.ok) {
      throw new Error(`Unable to load locale: ${locale}`);
    }

    return response.json();
  };

  const saveLocale = (locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch (error) {
      console.warn("Locale preference could not be saved.", error);
    }
  };

  const loadLocale = async (requestedLocale) => {
    const locale = SUPPORTED_LOCALES.has(requestedLocale)
      ? requestedLocale
      : DEFAULT_LOCALE;
    const languageSwitch = getElement("#language-switch");

    languageSwitch.disabled = true;

    try {
      const content = await fetchLocale(locale);
      renderPage(content, locale);
      restoreInitialHash();
      saveLocale(locale);
    } catch (error) {
      if (locale !== DEFAULT_LOCALE) {
        await loadLocale(DEFAULT_LOCALE);
      } else {
        console.error("Homepage content could not be loaded.", error);
      }
    } finally {
      languageSwitch.disabled = false;
    }
  };

  const getInitialLocale = () => {
    try {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

      if (SUPPORTED_LOCALES.has(savedLocale)) {
        return savedLocale;
      }
    } catch (error) {
      console.warn("Locale preference could not be read.", error);
    }

    return navigator.language.toLowerCase().startsWith("zh")
      ? "zh-CN"
      : "en-US";
  };

  const languageSwitch = getElement("#language-switch");
  languageSwitch.addEventListener("click", () => {
    loadLocale(languageSwitch.dataset.locale);
  });

  loadLocale(getInitialLocale());
})();
