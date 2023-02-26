import type { Prisma, Feedback } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.FeedbackCreateArgs>({
    feedback: {
        one: { data: { feedback: 'String' } },
        two: { data: { feedback: 'String' } },
    },
});

export type StandardScenario = ScenarioData<Feedback, 'feedback'>;
