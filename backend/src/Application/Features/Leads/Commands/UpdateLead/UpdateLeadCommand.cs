using MediatR;
using Application.DTOs;
using Domain.Enums;

namespace Application.Features.Leads.Commands.UpdateLead
{
    public record UpdateLeadCommand(int Id, string Name, string Email, LeadStatus Status) : IRequest<LeadDto>;
}
