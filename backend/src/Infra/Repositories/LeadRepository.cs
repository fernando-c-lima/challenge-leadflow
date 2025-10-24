using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain.Enums;
using Infra.Persistence;

namespace Infra.Repositories
{
    public class LeadRepository : ILeadRepository
    {
        private readonly AppDbContext _context;

        public LeadRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Lead?> GetByIdAsync(int id)
        {
            return await _context.Leads
                .Include(l => l.Tasks)
                .FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<IEnumerable<Lead>> GetLeadsAsync(string? search = null, LeadStatus? status = null)
        {
            var query = _context.Leads.AsQueryable();

            if (!string.IsNullOrEmpty(search))
                query = query.Where(l => l.Name.Contains(search) || l.Email.Contains(search));

            if (status.HasValue)
                query = query.Where(l => l.Status == status.Value);

            return await query.ToListAsync();
        }

        public async Task AddAsync(Lead lead)
        {
            _context.Leads.Add(lead);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Lead lead)
        {
            _context.Leads.Update(lead);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Lead lead)
        {
            _context.Leads.Remove(lead);
            await _context.SaveChangesAsync();
        }
    }
}
