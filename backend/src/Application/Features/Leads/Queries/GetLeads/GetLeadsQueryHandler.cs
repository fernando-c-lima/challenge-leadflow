    using MediatR;
    using AutoMapper;
    using Domain.Interfaces;
    using Application.DTOs;
    using Domain.Enums;

namespace Application.Features.Leads.Queries.GetLeads
{
    public class GetLeadsQueryHandler : IRequestHandler<GetLeadsQuery, PagedResultDto<LeadDto>>
    {
        private readonly ILeadRepository _leadRepository;
        private readonly IMapper _mapper;

        public GetLeadsQueryHandler(ILeadRepository leadRepository, IMapper mapper)
        {
            _leadRepository = leadRepository;
            _mapper = mapper;
        }

        public async Task<PagedResultDto<LeadDto>> Handle(GetLeadsQuery request, CancellationToken cancellationToken)
        {
            var leads = await _leadRepository.GetLeadsAsync(request.Search, request.Status);

            var totalItems = leads.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize);

            var items = leads
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var dtoItems = _mapper.Map<IEnumerable<LeadDto>>(items);

            return new PagedResultDto<LeadDto>(dtoItems, request.PageNumber, request.PageSize, totalItems, totalPages);
        }
    }
}
