using MediatR;
using Application.DTOs;
using Domain.Enums;

namespace Application.Features.Tasks.Commands.CreateTask
{
    public record CreateTaskCommand(int LeadId, string Title, DateTime? DueDate, Domain.Enums.TaskStatus? Status = null) : IRequest<TaskDto>;
}
