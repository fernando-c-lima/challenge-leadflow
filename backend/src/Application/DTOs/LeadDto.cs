using Domain.Enums;

namespace Application.DTOs
{
    public record LeadDto(int Id, string Name, string Email, LeadStatus Status, DateTime CreatedAt, DateTime UpdatedAt, int TasksCount);
}
