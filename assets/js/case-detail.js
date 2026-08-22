(() => {
  "use strict";

  const DEFAULT_LOCALE = "zh-CN";
  const SUPPORTED_LOCALES = new Set(["zh-CN", "en-US"]);
  const LOCALE_STORAGE_KEY = "portfolio.locale";
  const caseId = document.body.dataset.case;

  const getElement = (selector, root = document) => root.querySelector(selector);

  const setText = (selector, value, root = document) => {
    const element = getElement(selector, root);

    if (element) {
      element.textContent = value;
    }
  };

  const createWorkflowNode = ({ label, type }) => {
    const item = document.createElement("li");
    item.className = `workflow-node workflow-node--${type}`;
    item.dataset.type = type;
    item.textContent = label;
    return item;
  };

  const createItem = (item) => {
    const article = document.createElement("article");
    article.className = `case-item case-item--${item.type || "neutral"}`;

    if (item.label) {
      const label = document.createElement("p");
      label.className = "case-item-label";
      label.textContent = item.label;
      article.append(label);
    }

    const title = document.createElement("h3");
    title.textContent = item.title;

    const body = document.createElement("p");
    body.textContent = item.body;

    article.append(title, body);
    return article;
  };

  const createEvidence = (evidence) => {
    const figure = document.createElement("figure");
    figure.className = "case-evidence";

    const image = document.createElement("img");
    image.src = evidence.image;
    image.alt = evidence.alt;
    image.loading = "lazy";

    const caption = document.createElement("figcaption");

    const label = document.createElement("p");
    label.className = "case-evidence-label";
    label.textContent = evidence.label;

    const title = document.createElement("h3");
    title.textContent = evidence.title;

    const description = document.createElement("p");
    description.textContent = evidence.description;

    caption.append(label, title, description);
    figure.append(image, caption);
    return figure;
  };

  const createSection = (section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "case-section";
    sectionElement.id = section.id;
    sectionElement.dataset.layout = section.layout;

    const header = document.createElement("header");

    const label = document.createElement("p");
    label.className = "case-section-label";
    label.textContent = section.label;

    const title = document.createElement("h2");
    title.id = `${section.id}-title`;
    title.textContent = section.title;

    const summary = document.createElement("p");
    summary.className = "case-section-summary";
    summary.textContent = section.summary;

    header.append(label, title, summary);
    sectionElement.setAttribute("aria-labelledby", title.id);
    sectionElement.append(header);

    if (section.workflow?.length) {
      const workflow = document.createElement("ol");
      workflow.className = "case-workflow";
      workflow.setAttribute("aria-label", section.title);
      workflow.append(...section.workflow.map(createWorkflowNode));
      sectionElement.append(workflow);
    }

    if (section.items?.length) {
      const items = document.createElement("div");
      items.className = "case-items";
      items.append(...section.items.map(createItem));
      sectionElement.append(items);
    }

    if (section.evidence?.length) {
      const evidence = document.createElement("div");
      evidence.className = "case-evidence-group";
      evidence.append(...section.evidence.map(createEvidence));
      sectionElement.append(evidence);
    }

    if (section.note) {
      const note = document.createElement("p");
      note.className = "case-section-note";
      note.textContent = section.note;
      sectionElement.append(note);
    }

    return sectionElement;
  };

  const renderHeader = (header) => {
    const brand = getElement("#case-brand");
    brand.textContent = header.brand;
    brand.href = header.backTarget;

    const backLink = getElement("#case-back-link");
    backLink.textContent = header.backLabel;
    backLink.href = header.backTarget;

    const languageSwitch = getElement("#case-language-switch");
    languageSwitch.textContent = header.languageSwitch.label;
    languageSwitch.dataset.locale = header.languageSwitch.locale;
  };

  const renderHero = (hero) => {
    setText("#case-eyebrow", hero.eyebrow);
    setText("#case-title", hero.title);
    setText("#case-summary", hero.summary);
    getElement("#case-hero-workflow").replaceChildren(
      ...hero.workflow.map(createWorkflowNode)
    );
  };

  const renderFooter = (footer) => {
    setText("#case-footer-label", footer.label);
    const link = getElement("#case-footer-link");
    link.textContent = footer.linkLabel;
    link.href = footer.target;
  };

  const renderPage = (content, locale) => {
    document.documentElement.lang = locale;
    document.title = content.meta.title;
    getElement('meta[name="description"]').content = content.meta.description;

    renderHeader(content.header);
    renderHero(content.hero);
    getElement("#case-sections").replaceChildren(
      ...content.sections.map(createSection)
    );
    renderFooter(content.footer);
  };

  const fetchLocale = async (locale) => {
    const response = await fetch(`../content/cases/${caseId}.${locale}.json`);

    if (!response.ok) {
      throw new Error(`Unable to load case content: ${caseId}, ${locale}`);
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
    const languageSwitch = getElement("#case-language-switch");

    languageSwitch.disabled = true;

    try {
      const content = await fetchLocale(locale);
      renderPage(content, locale);
      saveLocale(locale);
    } catch (error) {
      if (locale !== DEFAULT_LOCALE) {
        await loadLocale(DEFAULT_LOCALE);
      } else {
        console.error("Case content could not be loaded.", error);
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

  const languageSwitch = getElement("#case-language-switch");
  languageSwitch.addEventListener("click", () => {
    loadLocale(languageSwitch.dataset.locale);
  });

  loadLocale(getInitialLocale());
})();
