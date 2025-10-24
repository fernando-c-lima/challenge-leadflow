using MediatR;

namespace Application.Features.Leads.Commands.DeleteLead
{
    public record DeleteLeadCommand(int Id) : IRequest<Unit>;
}
