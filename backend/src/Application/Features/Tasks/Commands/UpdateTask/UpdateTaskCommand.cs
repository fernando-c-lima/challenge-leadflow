using MediatR;
using Application.DTOs;
using Domain.Enums;

namespace Application.Features.Tasks.Commands.UpdateTask
{
    public record UpdateTaskCommand(int Id, int LeadId, string Title, DateTime? DueDate, Domain.Enums.TaskStatus Status) : IRequest<TaskDto>;
}
