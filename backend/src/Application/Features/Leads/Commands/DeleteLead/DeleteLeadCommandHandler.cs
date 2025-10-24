using MediatR;
using Domain.Interfaces;

namespace Application.Features.Leads.Commands.DeleteLead
{
    public class DeleteLeadCommandHandler : IRequestHandler<DeleteLeadCommand, Unit>
    {
        private readonly ILeadRepository _leadRepository;

        public DeleteLeadCommandHandler(ILeadRepository leadRepository)
        {
            _leadRepository = leadRepository;
        }

        public async Task<Unit> Handle(DeleteLeadCommand request, CancellationToken cancellationToken)
        {
            var lead = await _leadRepository.GetByIdAsync(request.Id);
            if (lead == null)
                throw new Exception("Lead não encontrado");

            // Soft Delete
            lead.IsDeleted = true;
            await _leadRepository.UpdateAsync(lead);

            return Unit.Value;
        }
    }
}
