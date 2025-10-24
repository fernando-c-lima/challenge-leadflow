using MediatR;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Application.DTOs;

namespace Application.Features.Tasks.Commands.UpdateTask
{
    public class UpdateTaskCommandHandler : IRequestHandler<UpdateTaskCommand, TaskDto>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;

        public UpdateTaskCommandHandler(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        public async Task<TaskDto> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
        {
            var task = await _taskRepository.GetByIdAsync(request.Id);
            if (task == null)
                throw new Exception("Task não encontrada");

            _mapper.Map(request, task); 
            await _taskRepository.UpdateAsync(task);

            return _mapper.Map<TaskDto>(task);
        }
    }
}
