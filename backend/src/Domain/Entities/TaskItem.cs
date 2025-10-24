using Domain.Enums;

namespace Domain.Entities
{
    public class TaskItem
    {
        public int Id { get; set; }
        public int LeadId { get; set; }
        public string Title { get; set; } = null!;
        public DateTime? DueDate { get; set; }
        public Domain.Enums.TaskStatus Status { get; set; } = Domain.Enums.TaskStatus.Todo;
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public Lead? Lead { get; set; }
    }
}