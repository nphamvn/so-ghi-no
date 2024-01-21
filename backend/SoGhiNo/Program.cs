using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoGhiNo;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite("Data Source=SoGhiNo.db");
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

//Get sub folders and items in folder
app.MapGet("/", async (int id, AppDbContext dbContext) =>
{
    var folder = await dbContext.Folders
        .Include(f => f.SubFolders)
        .Include(f => f.Items)
        .SingleAsync(f => f.Id == id);

    return Results.Ok(new
    {
        folder.Id,
        folder.Name,
        folder.ParentFolderId,
        SubFolders = folder.SubFolders.Select(f => new
        {
            f.Id,
            f.Name,
        }),
        Items = folder.Items.Select(i => new
        {
            i.Id,
            i.Name,
            i.Date,
            i.Amount,
            i.PaidDate
        })
    });
});

//Create new folder
app.MapPost("/", async (int id, [FromBody] FolderCreateUpdateRequest folder, AppDbContext dbContext) =>
{
    var newFolder = new Folder
    {
        Name = folder.Name,
        ParentFolderId = id
    };
    await dbContext.Folders.AddAsync(newFolder);
    await dbContext.SaveChangesAsync();
    return Results.Ok();
});

//Create new item
app.MapPost("/Items", async (int id, [FromBody] ItemCreateUpdateRequest item, AppDbContext dbContext) =>
{
    var newItem = new Item
    {
        Name = item.Name,
        Date = item.Date,
        Amount = item.Amount,
        ParentFolderId = id
    };
    await dbContext.Items.AddAsync(newItem);
    await dbContext.SaveChangesAsync();

    return Results.Ok();
});

//Get item by id
app.MapGet("/Items/{itemId}", async (int itemId, AppDbContext dbContext) =>
{
    var item = await dbContext.Items.FindAsync(itemId);
    return Results.Ok(item);
});

//Update item
app.MapPut("/Items/{itemId}", async (int itemId, [FromBody] ItemCreateUpdateRequest item, AppDbContext dbContext) =>
{
    var itemToUpdate = await dbContext.Items.SingleAsync(i => i.Id == itemId);
    itemToUpdate.Name = item.Name;
    itemToUpdate.Date = item.Date;
    itemToUpdate.Amount = item.Amount;
    await dbContext.SaveChangesAsync();

    return Results.Ok();
});

app.Run();

class FolderCreateUpdateRequest
{
    public string Name { get; set; }
}

class ItemCreateUpdateRequest
{
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public int Amount { get; set; }
}