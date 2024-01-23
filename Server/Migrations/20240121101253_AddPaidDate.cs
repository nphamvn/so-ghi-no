using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SoGhiNo.Migrations
{
    /// <inheritdoc />
    public partial class AddPaidDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Items");

            migrationBuilder.AddColumn<DateTime>(
                name: "PaidDate",
                table: "Items",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaidDate",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Items",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
