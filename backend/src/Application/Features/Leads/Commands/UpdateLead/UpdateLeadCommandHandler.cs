using MediatR;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Application.DTOs;

namespace Application.Features.Leads.Commands.UpdateLead
{
    public class UpdateLeadCommandHandler : IRequestHandler<UpdateLeadCommand, LeadDto>
    {
        private readonly ILeadRepository _leadRepository;
        private readonly IMapper _mapper;

        public UpdateLeadCommandHandler(ILeadRepository leadRepository, IMapper mapper)
        {
            _leadRepository = leadRepository;
            _mapper = mapper;
        }

        public async Task<LeadDto> Handle(UpdateLeadCommand request, CancellationToken cancellationToken)
        {
            var lead = await _leadRepository.GetByIdAsync(request.Id);
            if (lead == null)
                throw new Exception("Lead não encontrado");

            _mapper.Map(request, lead); 
            await _leadRepository.UpdateAsync(lead);

            return _mapper.Map<LeadDto>(lead);
        }
    }
}
