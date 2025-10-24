using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Enums;

namespace Infra.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Lead> Leads { get; set; } = null!;
        public DbSet<TaskItem> Tasks { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
            modelBuilder.Entity<Lead>(b =>
            {
                b.HasKey(x => x.Id);
                b.Property(x => x.Name).IsRequired().HasMaxLength(200);
                b.Property(x => x.Email).IsRequired().HasMaxLength(200);
                b.Property(x => x.Status).HasConversion<int>();
                b.Property(x => x.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                b.Property(x => x.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                b.Property(x => x.IsDeleted).HasDefaultValue(false);

                b.HasMany(x => x.Tasks)
                 .WithOne(t => t.Lead)
                 .HasForeignKey(t => t.LeadId)
                 .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Lead>().HasQueryFilter(l => !l.IsDeleted);

          
            modelBuilder.Entity<TaskItem>(b =>
            {
                b.HasKey(x => x.Id);
                b.Property(x => x.Title).IsRequired().HasMaxLength(300);
                b.Property(x => x.Status).HasConversion<int>();
                b.Property(x => x.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                b.Property(x => x.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                b.Property(x => x.IsDeleted).HasDefaultValue(false);
            });

            modelBuilder.Entity<TaskItem>().HasQueryFilter(t => !t.IsDeleted);

        }
    }
}
