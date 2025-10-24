using Domain.Enums;

namespace Application.DTOs
{
    public record LeadCreateDto(string Name, string Email, LeadStatus? Status);
}
