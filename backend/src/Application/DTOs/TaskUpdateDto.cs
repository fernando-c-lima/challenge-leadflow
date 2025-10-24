using Domain.Enums;

namespace Application.DTOs
{
    public record TaskUpdateDto(string Title, DateTime? DueDate, Domain.Enums.TaskStatus Status);
}
