import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { KanbanBoard } from './kanban-board';
import NewTaskDialog from './new-task-dialog';

export default function KanbanViewPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Planning Board`} description="Plan your future investements with ease." />
          <NewTaskDialog />
        </div>
        <KanbanBoard />
      </div>
    </PageContainer>
  );
}
