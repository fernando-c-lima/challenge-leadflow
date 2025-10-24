using MediatR;
using Application.DTOs;

namespace Application.Features.Leads.Queries.GetLeadById
{
    public record GetLeadByIdQuery(int Id) : IRequest<LeadDto>;
}
