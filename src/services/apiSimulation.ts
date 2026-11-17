import { 
  UserProfile, 
  AnswerEvaluation, 
  InterviewType, 
  InterviewDifficulty,
  WeeklyTask,
  ChatMessage
} from '../types';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiSimulation = {
  // Simulates evaluating an interview answer
  async evaluateInterviewAnswer(
    questionText: string,
    userAnswer: string,
    category: InterviewType,
    difficulty: InterviewDifficulty,
    targetRole: string
  ): Promise<AnswerEvaluation> {
    await delay(1200); // Realistic AI thinking pause

    const trimmed = userAnswer.trim();
    const wordCount = trimmed.split(/\s+/).length;

    // Smart heuristic evaluation
    const mentionsMetrics = /\b(\d+%|\$\d+|\d+x|\d+ms|\d+ users|\d+ months|\d+ days)\b/i.test(trimmed);
    const mentionsAction = /\b(led|architected|designed|implemented|refactored|built|spearheaded|resolved|compromised)\b/i.test(trimmed);
    const mentionsTradeoff = /\b(trade-off|however|compromise|balanced|constraint|alternative|risk)\b/i.test(trimmed);

    let baseScore = Math.min(94, Math.max(68, 70 + Math.floor(wordCount / 6)));
    if (mentionsMetrics) baseScore += 5;
    if (mentionsAction) baseScore += 4;
    if (mentionsTradeoff) baseScore += 4;
    const finalScore = Math.min(96, Math.max(72, baseScore));

    const strengths: string[] = [];
    const areasToImprove: string[] = [];

    if (mentionsMetrics) {
      strengths.push('Effectively quantified business and engineering outcomes with specific numerical data');
    } else {
      areasToImprove.push('Anchor outcomes with measurable metrics (e.g., latency reduction %, team velocity, or cost savings)');
    }

    if (mentionsAction) {
      strengths.push('Highlighted personal contribution and ownership using decisive action verbs');
    } else {
      areasToImprove.push('Clarify your personal contribution ("I led / I architected") rather than speaking solely about team actions');
    }

    if (mentionsTradeoff) {
      strengths.push('Demonstrated mature engineering judgment by acknowledging constraints and trade-offs');
    } else {
      areasToImprove.push('Explain the trade-offs you weighed and why your chosen solution was preferable to alternatives');
    }

    if (wordCount < 40) {
      areasToImprove.push('Elaborate further on the situation context and the resolution to demonstrate comprehensive depth');
    } else {
      strengths.push('Structured response logically following clear cause-and-effect progression');
    }

    // Ensure at least 2 strengths and 2 areas
    if (strengths.length < 2) strengths.push('Clear, articulate tone well-suited for professional interviews');
    if (strengths.length < 3) strengths.push('Directly addressed the core intent of the interviewer\'s question');
    if (areasToImprove.length < 2) areasToImprove.push('Conclude with a brief reflective learning: what would you do differently today?');

    const sampleAnswer = `When facing this challenge in my previous ${targetRole} role, I first established the objective scope and boundary conditions. Recognizing that the critical constraint was maintaining production stability while delivering high velocity, I organized the technical effort into two distinct phases. By isolating high-risk architectural paths, implementing automated sanity benchmarks, and establishing weekly alignment reviews with stakeholders, we delivered the initiative on time with zero high-severity incidents, improving performance by 28% and boosting team delivery predictability.`;

    const followUps: Record<InterviewType, string> = {
      'Behavioral': 'How did you keep morale high and maintain trust when unforeseen setbacks occurred?',
      'Technical': 'What would be the first point of failure if system traffic surged by a factor of 10x?',
      'Situational': 'If you had half the time and budget originally allotted, what would you cut first?',
      'Leadership': 'How do you handle a scenario where an engineering peer fundamentally disagrees with your strategic direction?',
      'General HR': 'What conditions in a team environment bring out your best performance?'
    };

    return {
      overallScore: finalScore,
      communicationScore: Math.min(98, finalScore + (mentionsAction ? 3 : -2)),
      relevanceScore: Math.min(99, finalScore + 2),
      structureScore: Math.min(95, finalScore + (wordCount > 50 ? 2 : -4)),
      specificityScore: Math.min(96, finalScore + (mentionsMetrics ? 4 : -5)),
      strengths,
      areasToImprove,
      suggestedAnswer: sampleAnswer,
      followUpQuestion: followUps[category] || 'What is the biggest retrospective takeaway from this project?'
    };
  },

  // Simulates generating an AI weekly plan tailored to onboarding preferences
  async generateWeeklyPlan(user: UserProfile): Promise<WeeklyTask[]> {
    await delay(1000);

    const isTech = user.preferredIndustries.includes('Technology');
    const role = user.targetRoles[0] || 'Software Engineer';

    return [
      {
        id: `gen_${Date.now()}_1`,
        day: 'Monday',
        title: `Deep-dive study: Analyze top 3 hiring requirements for ${role}`,
        category: 'Skill Building',
        priority: 'High',
        dueTime: '10:00 AM',
        completed: false,
        notes: `Focus on core requirements in ${user.preferredIndustries.join(', ') || 'Tech'}.`
      },
      {
        id: `gen_${Date.now()}_2`,
        day: 'Monday',
        title: 'Refine professional summary and LinkedIn showcase project',
        category: 'Applications',
        priority: 'Medium',
        dueTime: '3:00 PM',
        completed: false,
        notes: 'Incorporate Google X-Y-Z formula into top 2 bullet points.'
      },
      {
        id: `gen_${Date.now()}_3`,
        day: 'Tuesday',
        title: 'Submit 2 targeted applications with customized cover notes',
        category: 'Applications',
        priority: 'High',
        dueTime: '11:00 AM',
        completed: false,
        notes: 'Target remote or hybrid positions matching salary band.'
      },
      {
        id: `gen_${Date.now()}_4`,
        day: 'Tuesday',
        title: 'AI Practice: Complete 1 Behavioral Interview session (STAR method)',
        category: 'Interview Prep',
        priority: 'High',
        dueTime: '4:30 PM',
        completed: false,
        notes: 'Target 85+ overall score on conflict resolution questions.'
      },
      {
        id: `gen_${Date.now()}_5`,
        day: 'Wednesday',
        title: `Technical Deep-Dive: Review core architectural patterns for ${role}`,
        category: 'Skill Building',
        priority: 'High',
        dueTime: '1:30 PM',
        completed: false,
        notes: isTech ? 'Focus on distributed state sync, scalability, and latency optimizations.' : 'Review domain problem solving.'
      },
      {
        id: `gen_${Date.now()}_6`,
        day: 'Wednesday',
        title: 'Conduct cold recruiter outreach to 3 target company leaders',
        category: 'Networking',
        priority: 'Medium',
        dueTime: '5:00 PM',
        completed: false,
        notes: 'Reference specific engineering blog posts or recent product launches.'
      },
      {
        id: `gen_${Date.now()}_7`,
        day: 'Thursday',
        title: 'AI Practice: Complete Situational/Technical mock session',
        category: 'Interview Prep',
        priority: 'High',
        dueTime: '2:00 PM',
        completed: false,
        notes: 'Focus on clear communication of trade-offs and decision criteria.'
      },
      {
        id: `gen_${Date.now()}_8`,
        day: 'Thursday',
        title: 'Follow up on pending applications submitted >7 days ago',
        category: 'Networking',
        priority: 'Medium',
        dueTime: '4:30 PM',
        completed: false,
        notes: 'Send polite status check-ins emphasizing ongoing enthusiasm.'
      },
      {
        id: `gen_${Date.now()}_9`,
        day: 'Friday',
        title: 'Audit application response rates & pipeline conversions',
        category: 'Applications',
        priority: 'Medium',
        dueTime: '11:00 AM',
        completed: false,
        notes: 'Assess which resume variant generates the highest recruiter engagement.'
      },
      {
        id: `gen_${Date.now()}_10`,
        day: 'Friday',
        title: 'Review weekly interview feedback scores and areas to improve',
        category: 'Interview Prep',
        priority: 'High',
        dueTime: '3:30 PM',
        completed: false,
        notes: 'Synthesize critique into key talking points.'
      },
      {
        id: `gen_${Date.now()}_11`,
        day: 'Saturday',
        title: 'Portfolio & code sample polish: Clean up readme and documentation',
        category: 'Skill Building',
        priority: 'Low',
        dueTime: '11:30 AM',
        completed: false,
        notes: 'Ensure live demos and architecture diagrams are accessible.'
      },
      {
        id: `gen_${Date.now()}_12`,
        day: 'Sunday',
        title: 'Weekly retrospective: Celebrate wins and plan next week\'s sprints',
        category: 'Reflection',
        priority: 'Medium',
        dueTime: '5:00 PM',
        completed: false,
        notes: 'Set 3 primary milestones for the upcoming 7 days.'
      }
    ];
  },

  // Simulates intelligent contextual AI Career Coach responses
  async getCoachResponse(userMessage: string, user: UserProfile): Promise<ChatMessage> {
    await delay(1000);

    const text = userMessage.toLowerCase();
    const role = user.targetRoles[0] || 'Software Engineer';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (text.includes('resume') || text.includes('cv') || text.includes('bullet')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        timestamp: now,
        content: `To make your resume stand out for **${role}** positions, I recommend adopting Google's **X-Y-Z formula**: *"Accomplished [X] as measured by [Y], by doing [Z]"*.\n\nHere are three high-impact principles:\n\n1. **Lead with decisive metrics**: Replace *"Helped build API endpoints"* with *"Engineered high-throughput GraphQL gateway handling 45M daily requests with sub-18ms p99 latency."*\n2. **Highlight technical leadership**: Call out cross-functional alignment, architecture RFCs authored, or mentoring initiatives.\n3. **Tailor keywords**: Align your tech stack explicitly with modern standards like React 19, TypeScript, and distributed systems.\n\nWould you like me to rewrite a specific bullet point from your draft?`,
        suggestedActions: [
          { label: 'Add Resume Task to Plan', actionType: 'add_task', payload: 'Rewrite resume bullets using X-Y-Z formula' },
          { label: 'Copy X-Y-Z Formula', actionType: 'copy', payload: 'Accomplished [X] as measured by [Y], by doing [Z]' }
        ]
      };
    }

    if (text.includes('interview') || text.includes('prepare') || text.includes('star') || text.includes('system design')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        timestamp: now,
        content: `For **${role}** interview loops, top tier companies evaluate candidates along three pillars:\n\n1. **Technical Depth & Architectural Judgment**: Explaining not just *how* a system works, but *why* you chose specific trade-offs (e.g. eventual consistency vs strong consistency, memory footprint vs CPU caching).\n2. **Structured Communication (STAR)**: Keeping answers within a tight 2-minute window: Situation (20s), Task (15s), Action (60s), Result (25s).\n3. **Cultural Collaboration**: Demonstrating humility, empathy, and productive conflict resolution when requirements change.\n\nLet's run a targeted mock session right now to sharpen your responses.`,
        suggestedActions: [
          { label: 'Start Mock Interview Session', actionType: 'start_interview' },
          { label: 'Add Prep to Weekly Plan', actionType: 'add_task', payload: `Practice ${role} system design and STAR responses` }
        ]
      };
    }

    if (text.includes('negotiat') || text.includes('salary') || text.includes('offer') || text.includes('compensation')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        timestamp: now,
        content: `When handling salary negotiation for **${role}** roles, the golden rule is to **anchor with objective market data and multiple options**, never emotional appeals.\n\n**Key Strategy Steps:**\n• Reiterate your high enthusiasm for the team and mission.\n• Reference current industry ranges for your experience level (${user.expectedSalaryRange || '$170k - $200k'}).\n• Highlight that you are in active final rounds with other companies to create authentic urgency.\n• If base salary has rigid tier constraints, negotiate signing bonus, equity refreshers, accelerated vesting, or remote home-office stipends.\n\nWould you like me to draft a polite, professional counter-offer script?`,
        suggestedActions: [
          { label: 'Copy Counter Script', actionType: 'copy', payload: 'I am thrilled about the opportunity to join the team. Given current market benchmarks and my concurrent active loops, I would be prepared to accept immediately at...' },
          { label: 'Add Task to Weekly Plan', actionType: 'add_task', payload: 'Draft salary counter-offer proposal' }
        ]
      };
    }

    if (text.includes('plan') || text.includes('week') || text.includes('schedule') || text.includes('strategy')) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        timestamp: now,
        content: `I've analyzed your current career pipeline: you have active applications progressing through review and upcoming interviews.\n\nHere is your optimal focus balance for this week:\n\n• **40% Interview Preparation**: Daily 20-minute mock sessions focusing on technical trade-offs and behavioral storytelling.\n• **35% High-Quality Applications**: 2 to 3 deeply customized submissions with personalized outreach.\n• **25% Network Follow-Ups**: Touching base with recruiters and scheduling debriefs.\n\nI can regenerate your interactive Weekly Plan right now based on this split.`,
        suggestedActions: [
          { label: 'Add High-Leverage Tasks', actionType: 'add_task', payload: 'Schedule 20-min daily interview practice' }
        ]
      };
    }

    // Default intelligent career guidance
    return {
      id: `msg_${Date.now()}`,
      sender: 'assistant',
      timestamp: now,
      content: `That's a vital consideration for your career trajectory as a **${role}**.\n\nTo move forward effectively, I suggest we break this into two tangible actions:\n1. **Clarify your target differentiator**: What is the unique value proposition you bring that average candidates omit?\n2. **Turn insight into daily practice**: Commit to one small, measurable action today rather than postponing it.\n\nHow would you like to proceed? We can practice a mock interview question, optimize your application pipeline, or add a high-priority task to your calendar.`,
      suggestedActions: [
        { label: 'Practice Interview Questions', actionType: 'start_interview' },
        { label: 'Review Job Applications', actionType: 'open_jobs' },
        { label: 'Add Action to Weekly Plan', actionType: 'add_task', payload: `Refine unique differentiator for ${role}` }
      ]
    };
  }
};
