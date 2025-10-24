using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Features.Leads.Commands.CreateLead;
using Application.Features.Leads.Commands.UpdateLead;
using Application.Features.Leads.Commands.DeleteLead;
using Application.Features.Leads.Queries.GetLeadById;
using Application.Features.Leads.Queries.GetLeads;
using Application.DTOs;
using Domain.Enums;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LeadsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/leads
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] string? search,
            [FromQuery] string? status,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10
            )
        {
            LeadStatus? leadStatus = null;

            if (!string.IsNullOrEmpty(status) && Enum.TryParse<LeadStatus>(status, true, out var parsedStatus))
            {
                leadStatus = parsedStatus;
            }

            var query = new GetLeadsQuery(search, leadStatus, pageNumber, pageSize);
            var pagedResult = await _mediator.Send(query);

            return Ok(pagedResult);
        }
        // GET: api/leads/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var query = new GetLeadByIdQuery(id);
            var lead = await _mediator.Send(query);
            if (lead == null) return NotFound();
            return Ok(lead);
        }

        // POST: api/leads
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateLeadCommand command)
        {
            var id = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        // PUT: api/leads/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateLeadCommand command)
        {
            if (id != command.Id) return BadRequest();
            await _mediator.Send(command);
            return NoContent();
        }

        // DELETE: api/leads/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var command = new DeleteLeadCommand(id);
            await _mediator.Send(command);
            return NoContent();
        }
    }
}
