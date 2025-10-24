using AutoMapper;
using Domain.Entities;
using Application.DTOs;
using Application.Features.Leads.Commands.CreateLead;
using Application.Features.Leads.Commands.UpdateLead;
using Application.Features.Tasks.Commands.CreateTask;
using Application.Features.Tasks.Commands.UpdateTask;

namespace Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
          
            CreateMap<Lead, LeadDto>()
                .ForMember(dest => dest.TasksCount, opt => opt.MapFrom(src => src.Tasks.Count));
            CreateMap<LeadCreateDto, Lead>();
            CreateMap<LeadUpdateDto, Lead>();

            CreateMap<CreateLeadCommand, Lead>();
            CreateMap<UpdateLeadCommand, Lead>();

            CreateMap<TaskItem, TaskDto>();
            CreateMap<TaskCreateDto, TaskItem>();
            CreateMap<TaskUpdateDto, TaskItem>();

            CreateMap<CreateTaskCommand, TaskItem>();
            CreateMap<UpdateTaskCommand, TaskItem>();
        }
    }
}
