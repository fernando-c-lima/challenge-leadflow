using MediatR;
using AutoMapper;
using Domain.Interfaces;
using Application.DTOs;

namespace Application.Features.Leads.Queries.GetLeadById
{
    public class GetLeadByIdQueryHandler : IRequestHandler<GetLeadByIdQuery, LeadDto>
    {
        private readonly ILeadRepository _leadRepository;
        private readonly IMapper _mapper;

        public GetLeadByIdQueryHandler(ILeadRepository leadRepository, IMapper mapper)
        {
            _leadRepository = leadRepository;
            _mapper = mapper;
        }

        public async Task<LeadDto> Handle(GetLeadByIdQuery request, CancellationToken cancellationToken)
        {
            var lead = await _leadRepository.GetByIdAsync(request.Id);

            if (lead == null)
                throw new Exception("Lead não encontrado");

        lead.Tasks = lead.Tasks.Where(t => !t.IsDeleted).ToList();

            return _mapper.Map<LeadDto>(lead);
        }
    }
}
