import { 
  UserProfile, 
  JobApplication, 
  WeeklyTask, 
  InterviewSession, 
  SavedConversation, 
  NotificationItem, 
  SavedItem,
  AdminUser,
  AdminPrompt 
} from '../types';

export const initialUserProfile: UserProfile = {
  id: 'usr_alex_001',
  name: 'Alex Morgan',
  email: 'alex@example.com',
  avatar: 'AM',
  professionalStatus: 'Employed',
  careerGoals: ['Finding a better job', 'Preparing for interviews', 'Getting promoted'],
  targetRoles: ['Senior Software Engineer', 'Staff Frontend Engineer'],
  experienceLevel: '3–5 years',
  preferredIndustries: ['Technology', 'E-commerce'],
  workArrangement: 'Remote',
  preferredLocation: 'San Francisco, CA / Remote',
  expectedSalaryRange: '$165,000 – $195,000',
  careerChallenges: ['System design interviews', 'Negotiating equity & compensation'],
  onboardingCompleted: true,
  planTier: 'premium',
  subscriptionStatus: 'active',
  renewalDate: 'Nov 28, 2026',
};

export const initialJobApplications: JobApplication[] = [
  {
    id: 'app_1',
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    location: 'Remote (US/Canada)',
    jobUrl: 'https://stripe.com/jobs/sr-frontend-engineer',
    salaryRange: '$175k – $210k + Equity',
    applicationDate: '2026-11-04',
    status: 'Interview',
    notes: 'Technical screen went great with Sarah. Next is system design round focused on billing ledger UI performance.',
    followUpDate: '2026-11-19',
    interviewDate: '2026-11-19T14:00:00',
    interviewType: 'System Architecture & React Internals',
    logoBg: '#635BFF',
    timeline: [
      { id: 'tl_1', date: '2026-11-04', title: 'Application Submitted', description: 'Applied through internal referral from Mark.', type: 'status_change' },
      { id: 'tl_2', date: '2026-11-08', title: 'Recruiter Screen Passed', description: '30-minute sync with David. Discussed tech stack and compensation expectations.', type: 'interview' },
      { id: 'tl_3', date: '2026-11-14', title: 'Technical Screen Passed', description: 'Built an interactive data table with optimistic updates. Scored high on state decoupling.', type: 'interview' },
      { id: 'tl_4', date: '2026-11-16', title: 'Architecture Round Scheduled', description: 'Scheduled for Thursday 2:00 PM EST with Staff Architect.', type: 'status_change' }
    ]
  },
  {
    id: 'app_2',
    company: 'Linear',
    role: 'Product Engineer',
    location: 'San Francisco / Remote',
    jobUrl: 'https://linear.app/careers/product-engineer',
    salaryRange: '$180k – $215k',
    applicationDate: '2026-11-06',
    status: 'Interview',
    notes: 'Focus on local-first architecture, keyboard-driven navigation, and zero-latency UI.',
    followUpDate: '2026-11-21',
    interviewDate: '2026-11-21T11:00:00',
    interviewType: 'Product Engineering & Pair Programming',
    logoBg: '#5E6AD2',
    timeline: [
      { id: 'tl_5', date: '2026-11-06', title: 'Application Submitted', description: 'Submitted custom project portfolio & clean code samples.', type: 'status_change' },
      { id: 'tl_6', date: '2026-11-11', title: 'Async Review Completed', description: 'Engineering lead praised craftsmanship and attention to detail.', type: 'status_change' },
      { id: 'tl_7', date: '2026-11-15', title: 'Pair Programming Scheduled', description: 'Invited to 90-min collaborative design/code session.', type: 'interview' }
    ]
  },
  {
    id: 'app_3',
    company: 'Figma',
    role: 'UI Platform Engineer',
    location: 'San Francisco, CA (Hybrid)',
    jobUrl: 'https://figma.com/careers/ui-platform',
    salaryRange: '$170k – $200k',
    applicationDate: '2026-11-02',
    status: 'Interview',
    notes: 'Design systems and web canvas rendering. Review WebGL and operational transform concepts.',
    followUpDate: '2026-11-24',
    interviewDate: '2026-11-24T15:30:00',
    interviewType: 'Canvas Performance & Design Systems',
    logoBg: '#F24E1E',
    timeline: [
      { id: 'tl_8', date: '2026-11-02', title: 'Application Submitted', description: 'Applied on website.', type: 'status_change' },
      { id: 'tl_9', date: '2026-11-09', title: 'Initial Chat with Hiring Manager', description: 'Deep dive into component library maintenance at scale.', type: 'interview' }
    ]
  },
  {
    id: 'app_4',
    company: 'Shopify',
    role: 'Senior Frontend Developer - Checkout',
    location: 'Remote',
    jobUrl: 'https://shopify.com/careers',
    salaryRange: '$165k – $190k CAD/USD',
    applicationDate: '2026-11-09',
    status: 'In Review',
    notes: 'Submitted customized cover letter highlighting high-scale checkout optimizations.',
    followUpDate: '2026-11-20',
    logoBg: '#96BF48',
    timeline: [
      { id: 'tl_10', date: '2026-11-09', title: 'Application Submitted', description: 'Submitted via careers portal with custom cover letter.', type: 'status_change' },
      { id: 'tl_11', date: '2026-11-12', title: 'Application Viewed', description: 'Recruiter opened resume and GitHub profile.', type: 'note' }
    ]
  },
  {
    id: 'app_5',
    company: 'Notion',
    role: 'Software Engineer - Core Workspace',
    location: 'New York, NY / Remote',
    jobUrl: 'https://notion.so/careers',
    salaryRange: '$175k – $205k',
    applicationDate: '2026-11-10',
    status: 'In Review',
    notes: 'Highlighted block-tree editor experience and collaborative state sync.',
    followUpDate: '2026-11-22',
    logoBg: '#000000',
    timeline: [
      { id: 'tl_12', date: '2026-11-10', title: 'Application Submitted', description: 'Referral link from alumni network.', type: 'status_change' }
    ]
  },
  {
    id: 'app_6',
    company: 'HubSpot',
    role: 'Staff Frontend Engineer',
    location: 'Cambridge, MA / Remote',
    jobUrl: 'https://hubspot.com/careers',
    salaryRange: '$180k – $210k',
    applicationDate: '2026-11-01',
    status: 'Offer',
    notes: 'Received initial offer package: $185k base + $65k RSUs. Currently reviewing counter-strategy.',
    followUpDate: '2026-11-25',
    logoBg: '#FF7A59',
    timeline: [
      { id: 'tl_13', date: '2026-11-01', title: 'Application Submitted', description: 'Applied.', type: 'status_change' },
      { id: 'tl_14', date: '2026-11-07', title: 'Full Loop Completed', description: 'Completed 4 rounds with exceptional feedback.', type: 'interview' },
      { id: 'tl_15', date: '2026-11-15', title: 'Offer Letter Received', description: 'Formal offer extended. Deadline to decide is Nov 30.', type: 'status_change' }
    ]
  },
  {
    id: 'app_7',
    company: 'Vercel',
    role: 'Senior Developer Experience Engineer',
    location: 'Remote',
    jobUrl: 'https://vercel.com/careers',
    salaryRange: '$170k – $195k',
    applicationDate: '2026-11-11',
    status: 'Applied',
    notes: 'Shared open-source Next.js template and blog posts on server actions.',
    followUpDate: '2026-11-23',
    logoBg: '#171717',
    timeline: [
      { id: 'tl_16', date: '2026-11-11', title: 'Application Submitted', description: 'Applied via Greenhouse with portfolio link.', type: 'status_change' }
    ]
  },
  {
    id: 'app_8',
    company: 'Datadog',
    role: 'Senior Software Engineer - Web UI',
    location: 'New York / Remote',
    jobUrl: 'https://datadoghq.com/careers',
    salaryRange: '$165k – $190k',
    applicationDate: '2026-11-12',
    status: 'Applied',
    notes: 'Large scale dashboard visualization and timeseries metrics.',
    followUpDate: '2026-11-26',
    logoBg: '#632CA6',
    timeline: [
      { id: 'tl_17', date: '2026-11-12', title: 'Application Submitted', description: 'Submitted application.', type: 'status_change' }
    ]
  },
  {
    id: 'app_9',
    company: 'Retool',
    role: 'Frontend Platform Engineer',
    location: 'San Francisco, CA',
    jobUrl: 'https://retool.com/careers',
    salaryRange: '$170k – $200k',
    applicationDate: '2026-11-13',
    status: 'Applied',
    notes: 'Low-code component tree rendering and custom scripting engine.',
    followUpDate: '2026-11-27',
    logoBg: '#3B82F6',
    timeline: [
      { id: 'tl_18', date: '2026-11-13', title: 'Application Submitted', description: 'Applied online.', type: 'status_change' }
    ]
  },
  {
    id: 'app_10',
    company: 'Airbnb',
    role: 'Senior Software Engineer - Search & Booking',
    location: 'San Francisco / Remote',
    jobUrl: 'https://airbnb.com/careers',
    salaryRange: '$180k – $220k',
    applicationDate: '2026-10-25',
    status: 'Rejected',
    notes: 'Position closed internally. Recruiter encouraged re-applying for Core Guest Experience in Q1.',
    followUpDate: '2027-01-15',
    logoBg: '#FF5A5F',
    timeline: [
      { id: 'tl_19', date: '2026-10-25', title: 'Applied', description: 'Applied online.', type: 'status_change' },
      { id: 'tl_20', date: '2026-11-03', title: 'Role Closed', description: 'Rejection email received due to internal headcount reallocation.', type: 'status_change' }
    ]
  },
  {
    id: 'app_11',
    company: 'GitHub',
    role: 'Senior Frontend Engineer - Copilot Web',
    location: 'Remote',
    jobUrl: 'https://github.com/careers',
    salaryRange: '$175k – $205k',
    applicationDate: '2026-11-14',
    status: 'Saved',
    notes: 'Working on AI code review interfaces and streaming diffs. Tailor resume for AI UX integration before submitting.',
    followUpDate: '2026-11-18',
    logoBg: '#24292F',
    timeline: [
      { id: 'tl_21', date: '2026-11-14', title: 'Opportunity Bookmarked', description: 'Saved from LinkedIn Job Alerts.', type: 'note' }
    ]
  },
  {
    id: 'app_12',
    company: 'OpenAI',
    role: 'Frontend Engineer - Product Interfaces',
    location: 'San Francisco, CA (Hybrid)',
    jobUrl: 'https://openai.com/careers',
    salaryRange: '$200k – $260k + Equity',
    applicationDate: '2026-11-15',
    status: 'Saved',
    notes: 'Drafting cover letter discussing token streaming performance and accessibility.',
    followUpDate: '2026-11-19',
    logoBg: '#10A37F',
    timeline: [
      { id: 'tl_22', date: '2026-11-15', title: 'Opportunity Bookmarked', description: 'Saved role to prepare tailored case study.', type: 'note' }
    ]
  }
];

