using Domain.Enums;

namespace Application.DTOs
{
    public record LeadUpdateDto(string Name, string Email, LeadStatus Status);
}
