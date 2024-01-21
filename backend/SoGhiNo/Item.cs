namespace SoGhiNo;
public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public int Amount { get; set; }
    public DateTime? PaidDate { get; set; }
    public int ParentFolderId { get; set; }
    public Folder ParentFolder { get; set; }
}