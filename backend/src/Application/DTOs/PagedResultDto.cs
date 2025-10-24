
namespace Application.DTOs
{
    public record PagedResultDto<T>(
        IEnumerable<T> Items,
        int PageNumber,
        int PageSize,
        int TotalItems,
        int TotalPages
    );
}
