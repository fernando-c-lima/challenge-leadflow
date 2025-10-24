using FluentValidation;

namespace Application.Features.Tasks.Commands.CreateTask
{
    public class CreateTaskCommandValidator : AbstractValidator<CreateTaskCommand>
    {
        public CreateTaskCommandValidator()
        {
            RuleFor(x => x.LeadId)
                .GreaterThan(0).WithMessage("LeadId inválido");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Título é obrigatório")
                .MinimumLength(3).WithMessage("Título deve ter pelo menos 3 caracteres");
        }
    }
}
