using Microsoft.EntityFrameworkCore;

namespace SoGhiNo;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Folder> Folders { get; set; }
    public DbSet<Item> Items { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Folder>()
            .HasMany(f => f.SubFolders)
            .WithOne(f => f.ParentFolder)
            .HasForeignKey(f => f.ParentFolderId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Folder>()
            .HasMany(f => f.Items)
            .WithOne(i => i.ParentFolder)
            .HasForeignKey(i => i.ParentFolderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Folder>().HasData(new Folder
        {
            Id = 1,
            Name = "Root",
        });
    }
}