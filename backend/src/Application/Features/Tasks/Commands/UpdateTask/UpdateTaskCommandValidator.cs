using FluentValidation;

namespace Application.Features.Tasks.Commands.UpdateTask
{
    public class UpdateTaskCommandValidator : AbstractValidator<UpdateTaskCommand>
    {
        public UpdateTaskCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Título é obrigatório")
                .MinimumLength(3).WithMessage("Título deve ter pelo menos 3 caracteres");
        }
    }
}