export const initialWeeklyTasks: WeeklyTask[] = [
  {
    id: 'task_1',
    day: 'Monday',
    title: 'Research five target companies and engineering culture',
    category: 'Applications',
    priority: 'High',
    dueTime: '10:00 AM',
    completed: true,
    notes: 'Reviewed Stripe and Figma engineering blog posts on state sync.',
    relatedCompany: 'Stripe'
  },
  {
    id: 'task_2',
    day: 'Monday',
    title: 'Improve LinkedIn headline and featured projects',
    category: 'Skill Building',
    priority: 'Medium',
    dueTime: '2:30 PM',
    completed: true,
    notes: 'Highlighted 40% latency reduction achieved in last role.'
  },
  {
    id: 'task_3',
    day: 'Tuesday',
    title: 'Submit two tailored applications with custom cover letters',
    category: 'Applications',
    priority: 'High',
    dueTime: '11:00 AM',
    completed: true,
    notes: 'Submitted to Vercel and Datadog.',
    relatedCompany: 'Vercel'
  },
  {
    id: 'task_4',
    day: 'Tuesday',
    title: 'Practice behavioral interview questions with AI Coach',
    category: 'Interview Prep',
    priority: 'High',
    dueTime: '4:00 PM',
    completed: true,
    notes: 'Practiced STAR responses for conflict resolution and technical disagreements.'
  },
  {
    id: 'task_5',
    day: 'Wednesday',
    title: 'Update resume with recent TypeScript architecture metrics',
    category: 'Applications',
    priority: 'Medium',
    dueTime: '1:00 PM',
    completed: true,
    notes: 'Quantified micro-frontend migration outcomes.'
  },
  {
    id: 'task_6',
    day: 'Wednesday',
    title: 'Review AI interview feedback and identify communication gaps',
    category: 'Interview Prep',
    priority: 'Medium',
    dueTime: '5:00 PM',
    completed: true,
    notes: 'Need to emphasize measurable business ROI alongside technical trade-offs.'
  },
  {
    id: 'task_7',
    day: 'Thursday',
    title: 'Follow up with David (Recruiter at Shopify)',
    category: 'Networking',
    priority: 'High',
    dueTime: '11:30 AM',
    completed: true,
    notes: 'Sent polite check-in note regarding the checkout engineering position.',
    relatedCompany: 'Shopify'
  },
  {
    id: 'task_8',
    day: 'Thursday',
    title: 'Prepare system design architecture notes for Stripe interview',
    category: 'Interview Prep',
    priority: 'High',
    dueTime: '3:00 PM',
    completed: true,
    notes: 'Diagrammed distributed optimistic UI reconciliation.',
    relatedCompany: 'Stripe'
  },
  {
    id: 'task_9',
    day: 'Friday',
    title: 'Complete mock technical interview session on System Design',
    category: 'Interview Prep',
    priority: 'High',
    dueTime: '2:00 PM',
    completed: false,
    notes: 'Targeting 85+ score on architectural trade-offs.'
  },
  {
    id: 'task_10',
    day: 'Friday',
    title: 'Connect with two engineering managers on LinkedIn',
    category: 'Networking',
    priority: 'Low',
    dueTime: '4:30 PM',
    completed: false,
    notes: 'Focus on companies using modern React 19 / Server Components.'
  },
  {
    id: 'task_11',
    day: 'Saturday',
    title: 'Review career search progress and metric trends',
    category: 'Reflection',
    priority: 'Medium',
    dueTime: '11:00 AM',
    completed: false,
    notes: 'Check conversion rate from application to first round.'
  },
  {
    id: 'task_12',
    day: 'Sunday',
    title: 'Plan priorities and schedule mock interviews for next week',
    category: 'Reflection',
    priority: 'Medium',
    dueTime: '5:00 PM',
    completed: false,
    notes: 'Use AI Weekly Plan generator to align with upcoming rounds.'
  }
];

