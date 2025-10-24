using MediatR;
using Application.DTOs;
using Domain.Enums;

namespace Application.Features.Leads.Commands.CreateLead
{
    public record CreateLeadCommand(string Name, string Email, LeadStatus? Status) : IRequest<LeadDto>;
}
