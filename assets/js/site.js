(() => {
  "use strict";

  const DEFAULT_LOCALE = "zh-CN";
  const SUPPORTED_LOCALES = new Set(["zh-CN", "en-US"]);
  const LOCALE_STORAGE_KEY = "portfolio.locale";

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

  const createWorkflowNode = ({ label, type }) => {
    const item = document.createElement("li");
    item.className = `workflow-node workflow-node--${type}`;
    item.dataset.type = type;
    item.textContent = label;
    return item;
  };

  const renderWorkflowNodes = (container, nodes) => {
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
    renderLinks(getElement("#header-navigation"), header.navigation);

    const modesNavigation = header.navigation.find(
      (item) => item.target === "collaborationModes"
    );

    if (modesNavigation) {
      getElement("#collaborationModes").setAttribute(
        "aria-label",
        modesNavigation.label
      );
    }

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

    if (workflow && lane.workflow) {
      renderWorkflowNodes(workflow, lane.workflow);
    }

  };

  const renderCollaborationModes = (collaborationModes, footer) => {
    setText("#collaboration-modes-title", collaborationModes.title);
    setText("#collaboration-modes-introduction", collaborationModes.introduction);
    setText("#case-evidence-heading", collaborationModes.structured.evidenceLabel);

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

  const createWorkspaceSection = (section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = `workspace-section workspace-section--${section.kind}`;
    sectionElement.id = section.target;

    const header = document.createElement("header");
    const eyebrow = document.createElement("p");
    eyebrow.className = "workspace-section-eyebrow";
    eyebrow.textContent = section.eyebrow;

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
        content.insertBefore(evidenceGroup, method);
      } else {
        content.append(evidenceGroup);
      }
    }

    content.append(
      createDetailBlock("workspace-result", section.result.label, section.result.text)
    );

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
    setText('[data-field="heading"]', space.heading, container);
    setOptionalText('[data-field="description"]', space.description, container);

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