export const initialInterviewSessions: InterviewSession[] = [
  {
    id: 'sess_1',
    date: '2026-11-16',
    interviewType: 'Behavioral',
    targetRole: 'Senior Software Engineer',
    difficulty: 'Intermediate',
    totalQuestions: 5,
    completedQuestions: 5,
    overallScore: 84,
    status: 'completed',
    questions: [
      {
        id: 'q_1',
        questionNumber: 1,
        questionText: 'Tell me about a challenging technical disagreement you had with a team member and how you resolved it.',
        category: 'Behavioral',
        difficulty: 'Intermediate',
        userAnswer: 'During our migration to TypeScript, a senior engineer preferred loose "any" types to speed up delivery, whereas I advocated for strict compiler checks. I created a measurable benchmark showing that 60% of our production regressions came from nullish object property lookups. We agreed to adopt strict mode with an incremental ts-ignore burn-down backlog.',
        evaluation: {
          overallScore: 86,
          communicationScore: 88,
          relevanceScore: 90,
          structureScore: 84,
          specificityScore: 82,
          strengths: [
            'Excellent use of objective data rather than emotional debate',
            'Strong demonstration of technical leadership and compromise',
            'Structured narrative using Situation, Action, and Result'
          ],
          areasToImprove: [
            'Quantify the long-term impact on team velocity after migration',
            'Mention how you maintained positive rapport with the colleague afterwards'
          ],
          suggestedAnswer: 'In our recent architecture refactor, my peer suggested disabling strict type checking to hit our quarterly deadline. Recognizing both our velocity constraints and system reliability risks, I analyzed our past sprint bugs and demonstrated that 60% were runtime type issues. I proposed a phased compromise: strict null checks enabled by default with a scheduled burn-down list for legacy files. This protected production while shipping on time, and our sprint velocity increased 18% over the following quarter.',
          followUpQuestion: 'How would you handle a situation where data does not clearly point to a single solution?'
        }
      },
      {
        id: 'q_2',
        questionNumber: 2,
        questionText: 'Describe a project where you had to adapt quickly to sudden changes in product requirements.',
        category: 'Behavioral',
        difficulty: 'Intermediate',
        userAnswer: 'Two weeks before launch, marketing altered the checkout conversion funnel. I broke the changes into essential core paths versus secondary enhancements, re-prioritized tasks, and worked with design to reuse existing modular UI components.',
        evaluation: {
          overallScore: 82,
          communicationScore: 80,
          relevanceScore: 85,
          structureScore: 82,
          specificityScore: 81,
          strengths: ['Demonstrates composure under deadline pressure', 'Pragmatic prioritization strategy'],
          areasToImprove: ['Add concrete metric numbers on launch timeline and outcome'],
          suggestedAnswer: 'When our checkout flow requirements changed two weeks before general availability, I immediately held a triage sync with product and design. We isolated the critical conversion flow from nice-to-have visual flourishes, decoupling them into immediate launch requirements and v1.1 follow-ups. By reusing our existing component library, we launched on schedule with 99.98% reliability and exceeded our conversion goal by 14%.',
          followUpQuestion: 'How did you communicate the risk to non-technical stakeholders?'
        }
      }
    ]
  },
  {
    id: 'sess_2',
    date: '2026-11-14',
    interviewType: 'Technical',
    targetRole: 'Senior Software Engineer',
    difficulty: 'Advanced',
    totalQuestions: 5,
    completedQuestions: 5,
    overallScore: 88,
    status: 'completed',
    questions: [
      {
        id: 'q_3',
        questionNumber: 1,
        questionText: 'How would you design a real-time collaborative document editor that remains responsive under intermittent network connectivity?',
        category: 'Technical',
        difficulty: 'Advanced',
        userAnswer: 'I would employ a local-first architecture using Conflict-free Replicated Data Types (CRDTs) or Operational Transformation backed by IndexedDB. Local user edits are committed immediately to an optimistic in-memory tree, while an async worker syncs operation logs with a central server via WebSockets.',
        evaluation: {
          overallScore: 90,
          communicationScore: 88,
          relevanceScore: 92,
          structureScore: 90,
          specificityScore: 90,
          strengths: [
            'Accurate choice of distributed state primitives (CRDTs / IndexedDB)',
            'Clear separation between local optimistic UI and asynchronous network sync'
          ],
          areasToImprove: [
            'Discuss conflict resolution edge cases and memory pruning for long-lived docs'
          ],
          suggestedAnswer: 'I would architect a local-first system with a dual-layer state model: an in-memory active document state backed by IndexedDB for instant offline interactivity, and a CRDT engine (such as Yjs) communicating via WebSockets. Local mutations update the DOM synchronously, producing compact binary delta packets queued in an offline-safe queue. Upon reconnection, deltas are replayed and merged with tombstone garbage collection to cap memory.',
          followUpQuestion: 'What strategies would you use to prevent tombstone bloat in CRDTs over years of edits?'
        }
      }
    ]
  },
  {
    id: 'sess_3',
    date: '2026-11-10',
    interviewType: 'Leadership',
    targetRole: 'Senior Software Engineer',
    difficulty: 'Intermediate',
    totalQuestions: 5,
    completedQuestions: 5,
    overallScore: 78,
    status: 'completed',
    questions: [
      {
        id: 'q_4',
        questionNumber: 1,
        questionText: 'How do you mentor junior and mid-level engineers to foster their autonomy rather than dependency?',
        category: 'Leadership',
        difficulty: 'Intermediate',
        userAnswer: 'I ask guiding questions rather than immediately giving the code solution. I also encourage them to write down design docs and pair program through their architectural bottlenecks.',
        evaluation: {
          overallScore: 78,
          communicationScore: 76,
          relevanceScore: 80,
          structureScore: 78,
          specificityScore: 78,
          strengths: ['Socratic mentoring style that builds problem-solving confidence'],
          areasToImprove: ['Give a specific anecdote of an engineer who achieved promotion under your guidance'],
          suggestedAnswer: 'My philosophy is Socratic and outcome-focused. When an engineer comes to me stuck on an issue, I ask: "What have you ruled out so far, and where does your mental model diverge from the runtime behavior?" I then co-author a Lightweight Architecture RFC with them, letting them lead the presentation to the broader team. For example, my mentee Kevin went from hesitant PR submitter to independently leading our authentication redesign within six months.',
          followUpQuestion: 'What do you do when a mentee consistently misses delivery estimates?'
        }
      }
    ]
  }
];

