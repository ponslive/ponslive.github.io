// Single source of truth for site content. Facts only from the site and résumé.
window.PROFILE = {
  name: 'Ponmudi Pandiyan',
  title: 'Distinguished Engineer · Product & Platform Leader',
  employer: 'Verizon',
  location: 'New Jersey, USA',
  email: 'mail2pons@gmail.com',
  hometown: 'Madurai, Tamil Nadu',
  linkedin: 'https://www.linkedin.com/in/ponmudi-pandiyan/',
  positioning: 'Engineering and product leader with 20+ years across software, telecom and AI, leading the certification, diagnostics and AI platforms behind a national wireless network.',
  impact: { lead: 'Four platforms, one through-line.', lines: ['Certification that once took months now takes weeks.', 'Diagnostics that reach all the way down to the modem.', 'Answers that arrive the moment someone asks.'], close: 'Twenty years of building, and the work now speaks in outcomes.' },
  summary: [
    '20+ years in software development, the telecommunications industry and AI-driven solutions, specialising in solution architecture, device diagnostics, analytics, web technologies and advanced network systems.',
    'Architects and manages enterprise-scale compliance and diagnostic platforms, including Verizon’s certification and analytics systems: multi-component solutions spanning client apps, servers, portals and big-data ecosystems that give network engineers geographically detailed KPI visualisation.',
    'Deep background in 3G/4G/5G end-to-end wireless systems, architectures and protocols, and how emerging technologies affect network elements and performance.',
    'Hands-on with AWS cloud migration, microservice architectures and AI initiatives for network KPI analytics, diagnostics and workflow automation.'
  ],

  // Plain-language summary for the top of Career.
  about: {
    who: 'An engineering and product leader who turns complex device and network data into products teams actually use.',
    now: 'Today I own the analytics & AI platform and device diagnostics at Verizon \u2014 device dashboards, an AI knowledge assistant and a tool that represents network KPIs and analytics.',
    how: 'I lead from architecture to adoption: I design the system, build alongside the team, and stay with it until field engineers and support teams rely on it.',
    strengths: ['Device certification & conformance', 'Diagnostics & network KPI analytics', 'AI-native engineering with Claude Code', 'Platform architecture on AWS', 'Product ownership & roadmaps']
  },
  signature: {
    name: 'AI-native engineering',
    line: 'Builds with Claude Code and agentic AI workflows \u2014 from architecture to shipped product \u2014 multiplying a small team\u2019s output.',
    tags: ['Claude Code', 'Agentic workflows', 'Prompt & context engineering', 'MCP integrations', 'AI-assisted code review']
  },
  headline: [
    { value: '20+', label: 'years in software, telecom and AI' },
    { value: '4', label: 'enterprise platforms built at Verizon' },
    { value: 'Months \u2192 weeks', label: 'device certification cycles' },
    { value: 'Self-service', label: 'certification for OEMs' },
    { value: 'Modem-level', label: 'diagnostics across the field fleet' },
    { value: 'Instant', label: 'AI answers for support teams' },
    { value: 'LTE \u00b7 5G \u00b7 IoT', label: 'device classes certified' }
  ],

  // Reverse chronological. start/end are 'YYYY-MM'; end null = present.
  roles: [
    { id: 'dmts-diag', org: 'Verizon Wireless', title: 'Distinguished Member of Technical Staff — Product Manager', focus: 'Device Diagnostics & Analytics', start: '2024-11', end: null, era: 'intelligence',
      stack: ['AWS', 'Kafka', 'Elasticsearch', 'Grafana', 'MQTT', 'OMADM', 'TypeScript', 'Angular', 'NodeJS', 'AI/ML', 'Gen AI', 'LLaMA-RAG', 'Vector DB'],
      points: [
        'Architected and led the evolution of a multi-component diagnostics and analytics platform spanning client apps, servers and portals.',
        'Automated log collection from Android, iOS and network scanners, with big-data pipelines post-processing them into actionable insight.',
        'Designed geographical KPI visualisation that lets network engineers monitor and improve performance.',
        'Led AI-driven initiatives: a tool that represents network KPIs and analytics, AI-assisted diagnostics and an AI knowledge assistant.',
        'Partnered with data engineering on Fixed Wireless Access (FWA) analysis.',
        'Built a user-engagement platform to streamline feedback and adoption; solution architect for scalability and integration in production.'
      ] },
    { id: 'dmts-cert', org: 'Verizon Wireless', title: 'Distinguished Member of Technical Staff — Product Manager', focus: 'Certification Tools', start: '2022-06', end: '2024-11', era: 'network',
      stack: ['Kafka', 'Angular', 'NodeJS', 'MongoDB', 'AWS', 'LWM2M', 'OMADM', '3GPP', 'LTE', '5G NR', 'eUICC', 'RSP', 'LPA', 'SM-DS', 'SMDP+'],
      points: [
        'Moved into product leadership, owning strategy and vision for next-generation diagnostic and automated test tools.',
        'Brought AWS microservices, LWM2M, OMADM and APN configuration into the tooling for field operations and manufacturers.',
        'Added real-time analysis and troubleshooting to the low-category device diagnostics tool for low-power and IoT devices.',
        'Owned the full lifecycle from concept to deployment; ran training and knowledge transfer for adopting teams.',
        'Delivered certification automation across LTE, 5G and IoT that cut release cycles from months to weeks.'
      ] },
    { id: 'principal', org: 'Verizon Wireless', title: 'Principal Engineer', focus: 'Mobile conformance certification \u2014 architect & lead', start: '2019-09', end: '2022-06', era: 'network',
      stack: ['Kafka', 'Angular', 'NodeJS', 'MongoDB', 'AWS', '3GPP', 'LTE', 'OMADM', 'LWM2M', 'CoAP', 'UDP', 'TCP', 'GCF', 'PTCRB'],
      points: [
        'Led architecture of a device testing automation tool integrating 3GPP, OMADM and LWM2M for live-network tests, cutting vendor time-to-market.',
        'Designed low-category device diagnostics over CoAP, UDP and TCP for low-power devices used by field and manufacturing teams.',
        'Designed and deployed scalable AWS solutions for device and network data flow.',
        'Kept devices aligned with GCF/PTCRB certification; led cross-functional teams across geographies.'
      ] },
    { id: 'lfed-cert', org: 'Diversant · client Verizon', title: 'Lead Front-End Developer', focus: 'Device certification tooling', start: '2016-01', end: '2019-09', era: 'interfaces',
      stack: ['Angular', 'TypeScript', 'JavaScript', 'NodeJS', 'ExpressJS', 'MongoDB', 'Kafka', 'MQTT', 'HTML5', 'CSS3', 'LTE', 'eUICC', 'RSP'],
      points: [
        'Architected the certification platform for CAT-M, CAT1 and CAT4+ devices and its requirement tooling.',
        'Built device-subsystem tracking and communication portals; LTE protocol conformance validation.',
        'Worked on RSP acceptance test components: eUICC, LPA, SM-DS and SMDP+.',
        'Cloud architecture with Kafka, MQTT, NodeJS and MongoDB sharding and replicas; UI/UX direction for mobile.'
      ] },
    { id: 'lfed-portal', org: 'Diversant · client Verizon', title: 'Lead Front-End Developer', focus: 'Responsive cloud portal', start: '2014-03', end: '2015-12', era: 'interfaces',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'BackboneJS', 'jQuery', 'SASS', 'JSON'],
      points: [
        'Designed and built a responsive single-page cloud portal for mobile, tablet, desktop and widescreen.',
        'Set UI design direction for mobile; performance and profiling input; design reviews.'
      ] },
    { id: 'onsite-atlantic', org: 'Infosys \u00b7 client Warner Music Group', title: 'Onsite Coordinator & Team Lead', focus: 'E-commerce sites for Atlantic Records artists and bands', start: '2010-11', end: '2013-01', approx: true, era: 'enterprise', location: 'New York',
      stack: ['E-commerce web'],
      points: [
        'Flew from Chennai to New York in November 2010 as onsite coordinator and team lead for Infosys.',
        'Led delivery of e-commerce websites for Atlantic Records artists and bands.',
        'Bridged onsite client teams and the offshore team: requirements, planning and release coordination.'
      ] },
    { id: 'onsite-wbr', org: 'Infosys \u00b7 client Warner Music Group', title: 'Onsite Coordinator & Team Lead', focus: 'E-commerce sites for Warner Bros. Records artists and bands', start: '2013-01', end: '2014-03', approx: true, era: 'enterprise', location: 'Burbank, California',
      stack: ['E-commerce web'],
      points: [
        'Moved to Burbank, California, to lead the Warner Bros. Records artist and band e-commerce sites.',
        'Onsite coordination and team leadership between the client and the offshore team.'
      ] },
    { id: 'ta-nike', org: 'Infosys \u00b7 client Nike', title: 'Technical Analyst \u2014 Onsite Coordinator & Team Lead', focus: 'Equipment & Apparel Product Image Management', start: '2010-11', end: '2014-03', era: 'enterprise',
      stack: ['Java', 'Adobe Flex', 'J2EE', 'Hibernate', 'Cairngorm', 'Oracle', 'XML'],
      points: [
        'Coordinator and team lead for Nike\u2019s global equipment and apparel catalogue.',
        'Built a rich Flex UI on a J2EE/SOA backend, extending Flex AdvancedDataGrid internals.',
        'Agile delivery, builds and deployments across environments; liaison between onsite and offshore teams.'
      ] },
    { id: 'sse-cv', location: 'Chennai, India', org: 'Infosys · client Cable Vision', title: 'Senior System Engineer', focus: 'Automated reporting system', start: '2009-02', end: '2009-05', era: 'enterprise',
      stack: ['Oracle', 'MySQL', 'PL/SQL', 'Oracle BI'],
      points: ['Database design, stored procedures and report generation on Oracle BI.'] },
    { id: 'sse-bh', location: 'Chennai, India', org: 'Infosys · client Baker Hughes', title: 'Senior System Engineer', focus: 'Power Hookup Management System', start: '2008-06', end: '2009-03', era: 'enterprise',
      stack: ['Java', 'Adobe Flex', 'J2EE', 'ActionScript', 'SQLite', 'UML'],
      points: ['Designed and built desktop and web UI for engineering drawings with an extended Flex component set.'] },
    { id: 'sse-comcast', location: 'Chennai, India', org: 'Infosys · client Comcast', title: 'Senior System Engineer', focus: 'Location management system', start: '2007-04', end: '2008-06', era: 'enterprise',
      stack: ['Java', 'Struts', 'JSP', 'AJAX', 'HTML', 'CSS', 'JavaScript'],
      points: ['Web application development on Java, Struts and AJAX.'] },
    { id: 'te-aol-billing', location: 'Chennai, India', org: 'Infosys · client AOL', title: 'Test Engineer', focus: 'Automated Billing System', start: '2007-01', end: '2007-03', era: 'enterprise',
      stack: ['Test planning', 'Excel macros'],
      points: ['Test plan creation and execution, sanity testing.'] },
    { id: 'te-aol-isp', location: 'Chennai, India', org: 'Infosys · client AOL', title: 'Test Engineer', focus: 'ISP testing', start: '2006-06', end: '2007-01', era: 'enterprise',
      stack: ['QTP', 'Test automation'],
      points: ['Automated test scripts with QTP, automated and manual execution.'] }
  ],
  // Dated life and career milestones (no figures). Used by the timeline and journey pages.
  milestones: [
    { date: '2006-06', title: 'Joined Infosys', note: 'Chennai, building for AOL, Comcast, Baker Hughes and Cable Vision', kind: 'career', place: 'Chennai' },
    { date: '2010-11', title: 'Moved to the USA', note: 'Flew from Chennai to New York as onsite coordinator and team lead for Warner Music Group', kind: 'move', from: 'Chennai', to: 'New York' },
    { date: '2013-01', title: 'Moved to California', note: 'Burbank, for Warner Bros. Records', kind: 'move', from: 'New York', to: 'Burbank', approx: true },
    { date: '2014-03', title: 'New Jersey & Verizon', note: 'Settled in New Jersey; lead front-end developer at Verizon through Diversant', kind: 'move', from: 'Burbank', to: 'New Jersey' },
    { date: '2016-01', title: 'Compliance workflow live', note: 'Device profile to sign-off in one portal', kind: 'platform' },
    { date: '2019-09', title: 'Principal Engineer', note: 'Mobile conformance certification architect and lead', kind: 'career' },
    { date: '2022-06', title: 'Self-service certification', note: 'Product owner for certification tools', kind: 'platform' },
    { date: '2023-01', title: 'AI assistant live', note: 'Analytics & AI platform', kind: 'platform' },
    { date: '2024-11', title: 'Modem-level diagnostics', note: 'Product manager for device diagnostics', kind: 'platform' }
  ],
  // Employers, weighted by time and depth (largest first), and the clients served through Infosys.
  employers: [
    { name: 'Verizon', weight: 3, note: 'Full time, 2019 \u2013 today', via: null },
    { name: 'Infosys', weight: 2, note: '2006 \u2013 2014, India and the US', via: null },
    { name: 'Diversant', weight: 1, note: '2014 \u2013 2019, for Verizon', via: 'Verizon' }
  ],
  clients: [
    { name: 'Warner Music Group', weight: 3, via: 'Infosys' },
    { name: 'Atlantic Records', weight: 2, via: 'Infosys' },
    { name: 'Warner Bros. Records', weight: 2, via: 'Infosys' },
    { name: 'Nike', weight: 3, via: 'Infosys' },
    { name: 'Comcast', weight: 2, via: 'Infosys' },
    { name: 'Baker Hughes', weight: 1, via: 'Infosys' },
    { name: 'Cable Vision', weight: 1, via: 'Infosys' },
    { name: 'AOL', weight: 1, via: 'Infosys' }
  ],
  school: { what: 'Schooling', place: 'Madurai, Tamil Nadu', years: '1990s' },
  education: { degree: 'B.E. Computer Science & Engineering', school: 'Karunya Institute of Technology, Anna University', place: 'Coimbatore, India', start: '2002-06', end: '2006-04' },

  // Eras, newest first, used by the journey pages.
  eras: [
    { id: 'intelligence', name: 'Product leader', area: 'AI & device analytics', years: '2023 – now', from: 2023, to: 2026,
      line: 'Turning telemetry and knowledge into answers.',
      body: 'Product manager for device diagnostics and owner of the analytics & AI platform: device dashboards, an AI knowledge assistant and a tool that represents network KPIs and analytics.',
      proof: [['Modem-level', 'field diagnostics'], ['360\u00b0', 'view of every device'], ['Instant', 'AI answers']],
      tags: ['Claude Code', 'Gen AI', 'RAG', 'Network KPI analytics', 'Device 360', 'Modem diagnostics'] },
    { id: 'network', name: 'Product owner', area: 'Self-service certification & diagnostics', years: '2019 – 2024', from: 2019, to: 2024,
      line: 'Certifying the devices on a national network.',
      body: 'Principal Engineer, then Distinguished MTS: architect and lead for mobile conformance certification, turning it into self-service certification with remote test execution across LTE, 5G and IoT, plus LWM2M remote diagnostics for low-category devices.',
      proof: [['Self-service', 'certification for OEMs'], ['Months \u2192 weeks', 'release cycles'], ['LTE \u00b7 5G \u00b7 IoT', 'device classes']],
      tags: ['3GPP', 'LTE', '5G NR', 'eUICC / RSP', 'OMADM', 'LWM2M', 'GCF / PTCRB'] },
    { id: 'interfaces', name: 'Compliance architect', area: 'Compliance & certification tooling', years: '2014 – 2019', from: 2014, to: 2019,
      line: 'Making complex systems usable.',
      body: 'Lead front-end developer at Verizon through Diversant: a responsive cloud portal for device management, then certification-requirement and device-subsystem tooling for the compliance workflow.',
      proof: [['CAT-M · CAT1 · CAT4+', 'certification platform'], ['4', 'screen classes, one codebase']],
      tags: ['Angular', 'TypeScript', 'NodeJS', 'MongoDB', 'Kafka', 'BackboneJS'] },
    { id: 'enterprise', name: 'Software engineer & architect', area: 'Fortune 500 systems at Infosys', years: '2006 – 2014', from: 2006, to: 2014,
      line: 'Shipping for Fortune 500 clients.',
      body: 'Four years with Infosys in Chennai (2006\u20132010) building for AOL, Comcast, Baker Hughes and Cable Vision, then onsite in the US as coordinator and team lead for Warner Music Group: Atlantic Records in New York (2010\u20132013) and Warner Bros. Records in Burbank, California (2013\u20132014).',
      proof: [['Chennai \u2192 New York', 'moved onsite in 2010'], ['Team lead', 'onsite coordinator from 2010']],
      tags: ['Java', 'J2EE', 'Adobe Flex', 'Struts', 'Oracle', 'E-commerce', 'Onsite leadership'] },
    { id: 'foundations', name: 'Student', area: 'Computer Science, Karunya', years: '2002 – 2006', from: 2002, to: 2006,
      line: 'Where the thread starts.',
      body: 'B.E. in Computer Science & Engineering at Karunya Institute of Technology, Anna University, Coimbatore.',
      proof: [['B.E.', 'Computer Science & Engineering']],
      tags: ['Coimbatore', 'Anna University'] }
  ],

  // Ordered as the user tells it. Descriptive names only, no internal product names.
  platforms: [
    { id: 'cert', name: 'Certification, made self-service', short: 'Certification', years: '2019 \u2013 2024', start: '2019-09', end: '2024-11', status: 'Running', role: 'Conformance certification architect & lead, then product owner',
      metric: ['Months \u2192 weeks', 'from device submission to certification'],
      summary: 'Turned device certification into a self-service product: OEMs run network conformance, live-network and diagnostic test suites remotely, so new devices reach market faster and new OEMs can come on board without months of hand-holding.',
      points: [
        'Self-service certification with advanced remote test execution',
        'Automation across the major network conformance suites (3GPP, OMADM, LWM2M) plus live-network and diagnostics tests',
        'Release cycles cut from months to weeks across LTE, 5G and IoT (CAT-M, CAT1, CAT4+)',
        'GCF/PTCRB alignment and eUICC/RSP acceptance testing (LPA, SM-DS, SMDP+)',
        'Simpler onboarding that helps bring new OEMs onto the network'
      ],
      flow: ['OEM self-service', 'Remote execution', 'Conformance & live-network tests', 'Results & certification'],
      stack: ['3GPP', 'LTE', '5G NR', 'OMADM', 'LWM2M', 'eUICC', 'CI/CD', 'AWS', 'Kafka', 'Angular', 'NodeJS', 'MongoDB'] },
    { id: 'diag', name: 'Device diagnostics', short: 'Diagnostics', years: '2019 \u2013 Present', start: '2019-09', end: null, status: 'Active', role: 'Product manager',
      metric: ['Modem-level', 'diagnostics for the field fleet'],
      summary: 'Product manager for an advanced diagnostics system that field engineers and regional teams use to troubleshoot network KPIs down to Layer 3 and modem level, plus an LWM2M-based system that makes remote diagnostics of low-category devices possible and easy.',
      points: [
        'Drove adoption with field engineers and regional teams as the product\u2019s reach into the network',
        'Layer-3 and modem-level diagnostics to troubleshoot network KPIs where problems actually start',
        'Automated log collection from Android, iOS and network scanners, post-processed into actionable insight',
        'Geographical KPI visualisation across the field-device fleet',
        'LWM2M remote diagnostics for low-category and IoT devices, built on CoAP, UDP and TCP'
      ],
      flow: ['Field devices & scanners', 'Modem / Layer-3 logs', 'Processing pipeline', 'KPI maps & troubleshooting'],
      stack: ['LWM2M', 'CoAP', 'UDP', 'TCP', 'OMADM', 'Kafka', 'Elasticsearch', 'Grafana', 'MQTT', 'AWS', 'Angular', 'NodeJS'] },
    { id: 'compliance', name: 'Device compliance workflow', short: 'Compliance', years: '2016 \u2013 2022', start: '2016-01', end: '2022-06', status: 'Running', role: 'Architect & lead developer',
      metric: ['End to end', 'one workflow from device profile to sign-off'],
      summary: 'The end-to-end compliance workflow for device certification, from the first device profile to final sign-off, run through a dedicated portal that keeps every phase, test and decision in one place.',
      points: [
        'One workflow from device profile through every certification phase to finish',
        'Feature lockdown testing and multi-phase test tracking',
        'A dedicated portal for the entire workflow, extended with many advanced capabilities over the years',
        'Requirement and device-subsystem tracking with LTE protocol conformance validation',
        'MongoDB sharding and replicas for scale'
      ],
      flow: ['Device profile', 'Requirements & lockdown', 'Phased testing', 'Sign-off'],
      stack: ['Angular', 'NodeJS', 'MongoDB', 'Kafka', 'MQTT', 'OMADM', 'LWM2M', 'LTE'] },
    { id: 'aiplat', name: 'Analytics & AI platform', short: 'Analytics & AI', years: '2023 \u2013 Present', start: '2023-01', end: null, status: 'Active', role: 'Owner',
      metric: ['Instant', 'answers for support teams from AI'],
      summary: 'One place where device and network data become decisions: device dashboards that give teams a 360\u00b0 view of every device, and AI that answers questions and explains trends, alongside a tool that represents network KPIs and analytics.',
      points: [
        'Device 360 view with scorecards and side-by-side comparison',
        'Readiness and performance dashboards: 5G standalone, chipsets, live network and voice KPIs, launch field testing',
        'Adoption and lifecycle analytics: eSIM and SIM, device returns, executive KPI views and custom dashboards',
        'Ask-anything AI over the dashboards and a device AI advisor',
        'A retrieval-augmented knowledge assistant that answers most support questions instantly',
        'A tool that represents network KPIs and analytics, including call-drop and RAT-change trends'
      ],
      flow: ['Device & network data', 'Analytics pipeline', 'KPI dashboards', 'AI answers & insights'],
      stack: ['Gen AI', 'LLaMA-RAG', 'Vector DB', 'AI/ML', 'Network KPI analytics', 'Angular', 'NodeJS', 'AWS', 'Kafka', 'Elasticsearch'] }
  ],
  projects: [
    { name: 'Responsive cloud portal', years: '2014 \u2013 2015', summary: 'Responsive single-page portal for device management workflows at Verizon.', stack: ['BackboneJS', 'SASS', 'HTML5'] },
    { name: 'Nike product image management', years: '2010 \u2013 2014', summary: 'Rich Flex UI over J2EE services for Nike\u2019s global equipment and apparel catalogue.', stack: ['Adobe Flex', 'J2EE', 'Oracle'] },
    { name: 'Comcast location management', years: '2007 \u2013 2008', summary: 'Location management web application on Java, Struts and AJAX.', stack: ['Java', 'Struts', 'AJAX'] }
  ],

  domains: [
    { id: 'telecom', name: 'Telecom & standards', color: '#7fb4ff',
      body: 'More than a decade inside wireless protocols, from LTE conformance and device compliance to 5G NR certification and low-power IoT diagnostics.',
      tags: ['3G/4G/5G', '3GPP', 'LTE', '5G NR', 'eUICC', 'RSP', 'LPA', 'SM-DS', 'SMDP+', 'LWM2M', 'OMADM', 'CoAP', 'UDP', 'TCP', 'MQTT', 'APN'] },
    { id: 'cloud', name: 'Cloud & data', color: '#5ee0c8',
      body: 'Enterprise platforms handling real-time telemetry from field devices at fleet scale; event-driven systems with sub-second latency for diagnostic pipelines.',
      tags: ['AWS', 'Microservices', 'Kafka', 'MQTT', 'MongoDB', 'Elasticsearch', 'Grafana', 'Oracle', 'MySQL', 'Docker', 'Kubernetes'] },
    { id: 'ai', name: 'AI & analytics', color: '#ff7ab6',
      body: 'AI-assisted diagnostics, a tool that represents network KPIs and analytics, and retrieval-augmented assistants over enterprise knowledge.',
      tags: ['Claude Code', 'Agentic workflows', 'Gen AI', 'LLaMA-RAG', 'Vector DB', 'NLP', 'Network KPI analytics', 'Call-drop & RAT-change analytics', 'KPI visualisation', 'Big-data pipelines'] },
    { id: 'frontend', name: 'Frontend & product', color: '#ffc178',
      body: '18 years crafting interfaces that turn complex data into clarity, from component architecture to dashboards engineers and executives both trust.',
      tags: ['Angular', 'AngularJS', 'TypeScript', 'JavaScript', 'NodeJS', 'ExpressJS', 'React', 'BackboneJS', 'Adobe Flex', 'HTML5', 'CSS3', 'SASS', 'UI/UX', 'Data viz'] },
    { id: 'leadership', name: 'Product & leadership', color: '#ff8a2a',
      body: 'Product strategy, roadmaps and full-lifecycle ownership; cross-functional and cross-geography teams; training and adoption.',
      tags: ['Product roadmap', 'OKRs', 'Stakeholder alignment', 'Cross-functional teams', 'Agile', 'Waterfall', 'Release management', 'Training'] }
  ],
  // Maps technologies to domains so charts can derive focus per role (not hand-estimated).
  techDomain: {
    '3GPP': 'telecom', 'LTE': 'telecom', '5G NR': 'telecom', 'eUICC': 'telecom', 'RSP': 'telecom', 'LPA': 'telecom', 'SM-DS': 'telecom', 'SMDP+': 'telecom', 'LWM2M': 'telecom', 'OMADM': 'telecom', 'CoAP': 'telecom', 'UDP': 'telecom', 'TCP': 'telecom', 'MQTT': 'telecom', 'GCF': 'telecom', 'PTCRB': 'telecom',
    'AWS': 'cloud', 'Kafka': 'cloud', 'MongoDB': 'cloud', 'Elasticsearch': 'cloud', 'Grafana': 'cloud', 'Oracle': 'cloud', 'MySQL': 'cloud', 'PL/SQL': 'cloud', 'Oracle BI': 'cloud', 'SQLite': 'cloud', 'Hibernate': 'cloud', 'J2EE': 'cloud', 'Java': 'cloud', 'Struts': 'cloud', 'JSON': 'cloud', 'XML': 'cloud',
    'AI/ML': 'ai', 'Network KPI analytics': 'ai', 'Claude Code': 'ai', 'Agentic workflows': 'ai', 'CI/CD': 'cloud', 'Gen AI': 'ai', 'LLaMA-RAG': 'ai', 'Vector DB': 'ai',
    'Angular': 'frontend', 'TypeScript': 'frontend', 'JavaScript': 'frontend', 'NodeJS': 'frontend', 'ExpressJS': 'frontend', 'HTML5': 'frontend', 'CSS3': 'frontend', 'HTML': 'frontend', 'CSS': 'frontend', 'BackboneJS': 'frontend', 'jQuery': 'frontend', 'SASS': 'frontend', 'Adobe Flex': 'frontend', 'ActionScript': 'frontend', 'Cairngorm': 'frontend', 'JSP': 'frontend', 'AJAX': 'frontend', 'UML': 'frontend',
    'QTP': 'quality', 'Test planning': 'quality', 'Excel macros': 'quality', 'Test automation': 'quality'
  },
  standards: ['GCF', 'PTCRB', '3GPP release compliance', 'OMADM', 'LWM2M', 'CAT-M', 'CAT1', 'CAT4+', 'IoT standards', 'eUICC / eSIM (GSMA SGP.02)', 'RSP (GSMA SGP.21/22)', '5G NR'],
  principles: [
    { name: 'Scale first', body: 'Architect for 10x before you need it. A system that crumbles under growth isn’t a product — it’s a prototype with a deadline.' },
    { name: 'Data as a product', body: 'Every system should produce insight, not just output. Telemetry, logs and metrics are first-class deliverables.' },
    { name: 'Ship, then refine', body: 'Velocity and quality are not opposites. Real users surface real problems; no internal review matches production.' }
  ],
  philosophy: 'I believe the best engineers are the ones who understand the human problem before the technical one. Platforms don’t fail because of bad code — they fail because someone stopped listening to the people using them.',

  personal: {
    story: [
      'Born and brought up in Madurai, Tamil Nadu \u2014 the temple city \u2014 I went to school there through the 90s, then studied Computer Science at Karunya Institute of Technology in Coimbatore. After graduating in 2006 I joined Infosys in Chennai, building for AOL, Comcast, Baker Hughes and Cable Vision.',
      'In November 2010 I flew to New York as an onsite coordinator and team lead for Warner Music Group\u2019s Atlantic Records, moved to Burbank, California, for Warner Bros. Records in 2013, and settled in New Jersey in 2014, where I\u2019ve been building for Verizon ever since.',
      'Over 20 years I’ve gone deep — from protocol conformance and device diagnostics to defining AI strategy for one of America’s largest carriers.'
    ],
    places: [
      { years: '1990s', place: 'Madurai', region: 'Tamil Nadu, India', what: 'Where my childhood is',
        story: 'I was born and brought up in Madurai and went to school there through the 90s. It is one of the oldest living cities in the world, and it shaped who I am.',
        notes: ['The towering gopurams of the Meenakshi Amman temple', 'The Chithirai festival filling the streets', 'Jigarthanda on a hot evening', 'Jasmine \u2014 malli \u2014 sold on every corner'] },
      { years: '2002 \u2013 2006', place: 'Coimbatore', region: 'Tamil Nadu, India', what: 'College and fun days',
        story: 'Four years of Computer Science at Karunya Institute of Technology, at the foot of the Western Ghats. This is where I learned to build things \u2014 and where the friendships and fun days still make me smile.',
        notes: ['A campus at the foot of the Western Ghats', 'Cool hill air and the Siruvani water', 'Late-night coding and lifelong friends'] },
      { years: '2006 \u2013 2010', place: 'Chennai', region: 'Tamil Nadu, India', what: 'Where my career began',
        story: 'I started my career at Infosys in Chennai, building for AOL, Comcast, Baker Hughes and Cable Vision. Chennai is still the place I head to first whenever I go back to India.',
        notes: ['Evenings on Marina Beach', 'Filter coffee and a proper meals', 'The first city that made me an engineer'] },
      { years: '2010 \u2013 2013', place: 'New York', region: 'New York, USA', what: 'Music, artists and the city',
        story: 'I flew to New York as an onsite team lead for Atlantic Records\u2019 artist and band e-commerce sites. Working in music meant meeting artists and going to concerts I still remember.',
        notes: ['Meeting artists through the work', 'Concerts across the city', 'Winter walks in Central Park'] },
      { years: '2013 \u2013 2014', place: 'Burbank', region: 'California, USA', what: 'Studios, artists and concerts',
        story: 'Burbank, for Warner Bros. Records \u2014 a city of film and music studios under the hills. I got the chance to meet lots of artists and attend lots of concerts.',
        notes: ['The media capital of the world, home to the studios', 'Meeting artists and attending concerts', 'Sunshine and the Verdugo hills'] },
      { years: '2014 \u2013 today', place: 'New Jersey', region: 'USA', what: 'Home and family',
        story: 'New Jersey is home. It is where my wife and I are raising our son, and where I\u2019ve been building for Verizon ever since.',
        notes: ['Autumn colours every October', 'The Manhattan skyline across the Hudson', 'Weekends with family'] }
    ],
    family: [
      'My family is everything. Monisha, my wife, has been my steadiest supporter through every late-night architecture review, every launch, every pivot.',
      'Our son has already changed how I think about everything I build — I now think about the world he’ll grow up in.',
      'Stepping away from a complex system design and just being present at home recalibrates everything. Technology is a means, not an end.'
    ],
    drives: [
      { name: 'Curiosity', body: 'From 3GPP specs to generative AI, I stay curious. The day I think I know enough is the day I stop being useful.' },
      { name: 'Impact at scale', body: 'I’m drawn to problems where the solution reaches millions. Scale isn’t just a constraint, it’s a responsibility.' },
      { name: 'Craft', body: 'Good code, good design, good communication — all the same discipline. Sloppy thinking in one bleeds into the others.' },
      { name: 'Leadership', body: 'I want to build great engineers, not just great products. Investing in people compounds in ways architecture never can.' }
    ],
    interests: ['Travel & exploration', 'Cricket — Tamil Nadu fan', 'Photography', 'Reading — tech, philosophy, biographies', 'Family time', 'Cooking South Indian food'],
    connect: 'Happy to talk about engineering leadership, platform architecture and where AI is taking the industry. Not looking to move right now, but always interested in people building things that matter.'
  }
};
