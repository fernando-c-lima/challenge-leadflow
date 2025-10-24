using Domain.Enums;

namespace Application.DTOs
{
    public record TaskDto(int Id, int LeadId, string Title, DateTime? DueDate, Domain.Enums.TaskStatus Status, DateTime CreatedAt, DateTime UpdatedAt);
}