export const initialSavedConversations: SavedConversation[] = [
  {
    id: 'conv_1',
    title: 'Stripe System Design Preparation Strategy',
    createdAt: '2026-11-15',
    updatedAt: '2026-11-16',
    previewSnippet: 'Key focus areas: Ledger idempotency, optimistic UI state, and handling network drops gracefully.',
    messages: [
      {
        id: 'm_1',
        sender: 'user',
        content: 'I have an upcoming system architecture round with Stripe for Senior Frontend Engineer. What should I prioritize?',
        timestamp: '10:14 AM'
      },
      {
        id: 'm_2',
        sender: 'assistant',
        content: 'For Stripe frontend architecture rounds, interviewers place high value on three core competencies:\n\n1. **Financial-Grade Reliability & Idempotency**: How client interfaces guarantee transactions never double-submit on network timeout.\n2. **High-Performance Table & Ledger Virtualization**: Rendering millions of rows with sub-16ms frame rates and zero jitter.\n3. **Decoupled State & Resilient Optimistic UI**: Reconciling server rollbacks without jarring screen flashes.\n\nWould you like to practice a simulated scenario on building an idempotent checkout button with rollback mechanisms?',
        timestamp: '10:15 AM',
        suggestedActions: [
          { label: 'Start Simulated Interview', actionType: 'start_interview' },
          { label: 'Add to Weekly Plan', actionType: 'add_task', payload: 'Practice Stripe idempotent UI architecture' },
          { label: 'Copy Strategy Notes', actionType: 'copy', payload: '1. Financial-grade reliability\n2. Table virtualization\n3. Decoupled state & rollback' }
        ],
        isSaved: true
      }
    ]
  },
  {
    id: 'conv_2',
    title: 'Salary Negotiation & Equity Strategy (HubSpot Offer)',
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
    previewSnippet: 'How to leverage pending Stripe and Linear final loops to negotiate a $195k base + improved RSU vesting.',
    messages: [
      {
        id: 'm_3',
        sender: 'user',
        content: 'HubSpot made an initial offer of $185k base + $65k RSUs. I am also in late rounds with Stripe and Linear. How should I counter?',
        timestamp: '2:30 PM'
      },
      {
        id: 'm_4',
        sender: 'assistant',
        content: 'Congratulations on the offer! Having multiple active high-caliber interview loops gives you significant genuine leverage. Here is an actionable 3-step script:\n\n1. **Express genuine enthusiasm first**: Reaffirm your excitement about HubSpot’s engineering culture.\n2. **Anchor objectively**: Reference competitive market data for Staff-level roles ($195k–$205k base).\n3. **Highlight your competitive timeline**: Inform them transparently that you are finalizing rounds with Stripe and Linear, and an adjusted base of $195k with a signing bonus would allow you to sign immediately without waiting for other offers.\n\nNever issue ultimatums; frame it as enabling you to make a swift, committed decision.',
        timestamp: '2:31 PM',
        suggestedActions: [
          { label: 'Add Follow-up to Weekly Plan', actionType: 'add_task', payload: 'Draft HubSpot counter-offer letter' },
          { label: 'Copy Negotiation Script', actionType: 'copy', payload: 'I am thrilled about the team and role at HubSpot...' }
        ],
        isSaved: true
      }
    ]
  },
  {
    id: 'conv_3',
    title: 'Resume Bullet Optimization: Quantifying Impact',
    createdAt: '2026-11-12',
    updatedAt: '2026-11-12',
    previewSnippet: 'Transforming "worked on frontend performance" into high-impact X-Y-Z formula bullets.',
    messages: [
      {
        id: 'm_5',
        sender: 'user',
        content: 'How can I rewrite this bullet: "Responsible for improving page load performance across our web app"?',
        timestamp: '11:05 AM'
      },
      {
        id: 'm_6',
        sender: 'assistant',
        content: 'Use Google’s X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".\n\nHere are two refined versions:\n\n• **Option A (Speed & Conversion focus)**: "Engineered bundle-splitting and asset prefetching pipeline, reducing Largest Contentful Paint (LCP) from 3.8s to 1.1s and improving checkout conversion by 12.4% across 1.2M monthly users."\n\n• **Option B (Architecture focus)**: "Architected micro-frontend caching layer with Stale-While-Revalidate semantics, cutting client memory footprint by 42% and eliminating runtime layout shifts."',
        timestamp: '11:06 AM',
        suggestedActions: [
          { label: 'Copy Bullets', actionType: 'copy', payload: 'Engineered bundle-splitting and asset prefetching pipeline...' },
          { label: 'Add Task to Resume Update', actionType: 'add_task', payload: 'Update resume with X-Y-Z performance bullets' }
        ],
        isSaved: true
      }
    ]
  },
  {
    id: 'conv_4',
    title: 'STAR Method Framework for Senior Leadership Questions',
    createdAt: '2026-11-08',
    updatedAt: '2026-11-09',
    previewSnippet: 'Structuring complex behavioral answers with crisp context and quantifiable engineering outcomes.',
    messages: [
      {
        id: 'm_7',
        sender: 'user',
        content: 'I sometimes talk too long during behavioral questions. How can I keep my STAR answers under two minutes?',
        timestamp: '4:15 PM'
      },
      {
        id: 'm_8',
        sender: 'assistant',
        content: 'A proven guideline for 2-minute STAR answers:\n\n• **Situation (20s)**: High-level context only. Company, project, and the acute stakes.\n• **Task (15s)**: What was your specific personal responsibility, not just the team’s.\n• **Action (60s)**: The meat of your answer. 2 to 3 deliberate choices you made, trade-offs considered, and how you led.\n• **Result (25s)**: Measurable business or engineering outcome, plus one reflective learning takeaway.',
        timestamp: '4:16 AM',
        suggestedActions: [
          { label: 'Practice Behavioral Questions', actionType: 'start_interview' },
          { label: 'Save Framework', actionType: 'copy', payload: 'Situation (20s), Task (15s), Action (60s), Result (25s)' }
        ],
        isSaved: true
      }
    ]
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Interview with Stripe tomorrow',
    message: 'System Architecture round scheduled for tomorrow at 2:00 PM EST. Review your prepared notes on distributed state sync.',
    timestamp: '10m ago',
    read: false,
    type: 'interview',
    actionUrl: '/interview'
  },
  {
    id: 'notif_2',
    title: 'Follow-up reminder for Shopify',
    message: 'It has been 8 days since your application was reviewed. We recommend sending a polite recruiter check-in.',
    timestamp: '2h ago',
    read: false,
    type: 'followup',
    actionUrl: '/applications'
  },
  {
    id: 'notif_3',
    title: 'Your weekly career plan is ready',
    message: 'Your personal AI plan has organized 12 targeted action items for this week. 8 are already completed!',
    timestamp: '1d ago',
    read: false,
    type: 'plan',
    actionUrl: '/weekly-plan'
  },
  {
    id: 'notif_4',
    title: 'You completed 80% of your weekly goals',
    message: 'Exceptional consistency! You have completed 8 out of 12 planned tasks. Keep this momentum going into Friday.',
    timestamp: '1d ago',
    read: true,
    type: 'achievement',
    actionUrl: '/weekly-plan'
  },
  {
    id: 'notif_5',
    title: 'Time to practice your interview questions',
    message: 'Your interview readiness score is currently 84%. Complete one short technical session to push it past 88%.',
    timestamp: '2d ago',
    read: true,
    type: 'reminder',
    actionUrl: '/interview'
  },
  {
    id: 'notif_6',
    title: 'HubSpot Offer Review Due in 6 Days',
    message: 'Reminder to finalize any counter-proposal discussions before the Nov 30 acceptance window.',
    timestamp: '3d ago',
    read: true,
    type: 'reminder',
    actionUrl: '/applications'
  }
];

