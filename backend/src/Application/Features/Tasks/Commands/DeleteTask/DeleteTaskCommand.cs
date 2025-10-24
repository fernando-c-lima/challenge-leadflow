using MediatR;

namespace Application.Features.Tasks.Commands.DeleteTask
{
    public record DeleteTaskCommand(int Id) : IRequest;
}
