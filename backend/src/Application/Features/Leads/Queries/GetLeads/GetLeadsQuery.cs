using MediatR;
using Application.DTOs;
using Domain.Enums;

namespace Application.Features.Leads.Queries.GetLeads
{
    public record GetLeadsQuery(
        string? Search = null,
        LeadStatus? Status = null,
        int PageNumber = 1,
        int PageSize = 10
    ) : IRequest<PagedResultDto<LeadDto>>;
}