export const initialSavedItems: SavedItem[] = [
  {
    id: 'sv_1',
    category: 'recommendation',
    title: 'Focus on System Design & Decoupled State',
    content: 'For Stripe and Linear technical rounds, prioritize distributed optimistic UI and CRDT state reconciliation.',
    createdAt: '2026-11-16'
  },
  {
    id: 'sv_2',
    category: 'interview_feedback',
    title: 'Behavioral STAR Benchmark: Score 86/100',
    content: 'Disagreement Resolution: Strengths in objective data over emotion; recommended to quantify long-term team velocity impact.',
    createdAt: '2026-11-16'
  },
  {
    id: 'sv_3',
    category: 'conversation',
    title: 'Salary Negotiation Script for HubSpot',
    content: 'Script anchoring at $195k base while transparently communicating active Stripe/Linear final rounds.',
    createdAt: '2026-11-14'
  },
  {
    id: 'sv_4',
    category: 'task',
    title: 'Prepare System Design Architecture Notes for Stripe',
    content: 'Diagrammed distributed optimistic UI reconciliation and financial transaction idempotency.',
    createdAt: '2026-11-15'
  },
  {
    id: 'sv_5',
    category: 'note',
    title: 'X-Y-Z Resume Bullet Formula',
    content: 'Accomplished [X] as measured by [Y], by doing [Z]. Example: Reduced LCP from 3.8s to 1.1s, boosting conversions by 12.4%.',
    createdAt: '2026-11-12'
  }
];

