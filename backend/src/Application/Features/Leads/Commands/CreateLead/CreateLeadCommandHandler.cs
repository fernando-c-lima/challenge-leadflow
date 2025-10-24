using MediatR;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Application.DTOs;

namespace Application.Features.Leads.Commands.CreateLead
{
    public class CreateLeadCommandHandler : IRequestHandler<CreateLeadCommand, LeadDto>
    {
        private readonly ILeadRepository _leadRepository;
        private readonly IMapper _mapper;

        public CreateLeadCommandHandler(ILeadRepository leadRepository, IMapper mapper)
        {
            _leadRepository = leadRepository;
            _mapper = mapper;
        }

        public async Task<LeadDto> Handle(CreateLeadCommand request, CancellationToken cancellationToken)
        {
            var lead = _mapper.Map<Lead>(request);
            await _leadRepository.AddAsync(lead);
            return _mapper.Map<LeadDto>(lead);
        }
    }
}
