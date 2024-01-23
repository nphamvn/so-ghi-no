﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SoGhiNo.Migrations
{
    /// <inheritdoc />
    public partial class AddPaid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaidDate",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "Paid",
                table: "Items",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Paid",
                table: "Items");

            migrationBuilder.AddColumn<DateTime>(
                name: "PaidDate",
                table: "Items",
                type: "TEXT",
                nullable: true);
        }
    }
}
