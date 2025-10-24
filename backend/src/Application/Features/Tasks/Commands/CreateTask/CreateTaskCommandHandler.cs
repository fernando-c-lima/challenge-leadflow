using MediatR;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Application.DTOs;

namespace Application.Features.Tasks.Commands.CreateTask
{
    public class CreateTaskCommandHandler : IRequestHandler<CreateTaskCommand, TaskDto>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;

        public CreateTaskCommandHandler(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        public async Task<TaskDto> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            var task = new TaskItem
            {
                LeadId = request.LeadId,
                Title = request.Title,
                DueDate = request.DueDate,
                Status = request.Status ?? Domain.Enums.TaskStatus.Todo
            };

            await _taskRepository.AddAsync(task);

            return _mapper.Map<TaskDto>(task);
        }
    }
}
