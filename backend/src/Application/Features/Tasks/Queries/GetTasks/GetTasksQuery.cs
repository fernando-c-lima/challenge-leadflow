using MediatR;
using Application.DTOs;

namespace Application.Features.Tasks.Queries.GetTasks
{
    public record GetTasksQuery(int LeadId) : IRequest<IEnumerable<TaskDto>>;
}
