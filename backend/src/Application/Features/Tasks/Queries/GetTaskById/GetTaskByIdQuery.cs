using MediatR;
using Application.DTOs;

namespace Application.Features.Tasks.Queries.GetTaskById
{
    public record GetTaskByIdQuery(int Id) : IRequest<TaskDto>;
}
