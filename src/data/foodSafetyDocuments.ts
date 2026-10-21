import { FoodSafetyDoc } from '../types/foodSafety';

export const INITIAL_FOOD_SAFETY_DOCUMENTS: FoodSafetyDoc[] = [
  {
    id: 'ikqap-001',
    code: 'IKQAP#001',
    title: 'Food Safety Policy',
    type: 'policy',
    category: 'Corporate & Quality',
    revision: 3,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_001__Food_Safety_Policy.docx_c47cb5a0.pdf',
    summary:
      'The foundational food safety policy establishing Imperial Kitchen Group Inc. and Jiangnan Hotpot commitment to full compliance with the Food Safety Act of 2013 (RA 10611), zero-tolerance danger zone rules, safe sourcing, CLAYGO, and quarterly internal audits.',
    keyTakeaways: [
      'Full compliance with Food Safety Act of 2013 (RA 10611) & local sanitary codes.',
      'Mandatory valid Health Certificates issued by City/Municipal Health Office for all staff.',
      'Temperature Danger Zone (5°C to 60°C) limit: high-risk foods must NEVER remain in this range for >1 hour cumulatively.',
      'Cold storage units strictly regulated at 4°C or below.',
      'Raw meat & poultry sourced exclusively from NMIS-accredited & FDA-registered suppliers.',
      'At least one Internal Food Safety Audit per store every quarter led by QA.',
    ],
    quickRules: [
      {
        title: 'Danger Zone Limit',
        rule: 'High-risk foods must NEVER stay between 5°C and 60°C for >1 cumulative hour.',
        type: 'critical',
      },
      {
        title: 'Health Certificate',
        rule: 'All employees and contractors must hold an updated City/Municipal Health Certificate.',
        type: 'critical',
      },
      {
        title: 'CLAYGO Workflow',
        rule: 'Clean as you Go must be an ongoing active-shift practice, not an end-of-day cleanup.',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement',
        content:
          'Imperial Kitchen Group Inc., is committed to providing safe, wholesome, and high-quality food to our guests. We recognize that food safety is a shared responsibility and a fundamental pillar of our operations. We pledge to operate in full compliance with the Food Safety Act of 2013 (RA 10611) and all applicable local sanitary codes to protect public health and maintain the trust of the Filipino community.',
      },
      {
        id: '2',
        title: '2. Scope',
        content:
          'This policy applies to all aspects of our food chain, including procurement, receiving, storage, preparation, and service. It is binding for all employees (full-time and contractual), management, third-party contractors, and suppliers.',
      },
      {
        id: '3',
        title: '3. Responsibilities',
        content: 'Cross-functional roles defined across company operations:',
        bulletPoints: [
          '3.1 All Employees, Contractors, & Food Handlers: Must possess valid Health Certificates from City/Municipal Health Office. Must report foodborne illness symptoms (IKQAP#005) immediately. Must adhere to Personnel Hygiene (IKQAP#012) and practice continuous "Clean as you Go" (CLAYGO).',
          '3.2 Supply Chain Management (SCM): Exclusively source raw materials and meat from NMIS-accredited and FDA-registered suppliers. Inspect deliveries for cold chain integrity and maintain batch documentation for rapid DOH/DA recalls.',
          '3.3 Restaurant & Area Manager: Hold direct on-site accountability for daily food safety, refrigeration logs, danger zone thresholds, sanitation, pest exclusion, and chemical storage. Area Managers conduct unannounced regional audits.',
          '3.4 Quality Assurance (QA): Custodian of compliance; updates Food Safety Policy and SOPs; conducts mandated quarterly internal food safety audits across all stores; investigates guest complaints and coordinates recalls.',
          '3.5 Human Resources (HR): Enforces employee health documentation, verifies health certificates prior to store deployment, enforces Employee Health and Exclusion policy (IKQAP#005), and manages disciplinary actions.',
          '3.6 Learning & Development (L&D): Designs and conducts food safety onboarding, refresher courses, annual retraining, and targeted intervention courses for stores with audit findings.',
        ],
      },
      {
        id: '4',
        title: '4. Principles',
        content: 'Core pillars of food safety compliance:',
        bulletPoints: [
          '4.1 Safe Sourcing: Only NMIS-accredited & FDA-registered suppliers. Inspection of all incoming goods for quality and temperature.',
          '4.2 Personnel Health & Hygiene: Valid Health Certificate, zero tolerance for working with foodborne illness symptoms, hair restraints, clean uniforms, and handwashing.',
          '4.3 Temperature & Time Control: High-risk foods must NEVER remain between 5°C and 60°C for >1 hour cumulative. Cold storage strictly at 4°C or below.',
          '4.4 Environmental Sanitation & Pest Control: Proactive CLAYGO culture combined with rigorous Integrated Pest Management (IPM) using FDA-approved food-grade chemicals.',
          '4.5 Traceability & Recall: Full records maintained for immediate trace and withdrawal in case of DOH or DA alerts.',
        ],
      },
      {
        id: '5',
        title: '5. Management Responsibility',
        content:
          'The management team is responsible for providing necessary resources, PPE, training, and sanitized facilities. The company commits to conducting at least one Internal Food Safety Audit in each store per quarter.',
      },
      {
        id: '6',
        title: '6. Non-Compliance Disciplinary Tiers',
        content: 'Failure to adhere may result in progressive disciplinary action:',
        bulletPoints: [
          '6.1 Minor Non-Compliance (Low-Risk / Isolated): E.g., single PPE lapse or minor temperature log delay. Corrective Action: On-the-spot rectification and informal coaching.',
          '6.2 Major Non-Compliance (Repeated or High-Risk): E.g., failure to monitor CCPs or neglecting cross-contamination protocols. Corrective Action: Documented verbal warning and targeted refresher training.',
          '6.3 Critical Non-Compliance (Gross Negligence / Immediate Threat): E.g., falsifying safety logs, serving known contaminated food, gross hygiene failure. Corrective Action: Immediate formal written warning, temporary reassignment, product disposal, and mandatory intensive retraining leading up to termination.',
        ],
      },
    ],
    tables: [
      {
        title: 'Non-Compliance Tiers & Corrective Actions',
        headers: ['Classification', 'Example Infraction', 'Mandatory Action'],
        rows: [
          [
            'Minor (Low-Risk / Isolated)',
            'Single PPE lapse or slight delay in logging temperatures',
            'On-the-spot rectification and informal coaching; verbal reminder',
          ],
          [
            'Major (Repeated / High-Risk)',
            'Failure to monitor Critical Control Points (CCPs), cross-contamination protocol neglect',
            'Documented verbal warning and targeted refresher training with close supervision',
          ],
          [
            'Critical (Gross Negligence)',
            'Falsifying temperature logs, serving contaminated food, gross hygiene failure',
            'Immediate product disposal, formal written warning, temporary reassignment, intensive retraining',
          ],
        ],
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: [
        'Jackquelyn Aquino (SCM Manager)',
        'Virna Joy Bernardo (L&D Manager)',
        'Anthony Co (HR Manager)',
        'Aries Tambasacan (Operations Manager)',
        'Eric Co (Vice President)',
      ],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'February 11, 2026', author: 'Marielle Louise Macabale, QA Specialist', purpose: 'Originator' },
      { rev: 1, date: 'March 05, 2026', author: 'Marielle Louise Macabale, QA Specialist', purpose: 'Change addressing to employees; added L&D Manager' },
      { rev: 2, date: 'May 25, 2026', author: 'Celine Joy Sanchez, QA Specialist', purpose: 'Added responsibilities' },
      { rev: 3, date: 'June 1, 2026', author: 'Celine Joy Sanchez, QA Specialist', purpose: 'Revised non-compliance tiers' },
    ],
    quizQuestions: [
      {
        question: 'Under IKQAP#001, what is the maximum cumulative time high-risk foods may spend in the Temperature Danger Zone (5°C to 60°C)?',
        options: ['1 hour', '2 hours', '4 hours', '30 minutes'],
        answerIndex: 0,
        explanation: 'Policy IKQAP#001 Section 4.3 strictly mandates that high-risk foods never remain between 5°C and 60°C for a cumulative period exceeding one hour.',
      },
      {
        question: 'What is the required operating temperature for cold storage units?',
        options: ['10°C or below', '4°C or below', '7°C or below', '0°C exactly'],
        answerIndex: 1,
        explanation: 'Cold storage units are strictly regulated to operate at 4°C or below.',
      },
      {
        question: 'How often must internal food safety audits be conducted in each store?',
        options: ['Monthly', 'At least once per quarter', 'Bi-annually', 'Annually'],
        answerIndex: 1,
        explanation: 'QA executes mandated internal food safety audits across all store locations at least once every quarter.',
      },
    ],
    tags: ['Core Policy', 'RA 10611', 'Danger Zone', 'CLAYGO', 'Audits'],
  },
  {
    id: 'ikqap-002',
    code: 'IKQAP#002',
    title: 'Customer Complaint Policy',
    type: 'policy',
    category: 'Corporate & Quality',
    revision: 1,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_002__Customer_Complaint_Policy.docx_d7bbed6b.pdf',
    summary:
      'Standardized protocol for handling customer complaints, specifically categorizing high-risk incidents (food poisoning, allergies, foreign objects) requiring a 24-hour audit, product quarantine, and DPA 2012 compliance.',
    keyTakeaways: [
      'Category A (High Risk): Allegations of food poisoning, allergic reactions, or physical injury. Escalates immediately to QA & Area Manager.',
      'Category B (Quality): Taste, texture, temperature, or service managed by Restaurant/Area Manager.',
      'Mandatory 24-Hour Internal Audit for Category A: Review delivery logs, cold chain & holding logs, and employee health checks.',
      'Food sample quarantine: Label with case number and store in designated freezer for lab analysis.',
      'Data Privacy Act of 2012 (RA 10173): CSRs must obtain informed consent before logging sensitive health data.',
      'If the same complaint occurs >2 times in a quarter, mandatory system-wide SOP review and retraining is triggered.',
    ],
    quickRules: [
      {
        title: 'Category A Escalation',
        rule: 'Immediately escalate food poisoning or allergic reactions to QA and Area Manager.',
        type: 'critical',
      },
      {
        title: 'Sample Quarantine',
        rule: 'Label remaining food with Case Number and freeze immediately. Never discard.',
        type: 'critical',
      },
      {
        title: '24-Hour Audit',
        rule: 'Trigger 24-hour audit of cold chain logs, receiving records, and staff health checks.',
        type: 'warning',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'Imperial Kitchen Group Inc. views every customer complaint as a vital data point for maintaining food safety standards. We commit to transparent, systematic, and rapid response to all feedback, particularly allegations of foodborne illness, foreign objects, or allergic reactions. Scope covers in-person reports, phone calls, social media, delivery platforms, and government agencies (DOH/LGU).',
      },
      {
        id: '2',
        title: '2. Categorization & Response Records',
        content: 'Complaints are categorized immediately upon receipt:',
        bulletPoints: [
          'Category A (High Risk): Allegations of food poisoning, allergic reactions, or physical injury. Requires immediate escalation to QA or Area Manager.',
          'Category B (Quality): Issues regarding taste, texture, temperature, or service. Managed by Restaurant Manager / Area Manager.',
          'Information Gathering: Must collect customer contact info, exact visit date/time, specific food consumed, precise symptom onset times, and quarantine remaining food samples in freezer.',
        ],
      },
      {
        id: '3',
        title: '3. Investigation & 24-Hour Internal Audit',
        content: 'For all Category A complaints, management must execute a 24-hour internal audit:',
        bulletPoints: [
          'Traceability Check: SCM reviews all delivery logs for raw materials involved in the incident.',
          'Internal Monitoring: Check cold chain and holding logs for the day in question.',
          'Employee Health Check: Operations investigates if any on-duty employee exhibited illness symptoms.',
          'Recalls & Stop Sale: If multiple independent complaints occur for the same item, Crisis Management halts sales, isolates inventory, and notifies FDA/local health office.',
        ],
      },
      {
        id: '4',
        title: '4. Data Privacy Compliance',
        content:
          'Under the Data Privacy Act of 2012 (RA 10173) and National Privacy Commission directives, CSRs must read privacy notices and obtain explicit consent before recording Sensitive Personal Information (SPI) such as health symptoms. Access is restricted strictly to authorized QA and Legal teams.',
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'February 11, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'March 05, 2026', author: 'Marielle Louise Macabale', purpose: 'Changed store manager to restaurant/shift manager; added L&D' },
      { rev: 2, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    quizQuestions: [
      {
        question: 'What triggers an immediate Category A complaint escalation?',
        options: ['Slow table service', 'Food poisoning, allergic reaction, or physical injury', 'Cold soup broth', 'Incorrect beverage order'],
        answerIndex: 1,
        explanation: 'Category A covers allegations of food poisoning, allergic reactions, or physical injury, requiring immediate escalation to QA and Area Manager.',
      },
      {
        question: 'Within how many hours must an internal audit be conducted for Category A complaints?',
        options: ['12 hours', '24 hours', '48 hours', '72 hours'],
        answerIndex: 1,
        explanation: 'A 24-hour internal audit must be conducted covering traceability, cold chain logs, and staff health.',
      },
    ],
    tags: ['Customer Complaints', 'Food Poisoning', 'Audit', 'Recall', 'DPA 2012'],
  },
  {
    id: 'ikqap-003',
    code: 'IKQAP#003',
    title: 'Cold Chain Management',
    type: 'policy',
    category: 'Temperature & Cold Chain',
    revision: 1,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_003__Cold_Chain_Management.docx_a37979fb.pdf',
    summary:
      'Total Cold Chain policy enforcing thermal integrity across receiving, storage, prep, and holding. Highlights the 15-Minute intake rule, strict rejection criteria (chilled >5°C, frozen >-18°C), and power interruption corrective actions.',
    keyTakeaways: [
      'Total Cold Chain: Bypassed temperature safeguards result in immediate product adulteration and disposal.',
      'Rejection Criteria: Chilled goods >5°C rejected; frozen goods >-18°C or with thawing signs (ice crystals, wet boxes) rejected.',
      'The 15-Minute Rule: Accepted deliveries must be moved entirely from loading dock to refrigerated storage within 15 minutes.',
      'Batch Prepping: Only remove food from refrigeration that can be prepped within 30 minutes.',
      'Thawing: Only in refrigerator (≤4°C) or under running cold water (<21°C). Room temperature thawing is strictly prohibited.',
      'Power Interruption / Cold Chain Breakdown: Left out <1 hr -> re-chill; 1-3 hrs (<25°C) -> cook immediately to 74°C; 3 hrs in hot kitchen (>30°C) -> DISCARD.',
    ],
    quickRules: [
      {
        title: 'The 15-Minute Rule',
        rule: 'All incoming cold deliveries must be in refrigerated storage within 15 minutes of arrival.',
        type: 'critical',
      },
      {
        title: '30-Minute Batch Prep',
        rule: 'Only take out food that can be prepped within 30 minutes to keep temperatures safe.',
        type: 'warning',
      },
      {
        title: '3-Hour Hot Kitchen Rule',
        rule: 'Food left out for 3 hours in kitchen >30°C must be DISCARDED immediately due to toxins.',
        type: 'critical',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'Imperial Kitchen Group Inc. is committed to maintaining thermal integrity of all temperature-sensitive products. The "Total Cold Chain" policy ensures high-risk foods (meat, dairy, seafood, poultry) are kept outside the Temperature Danger Zone at all times. Any product bypassing safeguards is deemed adulterated and discarded. Applies to Receiving, Storage, Preparation, and Delivery.',
      },
      {
        id: '2',
        title: '2. Operational Receiving Standards',
        content: 'Non-negotiable receiving standards:',
        bulletPoints: [
          'Temperature Checks: Warehouse/receiving staff must measure core temperature upon arrival.',
          'Rejection Criteria: Chilled goods must be ≤5°C. Frozen goods must be ≤-18°C with no ice crystals or wet boxes.',
          'The 15-Minute Rule: Deliveries must be transferred from loading dock to walk-in/chiller within 15 minutes.',
        ],
      },
      {
        id: '3',
        title: '3. Storage Equipment Standards',
        content: 'Equipment operating ranges and monitoring frequencies:',
        bulletPoints: [
          'Chest Type Freezers: -18°C to -23°C (Monitored once daily or every shift)',
          'Walk-in Freezers: -18°C to -23°C (Monitored once daily)',
          'Vertical Refrigerators: 3°C to 5°C (Monitored every 4 hours)',
        ],
      },
      {
        id: '4',
        title: '4. Preparation & Thawing',
        content: 'Strict controls on kitchen floor:',
        bulletPoints: [
          'Batch Prepping: Only remove food from refrigeration that can be prepped within 30 minutes.',
          'Thawing: Inside refrigerator (4°C) or under running cold water below 21°C. Room temperature thawing is strictly prohibited.',
          'Equipment Calibration: Thermometers calibrated quarterly to ±1°C by certified third-party service.',
        ],
      },
      {
        id: '5',
        title: '5. Power Outage / Cold Chain Halt Actions',
        content: 'Corrective actions when cold chain is interrupted:',
        bulletPoints: [
          'Less than 1 hour: Immediately store back in refrigerator. Do not refreeze.',
          '1-2 hours (room temp <25°C): Cook immediately. Internal temp must reach 74°C. No leftovers saved.',
          '3 hours (room temp <25°C): Cook immediately to 74°C. No leftovers saved.',
          '3 hours in hot kitchen (>30°C): DISCARD. Risk of heat-stable toxins.',
          'Feels tacky, slimy, or has odor: DISCARD immediately.',
        ],
      },
    ],
    tables: [
      {
        title: 'Cold Storage Equipment Standards',
        headers: ['Equipment Type', 'Operating Standard', 'Monitoring Frequency'],
        rows: [
          ['Chest Type Freezers', '-18°C to -23°C', 'Once daily or every shift'],
          ['Walk-in Freezers', '-18°C to -23°C', 'Once daily'],
          ['Vertical Refrigerator', '3°C to 5°C', 'Every 4 hours'],
        ],
      },
      {
        title: 'Cold Chain Interruption Action Matrix',
        headers: ['Duration / Condition', 'Required Corrective Action'],
        rows: [
          ['Been less than 1 hour', 'Immediately store back in refrigerator. Do not refreeze.'],
          ['Been 1-2 hours & room temp <25°C', 'Cook immediately to internal 74°C. No leftovers saved.'],
          ['Been 3 hours & room temp <25°C', 'Cook immediately to internal 74°C. No leftovers saved.'],
          ['Been 3 hours in hot kitchen (>30°C)', 'DISCARD. Heat-stable toxins cannot be destroyed by cooking.'],
          ['Raw material tacky, slimy, or odor', 'DISCARD immediately. Signs of advanced spoilage.'],
        ],
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'February 12, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'March 05, 2026', author: 'Marielle Louise Macabale', purpose: 'Updated roles and corrective action provisions' },
      { rev: 2, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    quizQuestions: [
      {
        question: 'Under the 15-Minute Rule, how quickly must cold deliveries be transferred from loading dock to cold storage?',
        options: ['15 minutes', '30 minutes', '45 minutes', '1 hour'],
        answerIndex: 0,
        explanation: 'All accepted deliveries must be moved entirely from loading dock to refrigerated storage within 15 minutes of arrival.',
      },
      {
        question: 'What is the maximum room temperature allowed when thawing under running cold water?',
        options: ['Below 10°C', 'Below 21°C (70°F)', 'Below 30°C', 'Room temperature is fine'],
        answerIndex: 1,
        explanation: 'Water temperature must be strictly maintained at 21°C (70°F) or below.',
      },
    ],
    tags: ['Cold Chain', '15-Minute Rule', 'Freezer', 'Thawing', 'Refrigeration'],
  },
  {
    id: 'ikqap-004',
    code: 'IKQAP#004',
    title: 'Allergen Management Policy',
    type: 'policy',
    category: 'Allergens & Health',
    revision: 1,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_004__Allergen_Management_.docx_99cc5a95.pdf',
    summary:
      'Rigorous allergen defense system covering the 9 major allergens (Milk, Eggs, Fish, Crustaceans, Tree Nuts, Peanuts, Wheat, Soybeans, Sesame), dedicated purple allergy tools, POS allergy flagging, and anaphylaxis emergency steps.',
    keyTakeaways: [
      'Identification of Major 9 Allergens: Milk/Dairy, Eggs, Fish, Crustacean Shellfish, Tree Nuts, Peanuts, Wheat, Soybeans, Sesame.',
      'Cooking DOES NOT remove or kill allergens. Cross-contact is permanent.',
      'Storage Rule: Allergenic ingredients stored in sealed, labeled containers strictly BELOW non-allergenic items to prevent spills.',
      'Dedicated Purple allergy tools or sanitized stainless steel used exclusively for allergen orders.',
      'POS Flagging: Servers proactively ask guests about allergies and input into POS so tickets highlight ALLERGY: [NAME] in bold.',
      'Secure Chain of Custody: Shift Manager & Restaurant Manager must personally deliver the allergy-safe meal separately.',
      'Anaphylaxis Response: Call emergency services immediately, notify management, do not move dizzy/fainting guest, and SECURE THE PLATE for testing (never throw away).',
    ],
    quickRules: [
      {
        title: 'Big 9 Allergens',
        rule: 'Milk, Eggs, Fish, Shellfish, Tree Nuts, Peanuts, Wheat, Soy, Sesame.',
        type: 'critical',
      },
      {
        title: 'Purple Allergy Kit',
        rule: 'Use dedicated purple tools or clean stainless steel for all allergy orders.',
        type: 'info',
      },
      {
        title: 'Emergency Anaphylaxis',
        rule: 'Call emergency services, keep guest stationary, and SECURE food plate for lab analysis.',
        type: 'critical',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'Imperial Kitchen Group Inc. is committed to guest safety regarding food allergies and dietary restrictions. Allergies are a serious medical condition. It is company policy to treat every inquiry with utmost seriousness, transparency, and care. Scope covers Menu Planning, Purchasing, Storage, Preparation, Service, and Emergency Response for BOH and FOH.',
      },
      {
        id: '2',
        title: '2. The 9 Major Allergens (FDA & CODEX)',
        content: 'Staff must be certified on the Big 9 allergens:',
        bulletPoints: [
          '1. Milk / Dairy',
          '2. Eggs',
          '3. Fish',
          '4. Crustacean Shellfish (shrimp, crab, lobster)',
          '5. Tree Nuts (almonds, walnuts, cashews, etc.)',
          '6. Peanuts',
          '7. Wheat (gluten)',
          '8. Soybeans (tofu, soy sauce, bean curd)',
          '9. Sesame (sesame oil, seeds, paste)',
        ],
      },
      {
        id: '3',
        title: '3. Operational Preparation & Storage Controls',
        content: 'Physical safeguards to prevent cross-contact:',
        bulletPoints: [
          'Storage Placement: Allergenic ingredients must be placed on shelves BELOW non-allergenic items.',
          'Decanted Labeling: Any decanted ingredient must feature bold highlighting of all present allergens.',
          'Preparation Sequence: Wash hands, wear fresh gloves, sanitize workstation, use fresh cutting board and knife, verify sauce ingredient labels.',
          'Dedicated Purple Tools: Color-coded purple is industry standard for allergen prep kits.',
        ],
      },
      {
        id: '4',
        title: '4. Service & POS Notification',
        content:
          'Servers proactively ask guests about dietary restrictions before placing orders. The allergy must be flagged in bold on kitchen tickets (e.g. ALLERGY: SHELLFISH). The Restaurant Manager or Shift Manager must personally deliver the allergy-safe meal separately from all other dishes to prevent transit cross-contact.',
      },
      {
        id: '5',
        title: '5. Emergency Response (Anaphylaxis)',
        content: 'If a guest exhibits symptoms (facial swelling, wheezing, hives, trouble breathing):',
        bulletPoints: [
          'Call emergency services (911/local EMS) immediately.',
          'Notify Restaurant Manager and Shift Manager on duty.',
          'Do not move the guest if they are faint or dizzy; keep them stationary and calm.',
          'SECURE THE FOOD: Keep the plate and sample for testing/investigation; DO NOT discard.',
        ],
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'February 12, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'March 05, 2026', author: 'Marielle Louise Macabale', purpose: 'Updated roles & L&D' },
      { rev: 2, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    quizQuestions: [
      {
        question: 'Does cooking or high heat eliminate food allergens?',
        options: ['Yes, boiling removes allergens', 'No, cooking does not remove or eliminate allergens', 'Only if cooked past 100°C', 'Yes for dairy only'],
        answerIndex: 1,
        explanation: 'Cooking does NOT eliminate food allergens. Proteins remain allergenic even after extensive cooking.',
      },
      {
        question: 'Where must allergenic ingredients be placed in upright storage racks?',
        options: ['Top shelf above prepared foods', 'Below non-allergenic items', 'On the floor', 'Mixed with fresh produce'],
        answerIndex: 1,
        explanation: 'Allergenic ingredients must be placed below non-allergenic items to prevent accidental spillage or dripping.',
      },
    ],
    tags: ['Allergens', 'Big 9', 'Anaphylaxis', 'Purple Tools', 'POS Flagging'],
  },
  {
    id: 'ikqap-005',
    code: 'IKQAP#005',
    title: 'Employee Health and Exclusion Policy',
    type: 'policy',
    category: 'Allergens & Health',
    revision: 2,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_005__Employee_Health_and_Exclusion_Policy.docx_5d540fdd.pdf',
    summary:
      'Mandatory health screening, symptom reporting, and exclusion protocols under Code on Sanitation of the Philippines (PD 856). Features the Big 5 pathogen exclusion rules, pre-shift health checks, and No-Penalty Reporting.',
    keyTakeaways: [
      'PD 856 Compliance: Every employee must possess an annual Sanitary/Health Certificate kept on-site.',
      'Mandatory Reporting Symptoms: Diarrhea, Vomiting, Jaundice (yellowing eyes/skin), Sore throat with fever, Infected wounds/boils.',
      'Exclusion vs. Restriction:',
      '• EXCLUSION (Barred from premises): Vomiting, diarrhea, jaundice, or diagnosis of "Big 5" pathogens (Salmonella, Shigella, E. Coli, Hepatitis A, Norovirus).',
      '• RESTRICTION (No food contact): Sore throat, fever, persistent sneezing/coughing. May perform non-food duties.',
      'Fit-to-Work Criteria: Must be symptom-free for 24 to 48 hours without medication; physician clearance required for Jaundice or Big 5 pathogens.',
      'Daily Pre-shift Health Check: Restaurant Manager visually inspects staff and asks: "Are you feeling well today?".',
      'No-Penalty Reporting: Staff will never be penalized for honestly reporting illness.',
    ],
    quickRules: [
      {
        title: 'Exclusion vs Restriction',
        rule: 'Vomiting/Diarrhea/Jaundice/Big 5 = Stay Home. Sore throat/fever = No food contact.',
        type: 'critical',
      },
      {
        title: 'Big 5 Pathogens',
        rule: 'Salmonella, Shigella, E. Coli, Hepatitis A, Norovirus.',
        type: 'critical',
      },
      {
        title: 'Pre-Shift Check',
        rule: 'Managers must inspect eyes/skin and ask health questions before every shift.',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'Imperial Kitchen Group Inc. prioritizes employee health and guest safety. Any employee who is ill or carrying a communicable disease that can be transmitted through food must be excluded or restricted from food-handling duties. Covers regular, contractual, and third-party staff across all roles.',
      },
      {
        id: '2',
        title: '2. Mandatory Symptoms & Reporting',
        content: 'Employees must immediately report to their Immediate Supervisor (IS):',
        bulletPoints: [
          'Diarrhea',
          'Vomiting',
          'Jaundice (yellowing of eyes and skin)',
          'Sore Throat with Fever',
          'Infected wounds or boils (unless sealed with waterproof bandage and glove)',
        ],
      },
      {
        id: '3',
        title: '3. Exclusion vs. Restriction Directives',
        content: 'Directives based on symptoms:',
        bulletPoints: [
          'Exclusion: If experiencing vomiting, diarrhea, jaundice, or diagnosis of Big 5 pathogens (Salmonella, Shigella, E. Coli, Hepatitis A, Norovirus), employees MUST NOT enter premises.',
          'Restriction: If employee has sore throat, fever, or persistent coughing/sneezing, they may work on non-food tasks but cannot handle food, utensils, or sanitized wares.',
        ],
      },
      {
        id: '4',
        title: '4. Fit-to-Work & Clearance',
        content: 'Requirements to return to food handling:',
        bulletPoints: [
          'Must be asymptomatic for at least 24 to 48 hours without medication.',
          'For Jaundice or confirmed Big 5 pathogens, Medical Clearance from a licensed physician and/or City Health Office is mandatory.',
          'Infected wounds must be completely healed or securely covered with waterproof bandage.',
        ],
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'February 13, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'March 05, 2026', author: 'Marielle Louise Macabale', purpose: 'Updated store manager to restaurant/shift manager' },
      { rev: 2, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    tags: ['Health Exclusion', 'PD 856', 'Big 5 Pathogens', 'Fit to Work', 'Daily Check'],
  },
  {
    id: 'ikqap-006',
    code: 'IKQAP#006',
    title: 'Pest Control Policy',
    type: 'policy',
    category: 'Sanitation & Pest',
    revision: 2,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_006__Pest_Control_Policy.docx_ee181c47.pdf',
    summary:
      'Zero-tolerance policy regarding pests (rodents, insects, birds, vermin). Outlines the 3 pillars: Exclusion (air curtains, door sweeps), Restriction (15cm floor clearance, covered bins), and Destruction (FDA-accredited PCO monthly).',
    keyTakeaways: [
      'Three-Pillar IPM: Exclusion (physical barriers), Restriction (habitat denial), Destruction (licensed PCO).',
      'Air curtains must be operational and TURNED ON during all deliveries.',
      'Door sweeps must block all visible light underneath external doors.',
      'Dry storage: food items must be kept minimum 15cm (6 inches) off floor and away from walls.',
      'Chemical sprays: Staff are strictly prohibited from using domestic aerosol fly sprays in food areas.',
      'Internal traps: mechanical traps (glue boards, snap traps, UV fly zappers) permitted; toxic bait is strictly forbidden inside food zones.',
      'Immediate containment: Pest confirmation triggers immediate suspension of affected zone and quarantine of exposed materials labeled "Not for Human Consumption".',
    ],
    quickRules: [
      {
        title: 'Air Curtains ON',
        rule: 'Air curtains must be running whenever loading dock or exterior doors are open for deliveries.',
        type: 'critical',
      },
      {
        title: '6-Inch Floor Clearance',
        rule: 'All inventory in dry storage must stay at least 15cm (6 inches) off the ground and off walls.',
        type: 'info',
      },
      {
        title: 'No Staff Bug Sprays',
        rule: 'Staff are strictly forbidden from spraying aerosol fly sprays or bug chemicals in food areas.',
        type: 'critical',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'Imperial Kitchen Group Inc. enforces a zero-tolerance policy regarding the presence of pests (rodents, insects, birds, and vermin). Pests are major vectors of Salmonella, Leptospirosis, and E. Coli. Scope applies to internal areas (kitchen, stocks, dining, restrooms) and external grounds (loading bays, waste areas).',
      },
      {
        id: '2',
        title: '2. Integrated Pest Management (IPM) Pillars',
        content: 'Exclusion, Restriction, and Destruction frameworks:',
        bulletPoints: [
          'Exclusion: Self-closing doors with tight door sweeps (no light visible). Intact fly screens on windows/vents. Air curtains active during deliveries. Conduits and pipe gaps sealed with silicone/concrete.',
          'Restriction: Immediate cleaning of debris; overnight clutter prohibited. Food in dry storage kept 15cm (6 inches) off floor and off walls. Garbage bins covered at all times; external dumpsters washed regularly.',
          'Destruction: Chemical pest treatments performed exclusively by licensed, FDA-accredited Pest Control Operator (PCO). Mechanical traps and UV zappers inside; tamper-resistant bait stations anchored on exterior perimeter only.',
        ],
      },
      {
        id: '3',
        title: '3. Sighting Log & Corrective Action',
        content:
          'Pest Sighting Logbook maintained on-site with date, time, location, and pest type. Confirmation of pest activity necessitates immediate operations suspension in the affected zone, quarantining exposed food labeled "Not for Human Consumption", deep sanitization, and PCO remediation.',
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'February 12, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'March 06, 2026', author: 'Marielle Louise Macabale', purpose: 'Updated roles & corrective actions' },
      { rev: 2, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    tags: ['Pest Control', 'IPM', 'Air Curtains', 'PCO', 'Exclusion'],
  },
  {
    id: 'ikqap-007',
    code: 'IKQAP#007',
    title: 'Chemical Storage and Handling Policy',
    type: 'policy',
    category: 'Sanitation & Pest',
    revision: 2,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_007__Chemical_Storage_and_Handling_Policy_.docx__1__ff8c9307.pdf',
    summary:
      'Controls preventing chemical cross-contamination. Mandates dedicated locked chemical cabinets, secondary containment trays, 24/7 accessible SDS master folders, secondary spray bottle labeling, and strict prohibition of empty food containers for chemical storage.',
    keyTakeaways: [
      'Absolute Isolation: Chemicals must NEVER be stored above, next to, or under food, packaging, or utensils.',
      'Dedicated Chemical Station: Specific locked cabinet clearly marked "CHEMICAL STORAGE ONLY".',
      'Secondary Containment: Liquids stored on bottom shelves or spill trays to prevent dripping.',
      'Safety Data Sheets (SDS): Master folder accessible to all employees 24/7 on-site.',
      'Secondary Labeling: Every spray bottle or bucket must clearly show chemical name and dilution strength.',
      'No Repurposing: Never use empty food containers for chemicals, and never use chemical buckets for food.',
      'Contaminated Food: Any food contacted by chemicals must be tagged "DO NOT CONSUME" and discarded immediately.',
    ],
    quickRules: [
      {
        title: 'Never Above Food',
        rule: 'Chemicals must NEVER be stored above, next to, or below food or food packaging.',
        type: 'critical',
      },
      {
        title: 'Secondary Labels',
        rule: 'All transferred spray bottles must show common chemical name and dilution ratio.',
        type: 'warning',
      },
      {
        title: 'Spill Protocol',
        rule: 'Cordon off area immediately, deploy spill kit as directed by SDS, tag food DO NOT CONSUME.',
        type: 'critical',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'Imperial Kitchen Group Inc. is committed to preventing chemical cross-contamination. All chemicals used for cleaning, sanitizing, and maintenance must be approved for food service environments, stored securely, and handled by trained personnel.',
      },
      {
        id: '2',
        title: '2. Storage Protocols',
        content: 'Storage rules across all branches:',
        bulletPoints: [
          'Physical Separation: Dedicated locked cabinet or room marked "CHEMICAL STORAGE ONLY".',
          'Secondary Containment: Liquid chemicals stored on lower shelves or in spill containment trays.',
          'Access Control: High-strength chemicals kept locked, accessible only to authorized personnel.',
          'Personal Items: Employee medicines and hygiene items stored in lockers, separated from food and cleaning supplies.',
        ],
      },
      {
        id: '3',
        title: '3. Labeling, SDS & Handling',
        content: 'Safety guidelines:',
        bulletPoints: [
          'Original Packaging: Chemicals remain in original containers whenever possible.',
          'Secondary Labeling: Spray bottles/buckets must display common name and dilution strength.',
          '24/7 SDS Folder: Master Safety Data Sheet binder must be accessible to all personnel at all times.',
          'PPE: Wear gloves and goggles as specified by SDS.',
          'Spill & Contamination: Cordon off area, use spill kit, tag affected food "DO NOT CONSUME" and discard immediately.',
        ],
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'February 18, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'March 06, 2026', author: 'Marielle Louise Macabale', purpose: 'Updated employee addressing & signatories' },
      { rev: 2, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    tags: ['Chemicals', 'SDS', 'Secondary Containment', 'Dilution', 'Spill Kit'],
  },
  {
    id: 'ikqap-008',
    code: 'IKQAP#008',
    title: 'Approved Supplier Policy',
    type: 'policy',
    category: 'Receiving & Storage',
    revision: 1,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_008__Approved_Supplier_Policy.docx_aa751d5c.pdf',
    summary:
      'Rigorous vendor vetting framework enforcing FDA License to Operate (LTO), Certificate of Product Registration (CPR), on-site facility audits for high-risk meats/dairy, first-three trial deliveries COA verification, and Approved Supplier List (ASL) exclusivity.',
    keyTakeaways: [
      'Procurement strictly restricted to the Approved Supplier List (ASL); sourcing outside ASL is a critical corporate breach.',
      'Mandatory Supplier Documents: FDA License to Operate (LTO), Certificate of Product Registration (CPR), LGU Sanitary Permits.',
      'High-Risk Materials (raw meats, dairy, fresh produce) require mandatory on-site facility audits by QA before approval.',
      'Trial Deliveries: Suppliers must provide Certificates of Analysis (COA) for the first three consecutive trial deliveries.',
      'One Step Back Protocol: Explicit lot numbers, batch codes, and production dates required on all packaging and delivery receipts.',
      'Annual Supplier Performance Review: Failing safety standards or expired LTO triggers immediate delisting from ASL.',
    ],
    quickRules: [
      {
        title: 'ASL Exclusivity',
        rule: 'Sourcing ingredients outside the Approved Supplier List is strictly prohibited.',
        type: 'critical',
      },
      {
        title: 'First 3 Deliveries',
        rule: 'New suppliers must submit Certificate of Analysis (COA) for their first three deliveries.',
        type: 'warning',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'Imperial Kitchen Group Inc. commits to procuring raw materials, ingredients, food-contact packaging, and services exclusively from approved suppliers. Operates in total alignment with Republic Act No. 10611 and Philippine FDA frameworks. Binding for QA, SCM, and Purchasing.',
      },
      {
        id: '2',
        title: '2. Regulatory Prerequisites',
        content: 'All prospective vendors must provide valid copies of:',
        bulletPoints: [
          'FDA License to Operate (LTO) for manufacturers, distributors, importers, and repackers.',
          'Certificate of Product Registration (CPR) for all pre-packaged and processed items.',
          'Local Government Unit (LGU) Sanitary Permits and business registrations.',
          'Third-party certifications (GMP, HACCP, ISO 22000) where applicable.',
        ],
      },
      {
        id: '3',
        title: '3. Approval Process & Delisting',
        content: 'Steps to onboard and evaluate vendors:',
        bulletPoints: [
          'Step 1: Supplier Food Safety Questionnaire & initial desk audit.',
          'Step 2: On-site facility audit by QA for high-risk items (raw meat, seafood, dairy).',
          'Step 3: Trial deliveries with COA verification for the first three deliveries.',
          'Delisting: Failure in food safety audits, expired LTO, or unannounced formulation shifts cause immediate removal from ASL.',
        ],
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'March 03, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    tags: ['Suppliers', 'ASL', 'FDA LTO', 'CPR', 'Traceability'],
  },
  {
    id: 'ikqap-009',
    code: 'IKQAP#009',
    title: 'Receiving Inspection Policy',
    type: 'policy',
    category: 'Receiving & Storage',
    revision: 1,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_009__Receiving_Inspection_Policy.docx_1dc07f97.pdf',
    summary:
      'Frontline defense receiving protocol at loading bays for warehouse and Jiangnan Hotpot store intakes. Mandates pre-unloading documentary checks, vehicle cleanliness inspection, temperature thresholds (<5°C chilled, <-18°C frozen), QA retention sampling, and RED HOLD quarantine sticker protocols.',
    keyTakeaways: [
      'Pre-unloading verification: Review FDA LTO, CPR, LGU permits, and delivery receipts before opening truck doors.',
      'Vehicle Inspection: Clean, odor-free, dedicated solely to food. Zero co-shipment with chemicals or hazardous goods.',
      'Temperature Standards: Perishables must be <5°C; frozen goods must be <-18°C with zero thawing signs.',
      'Packaging: Containers must be sealed, un-dented, and free of leaks or moisture.',
      'QA Retention Sampling: High-risk ingredients (dairy, fruit concentrates) sampled for pH/Brix testing; aliquots archived for product shelf life plus buffer.',
      'Red HOLD Sticker: Products with minor document delays but good physical safety are isolated under quarantine until cleared.',
      'Receiving records retained for at least 2 years or 1 year past product expiry (whichever is longer).',
    ],
    quickRules: [
      {
        title: 'Check Before Unloading',
        rule: 'Inspect delivery documents, vehicle interior, and temperatures BEFORE unloading goods.',
        type: 'critical',
      },
      {
        title: 'Red HOLD Quarantine',
        rule: 'Discrepant goods must be labeled with red HOLD sticker and moved to quarantine area.',
        type: 'warning',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'In strict accordance with RA 10611 and FDA Philippines regulations, Imperial Kitchen Group Inc. enforces a rigorous Receiving Inspection Policy as primary defense against hazards entering inventory. Applies to all incoming raw materials, ingredients, packaging for Jiangnan Hotpot across stores and satellite warehouses.',
      },
      {
        id: '2',
        title: '2. Pre-Unloading & Physical Inspection Criteria',
        content: 'Non-negotiable parameters for receiving:',
        bulletPoints: [
          'Pre-Unloading Docs: FDA LTO, CPR, LGU permits, and traceability invoices.',
          'Vehicle Condition: Odor-free, dedicated to food transport, clean floor and walls, no pest traces.',
          'Package Integrity: Sealed, undamaged, un-dented boxes and cans.',
          'Temperature Control: Chilled <5°C, Frozen <-18°C.',
          'Labeling: English/Filipino label showing product name, manufacturer, ingredients, allergens, batch/lot code, FDA numbers.',
        ],
      },
      {
        id: '3',
        title: '3. QA Retention Sampling & Quarantine',
        content:
          'QA implements random sampling for high-risk items (dairy, concentrates) with analytical pH or Brix testing. Retention samples are stored for full shelf life plus buffer for future investigations. Shipments failing standards result in immediate rejection or quarantine with red "HOLD" stickers and generation of Supplier Feedback Report (IQAF-005).',
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'March 03, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    tags: ['Receiving', 'Inspection', 'Loading Bay', 'Retention Samples', 'Quarantine'],
  },
  {
    id: 'ikqap-010',
    code: 'IKQAP#010',
    title: 'Thawing Policy',
    type: 'policy',
    category: 'Temperature & Cold Chain',
    revision: 1,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_010__Thawing__Policy.docx_95ec48ff.pdf',
    summary:
      'Rigorous controls defining the ONLY 4 approved thawing methods (Refrigerated ≤5°C, Cold Running Water ≤21°C max 4h, Microwave for immediate cooking, Thawing as part of cooking). Explicitly prohibits room-temperature thawing and outlines rework protocols.',
    keyTakeaways: [
      'Room-temperature thawing (countertop, loading dock) is STRICTLY PROHIBITED.',
      'Method 1: Refrigerated Thawing: In dedicated cooler at ≤5°C (41°F) on lowest shelves (2-3 days for large cuts).',
      'Method 2: Cold Running Water: Submerged in original leak-proof packaging under potable water at ≤21°C (70°F) for max 4 hours cumulative.',
      'Method 3: Microwave Thawing: Small portions only, followed immediately by conventional cooking.',
      'Method 4: Thawing as Part of Cooking: Cook directly from frozen and verify the "Kill Step" internal temperature.',
      'Mandatory Labeling: All items in thaw stage must have label: Item Name, Date Stored, Use By Date (48-72h).',
      'Rework Protocols: Cross-contaminated items may be converted to "Cooked-Only" (min 74°C / 165°F kill step); solid beef sub-primals with minor contamination may undergo 1.5cm "Clean Trim".',
    ],
    quickRules: [
      {
        title: 'Only 4 Approved Methods',
        rule: '1. Refrigerator ≤5°C; 2. Cold running water ≤21°C; 3. Microwave (cook immediately); 4. Cook directly.',
        type: 'critical',
      },
      {
        title: 'Thaw Shelf Placement',
        rule: 'Always thaw on bottom shelves of chillers to prevent drips onto other food.',
        type: 'critical',
      },
      {
        title: 'Mandatory Label',
        rule: 'Affix label: Item Name, Date Stored, Use By Date (48-72 hours after thaw).',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Principles of Safe Thawing',
        content:
          'To establish controls that ensure food safety and maintain product quality throughout the entire thawing process at Imperial Kitchen Group Inc. Bacteria multiply rapidly in the Danger Zone between 4°C (40°F) and 60°C (140°F). Leaving frozen food at room temperature is strictly prohibited.',
      },
      {
        id: '2',
        title: '2. The Four Approved Thawing Methods',
        content: 'Only these 4 methods are legally authorized:',
        bulletPoints: [
          '4.1 Refrigerated Thawing: Dedicated cooler maintained at ≤5°C (41°F). Must be on bottom shelves. Larger items take 2-3 days.',
          '4.2 Cold Running Water Thawing: Submerged in original leak-proof pack under running potable water ≤21°C (70°F). Flow must agitate and overflow. Max 4 hours cumulative.',
          '4.3 Microwave Thawing: Small portions only that are cooked immediately after cycle completes.',
          '4.4 Thawing as Part of Cooking: For frozen burger patties, vegetables, or small seafood. Calibrated thermometer must verify the Kill Step.',
        ],
      },
      {
        id: '3',
        title: '3. Compliance, Monitoring & Labeling',
        content: 'Thaw Log and Container Label requirements:',
        bulletPoints: [
          'Thaw Log: Record start timestamp, method used, and internal completion temperature.',
          'Container Label: Must state Item Name, Date Stored, and "Use By" Date (typically 48–72 hours after complete thaw).',
        ],
      },
      {
        id: '4',
        title: '4. Corrective Actions & Rework Protocols',
        content: 'Authorized reconditioning procedures under QA oversight:',
        bulletPoints: [
          'Conversion to "Cooked-Only" Status: If cross-contaminated by raw meat juices, redirect to a validated thermal kill step reaching ≥74°C (165°F). Strictly limited to biological hazards.',
          'Rapid Chill & Repurpose: If discovered thawing in standing water at ≤5°C, pat dry, blast chill, label "Priority Use", and cook within 12 hours.',
          'Clean Trim: For solid muscle beef sub-primals with surface contamination, a trained technician may excise the outer 1.5 cm with a sanitized knife. Prohibited for ground meat or vegetables.',
          'Rework Authorization: Mandatory QA evaluation, Rework Log entry, and microbial swab test (E. coli/Salmonella).',
        ],
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Marielle Louise Macabale', 'Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'April 21, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    tags: ['Thawing', 'Danger Zone', 'Rework', 'Kill Step', 'Thaw Log'],
  },
  {
    id: 'ikqap-011',
    code: 'IKQAP#011',
    title: 'Storage Hierarchy Policy',
    type: 'policy',
    category: 'Receiving & Storage',
    revision: 2,
    effectiveDate: 'June 29, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_011__Storage_Hierarchy_Policy.docx_b051efa8.pdf',
    summary:
      '5S storage framework and vertical refrigeration hierarchy across chillers, hotpot service counters, dry goods racking, and chemicals. Enforces top-to-bottom storage order (RTE on top, fresh produce middle, raw proteins bottom) and 6-inch floor clearance.',
    keyTakeaways: [
      '5S Storage Framework: Sort (Seiri), Set in Order (Seiton), Shine (Seiso), Standardize (Seiketsu), Sustain (Shitsuke).',
      'Vertical Upright Chiller Hierarchy: Top Shelves = Ready-to-Eat / Cooked broths / Sauces; Middle Shelves = Washed fresh produce in perforated baskets; Lower Shelves = Raw sliced meats, meatballs, raw seafood.',
      'Floor Clearance Rule: No box or container on the floor; minimum 6-inch clearance from ground.',
      'Weight Distribution: Heavy bulk items and cooking oil on lowest shelves; lightweight goods on middle/upper tiers.',
      'Under-Counter Backup Chillers: Exact backup replacements packed in labeled, lidded bins with FIFO stock rotation.',
      'Color-Coded Serving Bins: Red, yellow, orange, green, brown containers for line portions.',
      'Chemical Absolute Isolation: Must NEVER be stored in same rack/cabinet as food or utensils; designated locked cabinet required.',
    ],
    quickRules: [
      {
        title: 'Vertical Hierarchy',
        rule: 'Top = RTE / Cooked foods; Middle = Produce; Bottom = Raw proteins & seafood.',
        type: 'critical',
      },
      {
        title: '6-Inch Floor Rule',
        rule: 'Nothing sits directly on the floor. Maintain at least 6 inches clearance.',
        type: 'warning',
      },
      {
        title: 'FIFO Stock Rotation',
        rule: 'New stock placed behind/under existing inventory; pull from front/top.',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & 5S Storage Framework',
        content:
          'Establishes systematic storage hierarchy for all goods within Imperial Kitchen Group Corp. properties. Minimizes waste, maximizes airflow, and enforces 5S on every shift: Sort (Seiri), Set in Order (Seiton), Shine (Seiso), Standardize (Seiketsu), and Sustain (Shitsuke with 10-minute nightly manager walkthrough).',
      },
      {
        id: '2',
        title: '2. Vertical Storage Hierarchy (Upright Chillers)',
        content: 'Layering from top to bottom based on hazard levels:',
        bulletPoints: [
          'Top Shelves (Ready-to-Eat / Prepared): Cooked broths, dipping sauce blends, condiments, pre-portioned cooked sides in sealed lidded containers.',
          'Middle Shelves (Fresh Produce & Leafy Greens): Washed and portioned vegetables in uniform, perforated plastic baskets.',
          'Lower Shelves / Dedicated Units (Raw Proteins): Raw sliced meats, hotpot meatballs, raw seafood. Raw proteins must NEVER be placed above cooked items or produce.',
        ],
      },
      {
        id: '3',
        title: '3. Service Line, Dry Goods & Chemical Storage',
        content: 'Standards across areas:',
        bulletPoints: [
          'Hotpot Service Line: Stainless steel gastronorm pans inset into chilled prep lines; covered with wrap/lids during off-peak.',
          'Under-Counter Chillers: Exact backups in clear, labeled, lidded bins under FIFO rotation.',
          'Dry Goods Racking: Multi-tier heavy steel shelving with 6-inch clearance from floor; heavy items on lower tiers.',
          'Chemical Storage: Absolute isolation from food, food-contact utensils, and single-use packaging. Designated locked cabinet marked "CHEMICAL STORAGE ONLY".',
        ],
      },
    ],
    tables: [
      {
        title: 'Vertical Storage Shelf Hierarchy',
        headers: ['Shelf Level', 'Allowed Items', 'Packaging / Containment'],
        rows: [
          ['Top Shelves', 'Ready-to-Eat (RTE), Cooked broths, dipping sauces, cooked sides', 'Clear, tightly sealed lidded plastic containers'],
          ['Middle Shelves', 'Fresh Produce, washed vegetables, leafy greens', 'Uniform perforated plastic baskets allowing airflow'],
          ['Lower Shelves / Dedicated Freezers', 'Raw sliced meats, hotpot meatballs, raw seafood', 'Sealed food-grade containers, never above cooked/produce'],
        ],
      },
      {
        title: 'Storage Corrective Actions & Resolution Timeline',
        headers: ['Non-Compliance Issue', 'Immediate Corrective Action', 'Target Timeline', 'Responsible Party'],
        rows: [
          ['Miszoned Stock', 'Transfer items to designated areas.', 'Within 24 hours', 'Warehouse / Kitchen Staff'],
          ['Expired / Damaged Stock', 'Immediately log in Disposal Log and discard entirely.', 'Immediate', 'Warehouse / Kitchen Staff'],
          ['Missing / Defaced Labels', 'Print/apply standardized label (Name, PD/ED, Initials).', 'Within 24 hours', 'Warehouse / Kitchen Staff'],
          ['Chemical Misalignment', 'Remove chemical and place in designated locked area.', 'Immediate', 'Warehouse / Kitchen Staff'],
          ['Cold Chain Temp Breach', 'Notify Shift Manager; transfer vulnerable stock.', 'Immediate', 'Shift Manager / Staff'],
        ],
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Aries Tambasacan (Ops)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'April 28, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
      { rev: 1, date: 'June 15, 2026', author: 'Celine Joy Sanchez', purpose: 'Revised guidelines, corrective actions and list of documents' },
      { rev: 2, date: 'June 16, 2026', author: 'Celine Joy Sanchez', purpose: 'Added 5S Storage Framework implementation' },
    ],
    tags: ['Storage Hierarchy', '5S', 'FIFO', 'Chillers', 'Chemical Isolation'],
  },
  {
    id: 'ikqap-012',
    code: 'IKQAP#012',
    title: 'Personal Hygiene and Uniform Policy',
    type: 'policy',
    category: 'Uniform & Visitor',
    revision: 2,
    effectiveDate: 'July 13, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_012__Personal_Hygiene_and_Uniform_Policy.docx_4a26520d.pdf',
    summary:
      'Comprehensive grooming, attire, uniform specifications by department (Head Office, Managers, FOH Servers/Cashiers/Dispatchers, BOH Kitchen/Dishwasher, Maintenance), footwear standards, and progressive corrective action ladder.',
    keyTakeaways: [
      'Grooming Standards: Daily bathing, deodorant, clean trimmed nails, no heavy scents/perfumes, hair enclosed in nets/caps, facial hair trimmed or snooded.',
      'Uniform Conformance: Clean, wrinkle-free, no unauthorized pins/patches/styling.',
      'Department Specifications: Distinct uniforms for Head Office, Restaurant & Shift Managers, FOH Cashier/Server/Sauce Master, FOH Dispatcher (half apron), BOH Kitchen (white shirt, full apron), BOH Dishwasher (black shirt, full apron), Maintenance (polo shirt).',
      'Footwear: Closed-toe, clean, non-slip or steel-toe safety footwear mandatory.',
      'Disciplinary Ladder: Minor (Wrinkled uniform) -> Reprimand / Plan / Final Warning (1-2 days suspension); Major (Non-compliant uniform / open-toe) -> Reprimand / Plan / Final Warning (2-4 days suspension); Critical (Long nails, fake lashes/nails, outside clothes in prep zone) -> Written Reprimand + Plan / Final Warning & 3-7 days suspension or Termination.',
    ],
    quickRules: [
      {
        title: 'Safety Footwear',
        rule: 'Closed-toe, non-slip safety shoes are mandatory on all kitchen and service shifts.',
        type: 'critical',
      },
      {
        title: 'No Jewelry / False Nails',
        rule: 'No artificial nails, false lashes, or jewelry (only plain wedding band allowed).',
        type: 'critical',
      },
      {
        title: 'Pre-Shift Inspection',
        rule: 'Managers conduct Daily Shift Inspection Checklist before employees step onto the floor.',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Scope',
        content:
          'Establishes consistent standards for professional appearance, personal hygiene, and uniform compliance across Imperial Kitchen Group Inc. Aligns with brand identity and regulatory food safety standards under RA 10611 and PD 856.',
      },
      {
        id: '2',
        title: '2. Department Uniform Specifications',
        content: 'Official approved company attire:',
        bulletPoints: [
          'Head Office: Corporate polo with logo for men and women.',
          'Restaurant & Shift Managers: Black collared corporate polo with khaki trousers (Restaurant Manager); White collared polo with khaki trousers (Shift Manager).',
          'Front of House (Cashier, Server, Receptionist, Sauce Master): Red-and-black collared uniform with front apron.',
          'FOH Dispatcher: Red crew-neck company shirt, black trousers, red cap, half apron.',
          'Back of House Kitchen: White company shirt, white hairnet/cap, black trousers, full black branded apron.',
          'Back of House Dishwasher: Black company tee, black cap, black trousers, full waterproof apron.',
          'Maintenance: Red collared polo shirt, durable utility trousers, safety steel-toe shoes.',
        ],
      },
      {
        id: '3',
        title: '3. Corrective Action & Disciplinary Matrix',
        content: 'Severity levels and consequences:',
        bulletPoints: [
          'Minor Non-Conformance (Wrinkled uniform, fashion pins): 1st: Written Reprimand & retraining; 2nd: QA Corrective Action Plan; 3rd: Final Warning or 1-2 days unpaid suspension.',
          'Major Non-Conformance (Open-toe shoes, strong perfume): 1st: Written Reprimand & retraining; 2nd: QA Action Plan; 3rd: Final Warning or 2-4 days unpaid suspension.',
          'Critical Non-Conformance (Long/dirty nails, fake nails/lashes, outside clothes in prep area): 1st: Immediate Written Reprimand + QA Action Plan; 2nd: Final Warning, 3-7 days unpaid suspension or immediate Termination.',
        ],
      },
    ],
    tables: [
      {
        title: 'Personal Hygiene & Uniform Disciplinary Matrix',
        headers: ['Severity Level', 'Nature of Non-Conformance', 'Disciplinary Progression'],
        rows: [
          [
            'Minor',
            'Internal process failures (wrinkled uniform, fashion pins/patches, missing shift checklist)',
            '1st: Written Reprimand & Retraining; 2nd: QA Corrective Plan; 3rd: Final Warning / 1-2 Days Suspension',
          ],
          [
            'Major',
            'Deviation from quality standards (open-toe footwear, non-compliant uniform, heavy perfume/cologne)',
            '1st: Written Reprimand & Retraining; 2nd: QA Corrective Plan; 3rd: Final Warning / 2-4 Days Suspension',
          ],
          [
            'Critical',
            'Regulatory safety violations (fake lashes/nails, long unmanicured nails, wearing outside clothes in prep zone)',
            '1st: Immediate Written Reprimand & QA Action Plan; 2nd: Final Warning / 3-7 Days Suspension or Termination',
          ],
        ],
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'April 24, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
      { rev: 1, date: 'June 22, 2026', author: 'Celine Joy Sanchez', purpose: 'Revised the Corrective Action' },
      { rev: 2, date: 'June 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added proper employee uniform specifications & images' },
    ],
    tags: ['Uniform', 'Personal Hygiene', 'Grooming', 'Dress Code', 'Discipline'],
  },
  {
    id: 'ikqap-013',
    code: 'IKQAP#013',
    title: 'Visitor and Contractor Policy',
    type: 'policy',
    category: 'Uniform & Visitor',
    revision: 1,
    effectiveDate: 'July 13, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_013__Visitor_and_Contractor_Policy.docx_e771ab1b.pdf',
    summary:
      'Strict visitor regulation framework protecting facility security and food safety. Outlines mandatory health screening, button count inspections, empty-pocket policies, prohibition of personal electronic gadgets, and visitor logbook signing.',
    keyTakeaways: [
      'Scope: Applies to business partners, contractors, government officials, suppliers, and personal guests.',
      'Entry Screening: Security checks health and body temperature; bar any individual with communicable disease or open wounds.',
      'Button Count & Pocket Screening: Inspect clothing buttons before entry and verify upon departure; shirt pockets must be emptied of loose items.',
      'Prohibited Items: Mobile phones, cameras, personal glass items, chewing gum, candy, and jewelry are banned from production zones.',
      'Mandatory Gear: Head caps, hairnets, beard snoods, socks, company-provided footwear, and lint-rolled lab gowns.',
      'Visitor Logbook: Must be signed and updated at arrival and departure for full traceability.',
    ],
    quickRules: [
      {
        title: 'Button Count',
        rule: 'Inspect and count all buttons on clothing before entry and verify count upon exit.',
        type: 'warning',
      },
      {
        title: 'No Gadgets in Plant',
        rule: 'Cameras and mobile phones are strictly forbidden inside food processing areas.',
        type: 'critical',
      },
      {
        title: 'Empty Pockets',
        rule: 'All shirt and front pockets must be emptied of pens, coins, and loose items before entry.',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Responsibilities',
        content:
          'Regulates visitor entry to ensure product safety, quality, and workplace security at Imperial Kitchen Group Inc. Security personnel enforce access controls; Restaurant/Shift Managers guide visitors and count carried items; QA monitors visitor lockers and logs.',
      },
      {
        id: '2',
        title: '2. Visitor Regulations & Hygiene Protocols',
        content: 'Rules for all visiting guests and contractors:',
        bulletPoints: [
          'Hygiene: Spitting, littering, and urinating outside designated restrooms are strictly banned.',
          'Tobacco & Food: Smoking only in designated areas. Eating/drinking restricted to canteen; gum/candy forbidden in production zones.',
          'Electronic Gadgets: Cameras and mobile phones are strictly prohibited within the production plant.',
          'Attire & Personal Effects: Jewelry prohibited; fingernails short; perfume/cosmetics forbidden; pockets emptied.',
          'Protective Wear: Hairnets, beard covers, socks, company footwear, and lint-rolled lab gowns mandatory.',
          'Button Count: Clothes inspected for buttons; count verified before entry and after exit.',
        ],
      },
      {
        id: '3',
        title: '3. Documentation & Verification',
        content: 'Maintained records include: Visitors Logbook, Loose Item Monitoring Log, and Corrective Action Reports (CAR).',
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Marielle Louise Macabale', 'Jackquelyn Aquino (SCM)', 'Aries Tambasacan (Ops)', 'Anthony Co (HR)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'April 16, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    tags: ['Visitors', 'Contractors', 'Access Control', 'Button Count', 'Gowning'],
  },
  {
    id: 'ikqap-014',
    code: 'IKQAP#014',
    title: 'Preventive Maintenance Policy',
    type: 'policy',
    category: 'Operations & Maintenance',
    revision: 2,
    effectiveDate: 'July 6, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_014__Preventive_Maintenance_Policy.docx_77f9dbf5.pdf',
    summary:
      'Governs maintenance of production lines, high-capacity chillers, and mechanical systems. Highlights the Master Maintenance Schedule (MMS), NSF H1 food-grade lubricants, NIST calibration traceability, Orange Tag product hold, and the 4-step Clean Break protocol.',
    keyTakeaways: [
      'Master Maintenance Schedule (MMS): Prioritizes Critical Equipment housing Time/Temperature Control for Safety (TCS) foods.',
      'Food-Grade Lubricants: Only NSF H1 food-grade lubricants are permitted in production areas; stored in labeled cabinets.',
      'No Temporary Fasteners: Tape, wire, and zip-ties are strictly forbidden on machinery.',
      'Monitoring Equipment: Devices measuring CCPs must be calibrated traceable to NIST.',
      'Orange Tag Protocol: Immediate production halt and orange-tagging of items produced since last passed PM check during failure.',
      'Clean Break Protocol: Mechanical Repair -> SSOP Sanitation -> QA Verification (ATP swab/visual) -> CAR Sign-off before restarting.',
      'Records Retention: PM logs, work orders, calibration certificates retained for minimum 2 years.',
    ],
    quickRules: [
      {
        title: 'NSF H1 Lubricants Only',
        rule: 'Only NSF H1 registered food-grade lubricants are permitted on food processing machinery.',
        type: 'critical',
      },
      {
        title: 'Clean Break Protocol',
        rule: 'Machinery cannot restart after repair without SSOP cleaning, ATP swab verification, and CAR sign-off.',
        type: 'critical',
      },
      {
        title: 'Orange Tag Isolation',
        rule: 'Products exposed during mechanical breakdown are orange-tagged and placed on safety hold.',
        type: 'warning',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Scope',
        content:
          'Ensures all facility equipment—including production lines, coolers, HVAC, and material handling gear—operates at peak efficiency and safety. Prevents mechanical failures that cause temperature deviations or physical contamination.',
      },
      {
        id: '2',
        title: '2. Master Maintenance Schedule & Protocols',
        content: 'Operational guidelines:',
        bulletPoints: [
          'MMS Scheduling: TCS refrigeration units prioritized as Critical Equipment.',
          'Food Safety Rules: Technicians log all tools and parts; temporary fasteners (tape/wire) banned.',
          'Lubricants: Only NSF H1 food-grade lubricants stored away from food contact zones.',
          'Calibration: CCP measuring devices calibrated traceable to NIST.',
          'Spare Parts: Critical gaskets, seals, and sensors stored on-site in sealed original packaging.',
        ],
      },
      {
        id: '3',
        title: '3. Corrective Action & Clean Break Protocol',
        content: 'Procedure following equipment failure:',
        bulletPoints: [
          'Identification & Isolation: Production halted immediately; affected batches Orange-Tagged and quarantined.',
          'Root Cause Analysis (RCA): Categorize failure as Human Error, Material Failure, or Design Issue.',
          'Restoration ("Clean Break"): 1. Food-grade repair; 2. SSOP sanitation; 3. QA ATP swab/visual check; 4. Countersigned CAR sign-off.',
        ],
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'April 21, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
      { rev: 2, date: 'June 4, 2025', author: 'Celine Joy Sanchez', purpose: 'Revised facility and warehouse manager roles' },
    ],
    tags: ['Preventive Maintenance', 'MMS', 'NSF H1', 'Clean Break', 'Orange Tag'],
  },
  {
    id: 'ikqap-015',
    code: 'IKQAP#015',
    title: 'Towel Management Policy',
    type: 'policy',
    category: 'Sanitation & Pest',
    revision: 1,
    effectiveDate: 'July 13, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_015__Towel_Management_Policy.docx_d813b799.pdf',
    summary:
      'Absolute segregation framework for service and cleaning towels across Imperial Kitchen Group Inc. Enforces the 5-color matrix (White = Clean Wares, Yellow = Handwash Sinks, Blue = FOH Dining, Green = Kitchen/Prep, Red = Restrooms ONLY), in-use submersion, and thermal laundering.',
    keyTakeaways: [
      'Color Coding Matrix:',
      '• ⚪ White: Clean kitchen wares, cutlery, glassware, utensils ONLY. Never raw food.',
      '• 🟡 Yellow: Dedicated employee handwashing sinks perimeter ONLY.',
      '• 🔵 Blue: Front of House guest tables, dining booths, bar counters.',
      '• 🟢 Green: Back of House kitchen stations, prep tables, hot lines.',
      '• 🔴 Red: Restroom facilities, toilets, sinks ONLY. Under NO circumstances may a red towel leave restrooms.',
      'Cross-Zone Breach: Introducing a Red or Green towel into White or Blue zones constitutes an immediate major health code breach.',
      'In-Use Submersion: Towels must remain fully submerged in approved sanitizing solution between uses. Never draped over aprons or shoulders.',
      'Thermal Laundering: Launder separate from mops/uniforms; 45°C-50°C wash; static hot water bath at ≥71°C (160°F) for min 25 minutes; dry 100% bone-dry.',
      'Sanitizer buckets monitored every 2 hours and logged.',
    ],
    quickRules: [
      {
        title: '🔴 Red = Restroom ONLY',
        rule: 'Red towels must NEVER cross the restroom threshold into dining or kitchen areas.',
        type: 'critical',
      },
      {
        title: '⚪ White = Clean Wares ONLY',
        rule: 'White towels are strictly reserved for polishing and drying sanitized kitchen wares and utensils.',
        type: 'critical',
      },
      {
        title: 'Submerged Between Uses',
        rule: 'Never drape towels over shoulders or aprons; keep fully submerged in sanitizer bucket.',
        type: 'warning',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Scope',
        content:
          'Establishes standardized operational guidelines for deployment, use, segregation, and sanitation of service and cleaning towels within Imperial Kitchen Group Inc. properties. Mitigates biological and chemical cross-contamination in alignment with HACCP and local health codes.',
      },
      {
        id: '2',
        title: '2. The 5-Color Towel Matrix',
        content: 'Strict mandatory assignments:',
        bulletPoints: [
          '⚪ White (Wares): Reserved exclusively for handling, polishing, or drying clean sanitized smallwares, glassware, cutlery, and cooking utensils.',
          '🟡 Yellow (Handwashing Area): Strictly for dedicated employee handwashing sinks and sink basin perimeters.',
          '🔵 Blue (Front of House): Utilized for guest-facing dining tables, host stands, bar counters, booths, service ledges.',
          '🟢 Green (Kitchen & Prep Lines): Dedicated to general BOH environments, hot line stations, prep tables, and cutting boards.',
          '🔴 Red (Restroom): Strictly confined to restroom facilities for cleaning sinks, fixtures, and vanities. Never enters food zones.',
        ],
      },
      {
        id: '3',
        title: '3. Handling, Laundering & Sanitization',
        content: 'Storage and thermal wash parameters:',
        bulletPoints: [
          'Storage: Clean towels stored in covered elevated plastic bins away from chemicals.',
          'In-Use: Towels must be kept fully submerged in sanitizer solution at exact PPM when not wiping.',
          'Sanitizer Refresh: Solution refreshed every 2 hours or as organic load demands.',
          'Laundering: Pre-wash 45°C-50°C with industrial detergent; static hot bath at ≥71°C (160°F) for at least 25 minutes; hung until 100% bone-dry.',
        ],
      },
      {
        id: '4',
        title: '4. Disciplinary Action for Breaches',
        content:
          'Minor: Leaving towel draped on table or missing log -> Written Reprimand / Plan / 1-2 days suspension. Major: Leaving green towel on prep table uncovered or dirty bin escape -> Written Reprimand / Plan / 2-3 days suspension. Critical: Bringing red restroom towel or green kitchen towel into white/blue zones -> Immediate Incident Report / Final Warning & 3-7 days suspension or Termination.',
      },
    ],
    tables: [
      {
        title: 'Official Towel Color Coding Matrix',
        headers: ['Color', 'Designated Area', 'Approved Usage & Critical Constraints'],
        rows: [
          ['⚪ White', 'Kitchen Wares', 'Polishing and drying clean, sanitized smallwares, glasses, and utensils. Never touches raw food.'],
          ['🟡 Yellow', 'Handwash Sinks', 'Drying clean hands at handwashing sinks or wiping sink basin perimeter only.'],
          ['🔵 Blue', 'Front of House (FOH)', 'Guest dining tables, host stand, bar counters, booths. Kept discrete and clean.'],
          ['🟢 Green', 'Kitchen & Prep Lines (BOH)', 'General BOH hot lines, prep tables, cutting board perimeters. Rotate between food groups.'],
          ['🔴 Red', 'Restroom & Sanitary Facilities', 'Strictly restricted to comfort rooms and toilets. NEVER allowed to enter food or dining zones.'],
        ],
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Marielle Louise Macabale', 'Jackquelyn Aquino (SCM)', 'Aries Tambasacan (Ops)', 'Anthony Co (HR)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'May 22, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
      { rev: 1, date: 'June 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Revised corrective actions and laundering standards' },
    ],
    quizQuestions: [
      {
        question: 'Which towel color is strictly reserved for drying sanitized glassware and cutlery?',
        options: ['Blue', 'Green', 'White', 'Yellow'],
        answerIndex: 2,
        explanation: 'White towels are reserved exclusively for clean, sanitized smallwares, glassware, cutlery, and cooking utensils.',
      },
      {
        question: 'What happens if a Red restroom towel is brought into the kitchen or dining area?',
        options: ['It is allowed if rinsed', 'Immediate critical health code breach resulting in severe disciplinary action', 'Minor coaching only', 'Nothing if dry'],
        answerIndex: 1,
        explanation: 'Introducing a red towel into food/beverage zones is a critical non-conformance and major health code breach.',
      },
    ],
    tags: ['Towels', 'Color Coding', 'Sanitation', 'Cross-Contamination', 'PPM'],
  },
  {
    id: 'ikqap-016',
    code: 'IKQAP#016',
    title: 'Records Retention Policy',
    type: 'policy',
    category: 'Corporate & Quality',
    revision: 1,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_016__Record_Retention_Policy.docx_bc78ff83.pdf',
    summary:
      'Standardized retention timelines and disposal protocols under RA 10611 for food safety management system (FSMS) documents, including daily temperature logs (1 yr), supplier COAs (2 yrs/shelf life+6mo), sanitation reports (2 yrs), and incident/audit logs (3 yrs).',
    keyTakeaways: [
      'Traceability & Supplier Records: Delivery receipts, invoices, COAs, import permits retained for 2 years or product shelf life + 6 months (whichever is longer).',
      'Daily Operations Logs: Temperature logs, daily prep logs, chemical dilution logs retained for 1 year.',
      'Sanitation & Maintenance: Pest control reports, water potability tests, deep cleaning checklists kept for 2 years.',
      'Personnel & Hygiene: LGU health certificates, training certifications, illness logs kept during employment + 1 year.',
      'Incident Management: Recall logs, customer complaints, regulatory audit reports kept for 3 years.',
      'Active vs. Archival Storage: 0-6 months kept on-site in organized binders for unannounced FDA/LGU audits; 6+ months transferred to secure archive/cloud.',
      'Destruction: Certified digital deletion or cross-cut shredding at end of cycle.',
    ],
    quickRules: [
      {
        title: 'Active On-Site Binders',
        rule: 'Current 0-6 months logs must be kept in on-site binders ready for unannounced health audits.',
        type: 'warning',
      },
      {
        title: 'Cross-Cut Shredding',
        rule: 'Expired confidential records must be disposed of via cross-cut shredding or certified deletion.',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'In strict accordance with Republic Act No. 10611, Imperial Kitchen Group Inc. establishes a systematic and legally compliant framework for creation, maintenance, storage, and secure disposal of FSMS documentation. Proves due diligence in protecting consumers.',
      },
      {
        id: '2',
        title: '2. Standard Retention Schedule',
        content: 'Mandated storage periods:',
        bulletPoints: [
          'Supplier & Traceability (DRs, Invoices, COAs, Import Permits): 2 years or shelf life + 6 months (whichever is longer).',
          'Daily Operations (Temperature logs, prep logs, dilution logs): 1 year.',
          'Sanitation & Maintenance (Pest control reports, water potability, deep cleaning): 2 years.',
          'Personnel & Hygiene (LGU Health Certs, training certificates, illness logs): Duration of employment + 1 year.',
          'Incident Management (Recall logs, illness complaints, audit reports, CAPAs): 3 years.',
        ],
      },
      {
        id: '3',
        title: '3. Storage & Disposal Protocols',
        content:
          'Active storage (0-6 months) in accessible on-site binders. Archival storage (6+ months) in moisture-proof physical storage or cloud backup. Destruction must be via cross-cut shredding or certified digital deletion.',
      },
    ],
    tables: [
      {
        title: 'Official Document Retention Schedule',
        headers: ['Record Category', 'Specific Documents Included', 'Mandatory Retention Period'],
        rows: [
          ['Supplier & Traceability', 'Delivery Receipts (DR), Invoices, Certificates of Analysis (COA), Import Permits', '2 years or shelf life + 6 months (longer)'],
          ['Daily Operations', 'Daily Temperature Logs, Prep Logs, Chemical Dilution Logs', '1 year'],
          ['Sanitation & Maintenance', 'Pest Control Service Reports, Water Potability Tests, Deep Cleaning Logs', '2 years'],
          ['Personnel & Hygiene', 'LGU Health Certificates, Training Records, Illness Logs', 'Duration of employment + 1 year'],
          ['Incident & Governance', 'Customer Complaints, Recall Logs, Regulatory Audits, CAPA Reports', '3 years'],
        ],
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'March 10, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
    ],
    tags: ['Record Retention', 'Compliance', 'Audit Trail', 'RA 10611', 'Storage Schedule'],
  },
  {
    id: 'ikqap-017',
    code: 'IKQAP#017',
    title: 'Glass and Brittle Plastic Policy',
    type: 'policy',
    category: 'Operations & Maintenance',
    revision: 2,
    effectiveDate: 'July 13, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_017__Glass_and_Brittle_Plastic_Policy.docx_32eed9fe.pdf',
    summary:
      'Eliminates foreign body physical contamination from glass, ceramic, and brittle plastics. Enforces zero personal glass in food zones, master glass register with shatterproof covers, and the 4-step Breakage Protocol with 3-meter quarantine radius.',
    keyTakeaways: [
      'Zero Personal Glass: Drinking glasses, mirrors, glass perfume/cologne bottles are strictly banned from food preparation zones.',
      'Essential Operational Glass: Permitted gauges and windows must be recorded in the Master Glass Register and fitted with shatterproof films.',
      'Daily Shift Inspection: Inspect acrylic dispensers and overhead light covers for cracks before they degrade into hazards.',
      'Glass & Brittle Plastic Breakage 4-Step Protocol:',
      '1. Immediate Shutdown: Halt all food production in affected zone immediately.',
      '2. Three-Meter Quarantine: Cordon off area with a strict 3-meter (10-ft) radius; all food and packaging inside this zone is treated as contaminated.',
      '3. Segregated Cleanup: Use dedicated color-coded tools and deposit shards into labeled "Sharps" container.',
      '4. Written Supervisor Clearance: Manager inspects and signs Breakage Incident & Cleanup Report (CAR) before work resumes.',
    ],
    quickRules: [
      {
        title: '3-Meter Quarantine Radius',
        rule: 'Any glass or brittle plastic breakage requires an immediate 3-meter quarantine; discard exposed food.',
        type: 'critical',
      },
      {
        title: 'No Personal Glass',
        rule: 'Drinking glasses, mirrors, and perfume bottles are banned in all food handling areas.',
        type: 'critical',
      },
      {
        title: 'Dedicated Sharps Box',
        rule: 'All collected shards must be disposed of in a designated, puncture-proof Sharps container.',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Material Restrictions',
        content:
          'Eliminates physical contamination risks from glass, ceramic, and brittle plastics within food handling environments at Imperial Kitchen Group Inc. Personal glass is banned; essential gauges/windows must have shatterproof covers; acrylic dispensers must undergo daily crack inspections.',
      },
      {
        id: '2',
        title: '2. Four-Step Breakage Protocol',
        content: 'Procedure following glass or brittle plastic failure:',
        bulletPoints: [
          'Step 1 (Immediate Shutdown): Stop all food prep on active lines to prevent spreading airborne/structural shards.',
          'Step 2 (Isolation & 3-Meter Quarantine): Cordon off 3-meter radius; treat all exposed food/packaging as contaminated and discard.',
          'Step 3 (Segregated Cleanup): Use dedicated cleanup gear (not general brooms); place fragments into designated "Sharps" container.',
          'Step 4 (Supervisor Sign-off): Manager conducts visual inspection and completes Breakage Incident & Cleanup Report (CAR).',
        ],
      },
      {
        id: '3',
        title: '3. Disciplinary Actions',
        content:
          'Minor (Failing to fill daily checklist): Reprimand -> Action Plan -> Suspension 1-2 days. Major (Bringing personal glass/perfume into kitchen): Reprimand -> Action Plan -> Suspension 2-4 days. Critical (Failing to immediately halt food production following glass breakage): Immediate Reprimand + QA Action Plan -> Final Warning & 1-5 days suspension or Termination.',
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Marielle Louise Macabale', 'Jackquelyn Aquino (SCM)', 'Aries Tambasacan (Ops)', 'Anthony Co (HR)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'April 24, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
      { rev: 2, date: 'June 23, 2026', author: 'Celine Joy Sanchez', purpose: 'Revised the Corrective Action' },
    ],
    tags: ['Glass Policy', 'Brittle Plastics', 'Sharps Container', '3-Meter Radius', 'Breakage CAR'],
  },
  {
    id: 'ikqap-018',
    code: 'IKQAP#018',
    title: 'Good Manufacturing Practices Policy',
    type: 'policy',
    category: 'Corporate & Quality',
    revision: 4,
    effectiveDate: 'July 13, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_018__Good_Manufacturing_Practices.docx_b46b6303.pdf',
    summary:
      'The foundational Good Manufacturing Practices (GMP) framework for the FSMS. Enforces the 20-second 6-step handwashing protocol, restroom Double Wash method, comfort room self-closing isolation, twice-per-shift surface sanitizing, and bifurcated competency verification.',
    keyTakeaways: [
      'Universal Scope: Applies to all employees, contractors, visitors across receiving, storage, commissary, line prep, and dining.',
      'Mandatory Handwashing: 20-second 6-step method before shifts, after handling refuse/chemicals, and after touching hair/face.',
      'Restroom "Double Wash" Method: Employees must wash hands thoroughly in the restroom and perform a second wash at the handwashing sink upon re-entering kitchen.',
      'Surface Sanitization: All food-contact surfaces must be cleaned and sanitized at least TWICE PER SHIFT.',
      'Clean Zone RPC Rule: Reusable plastic containers (RPCs) must be thoroughly sanitized before crossing into the facility Clean Zone.',
      'Comfort Room Compliance: Solid self-closing doors that do not open directly into food prep zones; mechanical outward exhaust ventilation; foot-pedal covered trash bins.',
      'Bifurcated Competency Assessment: Theoretical written/digital exam followed by practical supervisory verification on handwashing and chemical dilutions.',
    ],
    quickRules: [
      {
        title: 'Restroom Double Wash',
        rule: 'Wash hands in restroom, then perform second wash at kitchen sink before touching food.',
        type: 'critical',
      },
      {
        title: 'Sanitize 2x Per Shift',
        rule: 'All food contact surfaces must be sanitized at minimum twice per shift.',
        type: 'info',
      },
      {
        title: 'No Jewelry / Polish',
        rule: 'No artificial nails, heavy makeup, perfumes, or jewelry (plain wedding ring only).',
        type: 'critical',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Policy Statement & Scope',
        content:
          'Imperial Kitchen Group Inc. delivers safe, high-quality, legally compliant service through GMP. Serves as foundational framework for our Food Safety Management System (FSMS), ensuring raw material intake to final dining table is strictly hygienic.',
      },
      {
        id: '2',
        title: '2. Personnel Hygiene & Conduct',
        content: 'Behavioral mandates:',
        bulletPoints: [
          '20-Second Handwashing: 6-step method with warm water and antibacterial soap.',
          'The Restroom "Double Wash": Wash in restroom, then wash again at production handwash station.',
          'Jewelry & Grooming: Plain wedding band only; no earrings, bracelets, watches, false nails, or false eyelashes.',
          'Controlled Zone Conduct: Eating, drinking, smoking, and phone use strictly forbidden in production zones.',
        ],
      },
      {
        id: '3',
        title: '3. Facility Sanitation & Comfort Rooms',
        content: 'Structural and ventilation standards:',
        bulletPoints: [
          'Facility Materials: Food-safe, durable surfaces with positive drainage.',
          'Comfort Room Isolation: Solid self-closing doors, negative air exhaust venting outdoors, foot-pedal waste receptacles.',
          'Surface Sanitization: Food-contact surfaces sanitized twice per shift; daily mechanical drain scrubbing.',
          'Clean Zone RPCs: Reusable containers sanitized before entering clean processing zones.',
        ],
      },
      {
        id: '4',
        title: '4. Training & Bifurcated Competency Verification',
        content:
          'Workforce competency is validated via a bifurcated assessment: 1. Theoretical written/digital examination testing knowledge of thresholds; 2. Practical observation of high-stakes technical tasks (chemical dilutions, 6-step handwashing) certified by direct supervisors.',
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Marielle Louise Macabale', 'Jackquelyn Aquino (SCM)', 'Aries Tambasacan (Ops)', 'Anthony Co (HR)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'February 26, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'March 06, 2026', author: 'Marielle Louise Macabale', purpose: 'Standardized addressing to employees; added comfort room clause' },
      { rev: 2, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
      { rev: 3, date: 'June 22, 2026', author: 'Celine Joy Sanchez', purpose: 'Added roles for Warehouse, Commissary, Shift/Restaurant Managers' },
      { rev: 4, date: 'June 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added progressive corrective actions' },
    ],
    tags: ['GMP', 'Double Wash', 'Sanitation', 'Competency', 'Biofilms', 'Drains'],
  },
  {
    id: 'ikqap-019',
    code: 'IKQAP#019',
    title: 'Food Fraud Policy',
    type: 'policy',
    category: 'Corporate & Quality',
    revision: 1,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_019__Food_fraud.docx_62d15544.pdf',
    summary:
      'Prevents Economically Motivated Adulteration (EMA) and mandates strict Truth in Menu compliance under RA 10611 and ISO/TS 22002-2:2013. Regulates species substitution (Wagyu, Angus, premium seafood) and unauthorized ingredient swaps.',
    keyTakeaways: [
      'Truth in Menu Mandate: All descriptions of origin, grade, cut, and branding must be 100% accurate.',
      'Zero-tolerance for food fraud: Intentional ingredient substitution or dilution results in immediate disciplinary action.',
      'High-Risk Target Categories: Premium meats (Wagyu, Angus beef), seafood species, top-shelf spirits, cooking oils.',
      'Reconciliation at Receiving: BOH verifies brand names, meat cuts, species specifications against purchase orders.',
      'Ingredient Shortages: If substitution is necessary due to shortage, guests must be informed prior to service or item marked unavailable. Never substitute quietly.',
      'Wet Market Sourcing: Immediate on-site physical appraisal required for ingredients sourced from high-variability suppliers.',
    ],
    quickRules: [
      {
        title: 'Truth in Menu',
        rule: 'Every menu claim (Angus, Wagyu, provenance) must strictly match the actual ingredient served.',
        type: 'critical',
      },
      {
        title: 'Transparent Shortages',
        rule: 'Never silently substitute a lower-cost ingredient. Inform the guest or mark 86 / unavailable.',
        type: 'warning',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Definitions',
        content:
          'Protects guests, brand reputation, and public health by preventing Economically Motivated Adulteration (EMA) and enforcing strict truth in menu practices. Complies with RA 10611 and PD ISO/TS 22002-2:2013.',
      },
      {
        id: '2',
        title: '2. Ingredient Vulnerability & Sourcing Protocols',
        content: 'Strategies to combat fraud:',
        bulletPoints: [
          'Vulnerability Assessment: QA and SCM analyze market risks and historical adulteration trends.',
          'Certificates of Authenticity: High-risk proteins and oils require verifiable certificates of provenance and COAs.',
          'Approved Supplier List (ASL): Procurement is restricted strictly to vetted, audited partners.',
          'Local Wet Market Appraisals: On-site physical appraisal before finalizing transactions.',
        ],
      },
      {
        id: '3',
        title: '3. Back of House Receiving & Staff Reporting',
        content:
          'BOH employees reconcile physical items (labels, specific brands, cuts of meat, fish species) against purchase orders. Products with unapproved labels or signs of tampering are rejected at entry. Staff are empowered with non-retaliatory reporting for any suspected food fraud.',
      },
    ],
    signatories: {
      preparedBy: 'Marielle Louise Macabale / Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'March 26, 2026', author: 'Marielle Louise Macabale', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
      { rev: 2, date: 'June 1, 2026', author: 'Celine Joy Sanchez', purpose: 'Streamlined departmental responsibilities' },
    ],
    tags: ['Food Fraud', 'Truth in Menu', 'Wagyu', 'Angus', 'Sourcing Integrity'],
  },
  {
    id: 'ikqap-020',
    code: 'IKQAP#020',
    title: 'Equipment Calibration Policy',
    type: 'policy',
    category: 'Operations & Maintenance',
    revision: 2,
    effectiveDate: 'June 28, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_020__Equipment_Calibration_Policy.docx_53e9f65d.pdf',
    summary:
      'Rigorous verification and calibration protocols for measuring tools (weighing scales, probe thermometers, infrared sensors, chiller gauges). Defines daily ice-point (0°C) and boiling-point (100°C) verification methods, ±2°C / ±2g tolerances, and correction factor calculations.',
    keyTakeaways: [
      'Pre-Use Verification: Probe thermometers verified daily using Ice-Point (0°C) or Boiling-Point (100°C) methods.',
      'Allowable Tolerances: Thermometers ±2°C; Weighing scales ±2 grams.',
      'Scale Checks: Daily test weights used (5g/50g for <5kg scales; 50g/1kg for ≥5kg scales; 1kg/20kg/50kg for 300kg scales).',
      'Correction Factor Rule: Actual Measurement = Equipment Reading - Highest Recorded Error.',
      'Defective Device Tagging: Inaccurate or expired equipment must be tagged "DEFECTIVE" or "OUT OF SERVICE" and moved to quarantine hold.',
      'Impact Assessment: If a thermometer read falsely low in a chiller, all products measured by that device undergo immediate safety hold.',
      'Quarterly QA & Third-Party ISO/IEC 17025 accredited calibration every 6 months.',
    ],
    quickRules: [
      {
        title: 'Daily Ice-Point Check',
        rule: 'Submerge thermometer probe in ice water bath for 30s. Must read 0°C ±2°C.',
        type: 'critical',
      },
      {
        title: 'Correction Factor Formula',
        rule: 'Actual Measurement = Equipment Reading - Highest Error in Reading.',
        type: 'info',
      },
      {
        title: 'Defective Tagging',
        rule: 'Immediately affix "OUT OF SERVICE" tag to any failed measuring tool.',
        type: 'warning',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Scope',
        content:
          'Ensures the accuracy and precision of all measuring equipment across Imperial Kitchen Group Inc. Stores may only use certified, functional measuring tools within allowable correction factors. Devices with expired or missing calibration stickers are prohibited.',
      },
      {
        id: '2',
        title: '2. Daily Verification Procedures',
        content: 'Methods for daily shift checks:',
        bulletPoints: [
          'Ice-Point Method (Cold Verification): Place probe in center of ice water bath for 30s without touching container sides. Must read 0°C (32°F) ±2°C.',
          'Boiling-Point Method (Hot Verification): Place probe in boiling water for 30s without touching sides. Must read 100°C (212°F) ±2°C.',
          'Infrared Thermometers: Cross-referenced daily against independent calibrated sensors (±2°C).',
          'Freezer/Chiller Digital Displays: Infrared thermometer used twice weekly to compare display with actual internal cabinet temp (±2°C).',
          'Weighing Scales: Verified daily with standardized test weights (±2 grams allowable difference).',
        ],
      },
      {
        id: '3',
        title: '3. Corrective Actions & Impact Traceability',
        content:
          'If equipment fails verification: 1. Immediate decommissioning with "OUT OF SERVICE" tag; 2. Impact Assessment: examine all products measured since last successful check; 3. Internal calibration adjustment (calibration nut) or dispatch to accredited third-party agency.',
      },
    ],
    tables: [
      {
        title: 'Equipment Verification & Calibration Matrix',
        headers: ['Equipment Type', 'Model / Range', 'Verification Procedure', 'Acceptable Tolerance', 'Store Monitoring', 'Recalibration Frequency'],
        rows: [
          ['Weighing scale', '<5 kg capacity', '5g and 50g test weight alternatively', '± 2 grams', 'Daily', 'QA: Quarterly / Third Party: 6 Mos'],
          ['Weighing scale', '≥5 kg capacity', '50g and 1 kg test weight alternatively', '± 2 grams', 'Daily', 'QA: Quarterly / Third Party: 6 Mos'],
          ['Weighing scale', '300 kg capacity', '1 kg and 20kg (or 50kg) test weights', '± 2 grams', 'Daily', 'QA: Quarterly / Third Party: 6 Mos'],
          ['Thermometer', 'Probe stem', 'Ice-point (0°C) or Boiling-point (100°C) for 30s', '± 2 °C', 'Daily', 'QA: Quarterly / Third Party: 6 Mos'],
          ['Thermometer', 'Infrared', 'Cross-referenced against independent units', '± 2 °C', 'Daily', 'QA: Quarterly / Third Party: 6 Mos'],
          ['Chiller/Freezer', 'Digital Display', 'Infrared reading compared against internal display', '± 2 °C', 'Twice a week', 'QA: Quarterly / Third Party: 6 Mos'],
          ['Room Temp Sensor', 'Digital Wall', 'Infrared reading compared with room display', '± 2 °C', 'Twice a week', 'QA: Quarterly / Third Party: 6 Mos'],
        ],
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Marielle Louise Macabale', 'Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'April 16, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
      { rev: 1, date: 'May 25, 2026', author: 'Celine Joy Sanchez', purpose: 'Added responsibilities' },
      { rev: 2, date: 'June 2, 2026', author: 'Celine Joy Sanchez', purpose: 'Added digital thermometer, 300kg scale, third-party agency in narrative' },
    ],
    tags: ['Calibration', 'Ice-Point', 'Boiling-Point', 'Thermometer', 'Scale', 'Tolerance'],
  },
  {
    id: 'ikqap-021',
    code: 'IKQAP#021',
    title: 'Good Warehousing Practices Policy',
    type: 'policy',
    category: 'Receiving & Storage',
    revision: 0,
    effectiveDate: 'November 27, 2026',
    pdfUrl: '/assets/aistudio/IKQAP_021__Good_Warehousing_Practices.docx_125e7fb4.pdf',
    summary:
      'Rigorous compliance standards for central and regional warehousing facilities. Covers perimeter security, pest exclusion, relative humidity and HVAC monitoring, shatterproof lighting, floor markings, stable interlocking pallet stacking, and daily MHE safety checklists.',
    keyTakeaways: [
      'Comprehensive Warehousing Reach: Cold storage units, dry goods zones, staging areas, loading bays, and 3PL logistics.',
      'FIFO & FEFO: First-In, First-Out and First-Expired, First-Out principles enforced across all inventory movements.',
      'Facility Management: Perimeter security access control, shatterproof lighting, moisture/humidity control, and pest-free perimeter.',
      'Pallet Building & Stacking: Pallets must be stacked in stable, interlocking configurations without product overhang; stretch-wrapped securely.',
      'Aisle Demarcations: Forklift lanes, walkways, and staging zones clearly marked with durable floor striping; keep fire exits unblocked.',
      'Material Handling Equipment (MHE): Forklifts and pallet jacks operated strictly by certified personnel; daily pre-operational safety checklists.',
      'Quarantine Area: Non-conforming, damaged, or suspect goods isolated in designated Hold area tagged until QA disposition.',
    ],
    quickRules: [
      {
        title: 'Interlocking Pallet Stacks',
        rule: 'Pallets must be stacked in stable interlocking patterns with no overhang and stretch-wrapped securely.',
        type: 'warning',
      },
      {
        title: 'MHE Daily Checklist',
        rule: 'Forklift operators must test brakes, horns, steering, and hydraulics daily before starting operations.',
        type: 'critical',
      },
      {
        title: 'Aisles Clear at All Times',
        rule: 'Keep all walkways and emergency fire exit pathways 100% unobstructed.',
        type: 'info',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Scope',
        content:
          'Establishes operational guidelines and compliance protocols for all storage and warehousing facilities operated by Imperial Kitchen Group Inc. Aligns with Food Safety Act of 2013 (RA 10611) and Code on Sanitation of the Philippines (PD No. 856).',
      },
      {
        id: '2',
        title: '2. Facility & Environmental Management',
        content: 'Physical safeguards:',
        bulletPoints: [
          'Security: Access strictly restricted to authorized staff and approved visitors; visitor logs maintained.',
          'Pest Exclusion: Tamper-resistant bait stations outside; air curtains and tightly sealed doors.',
          'Sanitation: Documented SSOPs for storage racks and floors; approved cleaning chemicals stored separately.',
          'Climate & Humidity: Continuous temperature and relative humidity monitoring for perishable and sensitive dry stock.',
          'Shatterproof Lighting: Protective covers on all light fixtures throughout storage and inspection areas.',
        ],
      },
      {
        id: '3',
        title: '3. Storage, Inventory & Equipment Operations',
        content: 'Warehousing workflows:',
        bulletPoints: [
          'Stock Rotation: Strict FIFO and FEFO enforcement with visible batch codes.',
          'Segregation: Physical barriers isolating allergens, raw materials, and cleaning chemicals.',
          'Pallet Integrity: Stable interlocking stacking with stretch-wrap; zero product overhang.',
          'MHE Inspection: Daily checklist for forklifts and electric pallet jacks before operations.',
          'Quarantine: Non-conforming stock isolated in designated Hold area.',
        ],
      },
      {
        id: '4',
        title: '4. Disciplinary Actions for Non-Conformance',
        content:
          'Minor (Aisle clutter, delayed housekeeping): Reprimand -> QA Action Plan -> 1-2 days suspension. Major (Ignoring FIFO/FEFO, unstable non-interlocking pallets): Reprimand -> QA Action Plan -> 2-3 days suspension. Critical (Breaching cold storage temp/humidity limits, allowing active pest infestations): Immediate Reprimand + QA Action Plan -> Final Warning & 3-7 days suspension or Termination.',
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Anthony Co (HR)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'July 24, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
    ],
    tags: ['Warehousing', 'GWP', 'Pallets', 'MHE', 'FEFO', 'Shatterproof'],
  },
  {
    id: 'ikqa-sop-010',
    code: 'IKQA-SOP#010',
    title: 'Standard Operating Procedure: Cross - Contamination',
    type: 'sop',
    category: 'Operations & Maintenance',
    revision: 0,
    effectiveDate: 'June 29, 2026',
    pdfUrl: '/assets/aistudio/IKQA-SOP_010__Cross-Contamination.docx_61777ef8.pdf',
    summary:
      'The comprehensive 11-page master SOP establishing hardware color-coding matrices (cutting boards, towels, meat serving plates), the 15-minute intake cold chain rule, chronological batching sequences, cooking line boundaries, and allergen segregation protocols across Warehouse, Commissary, and Stores.',
    keyTakeaways: [
      'Cutting Board Color Matrix:',
      '• 🔴 Red: Raw Meat (Beef, Pork, Lamb)',
      '• 🟡 Yellow: Raw Poultry (Chicken, Turkey, Duck)',
      '• 🔵 Blue: Raw Seafood (Fish, Shellfish)',
      '• 🟢 Green: Produce (Fresh Fruits & Vegetables)',
      '• 🟤 Brown: Dairy & Cooked Foods',
      '• ⚪ White: Allergen-Free Orders (Strictly reserved, no exceptions)',
      'Meat Serving Plates Color Coding:',
      '• 🔴 Red, 🟡 Yellow: Intended for US Beef',
      '• 🟤 Brown, 🟢 Green: Intended for Pork Belly',
      '• 🟠 Orange: Intended for Angus Beef',
      'Chronological Batching Sequence: Shift Start = Clean Run (allergen-free, RTE items, clean vegetables); Shift End = Raw/Allergen Run (marinations, allergen items).',
      'Cooking Line Boundary: Absolute line of demarcation. Line cooks must use entirely separate dedicated tongs & plates for raw placement vs cooked retrieval.',
      'Hygienic Reset: 20-second 6-step wash + fresh gloves when switching tasks or food groups.',
      'Spill Response: Cordon off area immediately, deploy color-coded spill kit, wash/rinse/sanitize before resuming.',
    ],
    quickRules: [
      {
        title: 'Cutting Board Matrix',
        rule: '🔴 Red=Meat, 🟡 Yellow=Poultry, 🔵 Blue=Fish, 🟢 Green=Produce, 🟤 Brown=Cooked/Dairy, ⚪ White=Allergens.',
        type: 'critical',
      },
      {
        title: 'Meat Plate Colors',
        rule: 'Red/Yellow plates = US Beef; Brown/Green = Pork Belly; Orange = Angus Beef.',
        type: 'info',
      },
      {
        title: 'Separate Grill Tongs',
        rule: 'Never use the same tongs for raw protein placement and cooked protein retrieval.',
        type: 'critical',
      },
    ],
    sections: [
      {
        id: '1',
        title: '1. Purpose & Scope',
        content:
          'Establishes standardized procedures for prevention, control, and absolute segregation of biological, chemical, and physical hazards, as well as major allergens, across Warehouse, Commissary, and Store levels of Imperial Kitchen Group Inc. (Pages 1-11).',
      },
      {
        id: '2',
        title: '2. Hardware Color Coding (Boards, Towels & Meat Plates)',
        content: 'Cross-contamination is eliminated via absolute visible segregation:',
        bulletPoints: [
          'Cutting Boards: 🔴 Red = Raw Meat; 🟡 Yellow = Raw Poultry; 🔵 Blue = Raw Seafood; 🟢 Green = Fresh Produce; 🟤 Brown = Dairy & Cooked Foods; ⚪ White = Allergen-Free Orders Only.',
          'Sanitation Towels: 🔵 Blue = FOH Dining; 🟡 Yellow = Handwash Sinks; 🟢 Green = BOH Kitchen; ⚪ White = Clean Wares & Plating; 🔴 Red = Restroom & Sanitation (Never enter food zone).',
          'Meat Serving Plates: 🔴 Red & 🟡 Yellow = US Beef; 🟤 Brown & 🟢 Green = Pork Belly; 🟠 Orange = Angus Beef.',
        ],
      },
      {
        id: '3',
        title: '3. Gateway Intake & 15-Minute Rule',
        content:
          'Incoming shipments checked for COAs and vehicle cleanliness. Chilled products (≤5°C) and frozen goods (≤-18°C) must be moved into deep cold storage within 15 minutes of vehicle arrival.',
      },
      {
        id: '4',
        title: '4. Chronological Batching & Hygienic Reset',
        content: 'Production flow control:',
        bulletPoints: [
          'Shift Start (Clean Run): Process allergen-free products, ready-to-eat proprietary items, and clean produce first.',
          'Shift End (Allergen/Raw Run): Schedule allergen items and raw meat marinations at the end of production cycle.',
          'The Hygienic Reset: 20-second handwashing + fresh gloves whenever switching tasks or handling different food groups.',
          'The Cooking Line Boundary: Separate dedicated tongs and plates for raw meat loading vs cooked food plating.',
        ],
      },
      {
        id: '5',
        title: '5. Allergen Protocol & Zero Substitution',
        content:
          'White cutting board and fresh sanitized utensils strictly reserved for allergen orders. If an allergen accidentally touches a plate, you cannot wipe it away; the entire meal must be discarded and restarted from scratch.',
      },
    ],
    tables: [
      {
        title: 'Master Cutting Board Color Coding',
        headers: ['Board Color', 'Food Category', 'Standard Items Covered'],
        rows: [
          ['🔴 Red', 'Raw Meat', 'Beef, Pork, Lamb'],
          ['🟡 Yellow', 'Raw Poultry', 'Chicken, Turkey, Duck'],
          ['🔵 Blue', 'Raw Seafood', 'Fish and Shellfish'],
          ['🟢 Green', 'Produce', 'Fresh Fruits and Vegetables'],
          ['🟤 Brown', 'Dairy & Cooked Foods', 'Dairy products and pre-cooked items'],
          ['⚪ White', 'Allergen-Free', 'Strictly for allergen-free orders (No exceptions)'],
        ],
      },
      {
        title: 'Meat Serving Plates Color Coding',
        headers: ['Plate Color', 'Approved Usage & Target Protein'],
        rows: [
          ['🔴 Red & 🟡 Yellow', 'Intended for US Beef'],
          ['🟤 Brown & 🟢 Green', 'Intended for Pork Belly'],
          ['🟠 Orange', 'Intended for Angus Beef'],
        ],
      },
      {
        title: 'Sanitation Towel Deployment Matrix',
        headers: ['Towel Color', 'Operational Area', 'Approved Usage & Constraints'],
        rows: [
          ['🔵 Blue', 'Front of House (FOH)', 'Dining areas, guest tables, service counters.'],
          ['🟡 Yellow', 'Handwashing Stations', 'Dedicated employee hand-hygiene sinks only.'],
          ['🟢 Green', 'Back of House (BOH)', 'General kitchen prep tables and cooking lines.'],
          ['⚪ White', 'Kitchen Wares & Plating', 'Polishing and drying clean kitchen wares, plates, and utensils.'],
          ['🔴 Red', 'Restroom & Sanitation', 'Comfort rooms, toilets, high-risk sanitation. NEVER enters food prep.'],
        ],
      },
    ],
    signatories: {
      preparedBy: 'Celine Joy Sanchez (QA Specialist)',
      reviewedBy: ['Jackquelyn Aquino (SCM)', 'Virna Joy Bernardo (L&D)', 'Anthony Co (HR)', 'Aries Tambasacan (Ops)', 'Eric Co (VP)'],
      approvedBy: 'Jack Julius Tiu (President)',
    },
    changeHistory: [
      { rev: 0, date: 'June 18, 2026', author: 'Celine Joy Sanchez', purpose: 'Originator' },
    ],
    quizQuestions: [
      {
        question: 'Under IKQA-SOP#010, which cutting board color is strictly reserved for Allergen-Free orders?',
        options: ['Green', 'White', 'Blue', 'Yellow'],
        answerIndex: 1,
        explanation: 'The White cutting board is strictly reserved for allergen-free orders with zero exceptions.',
      },
      {
        question: 'What meat is served on the Orange color-coded plate?',
        options: ['Pork Belly', 'US Beef', 'Angus Beef', 'Raw Chicken'],
        answerIndex: 2,
        explanation: 'Orange serving plates are intended specifically for Angus Beef.',
      },
      {
        question: 'Can you wipe off an allergen if it accidentally touches a guest plate?',
        options: ['Yes, if wiped with a sanitized towel', 'No, the entire meal must be discarded and restarted from scratch', 'Yes, if reheated', 'Only if the guest agrees'],
        answerIndex: 1,
        explanation: 'Strict zero substitution applies: you cannot wipe away allergens. The entire meal must be discarded and remade.',
      },
    ],
    tags: ['SOP', 'Cross-Contamination', 'Cutting Boards', 'Plates Color Coding', 'Towels', 'Batching'],
  },
];
