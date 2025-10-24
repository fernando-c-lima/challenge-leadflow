using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Features.Tasks.Commands.CreateTask;
using Application.Features.Tasks.Commands.UpdateTask;
using Application.Features.Tasks.Commands.DeleteTask;
using Application.Features.Tasks.Queries.GetTasks;
using Application.Features.Tasks.Queries.GetTaskById;
using Application.DTOs;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/leads/{leadId}/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TasksController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/leads/{leadId}/tasks
        [HttpGet]
        public async Task<IActionResult> Get(int leadId)
        {
            var query = new GetTasksQuery(leadId);
            var tasks = await _mediator.Send(query);
            return Ok(tasks);
        }

        // GET: api/leads/{leadId}/tasks/{taskId}
        [HttpGet("{taskId}")]
        public async Task<IActionResult> GetById(int leadId, int taskId)
        {
            var query = new GetTaskByIdQuery(taskId);
            var task = await _mediator.Send(query);
            if (task == null) return NotFound();
            return Ok(task);
        }

        // POST: api/leads/{leadId}/tasks
        [HttpPost]
        public async Task<IActionResult> Create(int leadId, [FromBody] CreateTaskCommand command)
        {
            var newCommand = new CreateTaskCommand(
            LeadId: leadId,
            Title: command.Title,
            DueDate: command.DueDate,
            Status: command.Status
        );

            var taskDto = await _mediator.Send(newCommand);

            return CreatedAtAction(nameof(GetById), new { leadId, taskId = taskDto.Id }, taskDto);
        }

        // PUT: api/leads/{leadId}/tasks/{taskId}
        [HttpPut("{taskId}")]
        public async Task<IActionResult> Update(int leadId, int taskId, [FromBody] UpdateTaskCommand command)
        {
            if (taskId != command.Id || leadId != command.LeadId) 
            return BadRequest();

            await _mediator.Send(command);
            return NoContent();
        }

        // DELETE: api/leads/{leadId}/tasks/{taskId}
        [HttpDelete("{taskId}")]
        public async Task<IActionResult> Delete(int leadId, int taskId)
        {
            var command = new DeleteTaskCommand(taskId);
            // se quiser, você pode validar leadId aqui
            await _mediator.Send(command);
            return NoContent();
        }
    }
}
