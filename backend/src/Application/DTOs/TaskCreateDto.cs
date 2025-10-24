using Domain.Enums;

namespace Application.DTOs
{
    public record TaskCreateDto(string Title, DateTime? DueDate, Domain.Enums.TaskStatus? Status);
}
