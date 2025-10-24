using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces
{
    public interface ILeadRepository
    {
        Task<Lead?> GetByIdAsync(int id);
        Task<IEnumerable<Lead>> GetLeadsAsync(string? search = null, LeadStatus? status = null);
        Task AddAsync(Lead lead);
        Task UpdateAsync(Lead lead);
        Task DeleteAsync(Lead lead);
    }
}