export const mockHistoricalAnalytics = {
  timelineDays: [
    { day: 'Mon', applications: 2, interviews: 1, completedTasks: 2, readiness: 76 },
    { day: 'Tue', applications: 2, interviews: 0, completedTasks: 2, readiness: 78 },
    { day: 'Wed', applications: 1, interviews: 1, completedTasks: 2, readiness: 81 },
    { day: 'Thu', applications: 0, interviews: 1, completedTasks: 2, readiness: 84 },
    { day: 'Fri', applications: 1, interviews: 0, completedTasks: 0, readiness: 85 },
    { day: 'Sat', applications: 0, interviews: 0, completedTasks: 0, readiness: 85 },
    { day: 'Sun', applications: 0, interviews: 0, completedTasks: 0, readiness: 86 },
  ],
  thirtyDaysData: [
    { period: 'Week 1', applications: 3, interviews: 0, tasks: 9, readiness: 68 },
    { period: 'Week 2', applications: 4, interviews: 1, tasks: 11, readiness: 74 },
    { period: 'Week 3', applications: 3, interviews: 2, tasks: 12, readiness: 80 },
    { period: 'Week 4', applications: 2, interviews: 3, tasks: 8, readiness: 86 }
  ],
  ninetyDaysData: [
    { period: 'Sep', applications: 8, interviews: 1, tasks: 32, readiness: 62 },
    { period: 'Oct', applications: 14, interviews: 3, tasks: 44, readiness: 75 },
    { period: 'Nov', applications: 12, interviews: 6, tasks: 38, readiness: 86 }
  ],
  categoryBreakdown: [
    { name: 'Interview Prep', value: 38, color: '#526B62' },
    { name: 'Applications', value: 28, color: '#B77A61' },
    { name: 'Networking', value: 18, color: '#C18A4F' },
    { name: 'Skill Building', value: 16, color: '#688A70' }
  ]
};

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'u_1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    registeredDate: '2026-11-01',
    subscription: 'Premium',
    accountStatus: 'Active',
    lastActive: '5 mins ago',
    targetRole: 'Senior Software Engineer',
    applicationsCount: 12,
    interviewCount: 3
  },
  {
    id: 'u_2',
    name: 'Elena Rostova',
    email: 'elena.rostova@techmail.io',
    registeredDate: '2026-11-03',
    subscription: 'Premium',
    accountStatus: 'Active',
    lastActive: '2 hours ago',
    targetRole: 'Product Design Lead',
    applicationsCount: 8,
    interviewCount: 2
  },
  {
    id: 'u_3',
    name: 'Marcus Vance',
    email: 'm.vance@workfolio.dev',
    registeredDate: '2026-10-28',
    subscription: 'Free',
    accountStatus: 'Active',
    lastActive: '1 day ago',
    targetRole: 'Data Scientist & ML Engineer',
    applicationsCount: 5,
    interviewCount: 1
  },
  {
    id: 'u_4',
    name: 'Sarah Chen',
    email: 'schen.design@domain.co',
    registeredDate: '2026-11-05',
    subscription: 'Premium',
    accountStatus: 'Active',
    lastActive: '3 hours ago',
    targetRole: 'Senior Product Manager',
    applicationsCount: 14,
    interviewCount: 4
  },
  {
    id: 'u_5',
    name: 'Devon Miller',
    email: 'devon.miller@cloudops.net',
    registeredDate: '2026-10-18',
    subscription: 'Free',
    accountStatus: 'Active',
    lastActive: '4 days ago',
    targetRole: 'DevOps & Platform Architect',
    applicationsCount: 6,
    interviewCount: 0
  },
  {
    id: 'u_6',
    name: 'Aisha Al-Mansoor',
    email: 'aisha.career@al-mansoor.org',
    registeredDate: '2026-11-08',
    subscription: 'Premium',
    accountStatus: 'Active',
    lastActive: '12 mins ago',
    targetRole: 'Cybersecurity Consultant',
    applicationsCount: 9,
    interviewCount: 3
  },
  {
    id: 'u_7',
    name: 'Liam O’Connor',
    email: 'liam.oc@dublintech.ie',
    registeredDate: '2026-11-12',
    subscription: 'Free',
    accountStatus: 'Pending',
    lastActive: 'Just registered',
    targetRole: 'Full Stack Developer',
    applicationsCount: 2,
    interviewCount: 0
  },
  {
    id: 'u_8',
    name: 'Priya Sharma',
    email: 'psharma@analyticslab.in',
    registeredDate: '2026-10-15',
    subscription: 'Premium',
    accountStatus: 'Active',
    lastActive: 'Yesterday',
    targetRole: 'Lead Business Analyst',
    applicationsCount: 11,
    interviewCount: 2
  }
];

export const initialAdminPrompts: AdminPrompt[] = [
  {
    id: 'prm_1',
    title: 'Career Coach Strategic Advisory',
    category: 'Career Coach',
    description: 'Directs the conversational AI assistant to deliver empathetic, structured, and tactical career coaching without generic platitudes.',
    systemRole: 'You are an elite executive career strategist. Always provide concrete, actionable advice using structured bullet points, tailored to the user target role and current search stage.',
    promptTemplate: `You are coaching {userName}, a {experienceLevel} professional targeting {targetRole} roles in {preferredIndustries}.
Current status: {professionalStatus}. Active applications: {applicationsCount}.
User question: "{userMessage}"
Analyze their situation through the lens of modern hiring dynamics. Recommend 2 to 3 decisive action steps and offer a relevant follow-up exercise.`,
    isActive: true,
    lastUpdated: '2026-11-14',
    sampleInput: 'How should I structure my preparation for a system design round at Stripe?',
    sampleOutput: 'Focus on financial-grade reliability, idempotency, table virtualization, and rollback handling. Let\'s practice an idempotent checkout button architecture.'
  },
  {
    id: 'prm_2',
    title: 'Interview Feedback & Rubric Scoring Engine',
    category: 'Interview Feedback',
    description: 'Generates multidimensional rubric scoring (Communication, Relevance, Structure, Specificity) with constructive critique and STAR sample responses.',
    systemRole: 'You are a calibrated tech hiring committee evaluator. Critique the candidate\'s answer with rigorous specificity, highlighting objective strengths and exact gaps.',
    promptTemplate: `Evaluate the following interview answer for a {targetRole} ({interviewType} interview, {difficulty} level).
Question: "{questionText}"
Candidate Answer: "{userAnswer}"

Output a comprehensive JSON evaluation containing:
- overallScore (0-100)
- communicationScore, relevanceScore, structureScore, specificityScore
- 3 strengths
- 2-3 areasToImprove
- A structured, improved sample answer
- A challenging follow-up question to test depth.`,
    isActive: true,
    lastUpdated: '2026-11-12',
    sampleInput: 'Tell me about a challenging technical problem you solved.',
    sampleOutput: 'Score 84/100. Strengths: Excellent use of objective metrics. Areas to improve: Quantify team velocity. Follow-up: How do you resolve situations with no clear data?'
  },
  {
    id: 'prm_3',
    title: 'Personalized Weekly Roadmap Generator',
    category: 'Weekly Plan Generation',
    description: 'Converts user career goals and current application statuses into a realistic, balanced Monday–Sunday schedule.',
    systemRole: 'You are a productivity and career workflow architect. Create high-leverage weekly plans that prevent burnout while maintaining steady momentum.',
    promptTemplate: `Generate a 7-day career development schedule for {userName}.
Target Role: {targetRole}
Goals: {careerGoals}
Active Interviews: {interviewsCount}
Days: Monday through Sunday.
Each day must include 1 to 2 targeted tasks with realistic priority tags (High, Medium, Low) and specific time allocations.`,
    isActive: true,
    lastUpdated: '2026-11-10',
    sampleInput: 'Generate weekly plan for Senior Software Engineer with Stripe interview on Thursday.',
    sampleOutput: 'Monday: Research Stripe culture. Tuesday: Practice STAR behavioral questions. Wednesday: Architecture review. Thursday: System Design interview. Friday: Follow up with recruiters.'
  },
  {
    id: 'prm_4',
    title: 'Resume & LinkedIn Impact Multiplier',
    category: 'Resume Guidance',
    description: 'Transforms passive job description bullets into high-impact Google X-Y-Z formula accomplishments.',
    systemRole: 'You are a veteran technical recruiter and resume editor. Strip fluff and infuse measurable metrics.',
    promptTemplate: `Rewrite the user\'s resume bullet or professional summary for {targetRole}.
Input: "{userDraft}"
Format as: Accomplished [X] as measured by [Y], by doing [Z]. Provide 2 high-impact variations with quantifiable metrics.`,
    isActive: true,
    lastUpdated: '2026-11-08',
    sampleInput: 'Responsible for optimizing database queries.',
    sampleOutput: 'Engineered multi-column indexes and connection pool sharding, cutting p99 query latency from 840ms to 42ms and reducing RDS compute costs by 34%.'
  },
  {
    id: 'prm_5',
    title: 'Post-Interview & Application Follow-up Advisor',
    category: 'Follow-up Recommendations',
    description: 'Drafts courteous, professional follow-up messages tailored to elapsed time and interview round.',
    systemRole: 'You are a professional communications expert specializing in executive job candidate correspondence.',
    promptTemplate: `Draft a strategic follow-up message for {company} regarding {role}.
Last interaction: {lastInteractionDate}. Status: {status}.
Tone: Gracious, confident, concise, and value-additive.`,
    isActive: true,
    lastUpdated: '2026-11-02',
    sampleInput: 'Follow up with Shopify 8 days after application view.',
    sampleOutput: 'Hi David, I hope you are having a productive week. I am following up on my application for the Senior Frontend role...'
  }
];
