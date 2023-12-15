using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class ClientController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ClientController(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    [HttpGet("")]
    public async Task<IActionResult> GetClientById(int id)
    {
        try
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the getClientById");
        }
    }

    [HttpGet("/clients")]
    public async Task<IActionResult> GetAllClients()
    {
        try
        {
            var clients = await _context.Clients.ToListAsync(); 

            if (clients == null || !clients.Any())
            {
                return NotFound();
            }

            return Ok(clients);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred: " + ex.ToString());
        }
    }

    [HttpPost("/clients")]
    public async Task<IActionResult> CreateClient([FromBody] Client client)
    {
        try
        {
            if (client == null)
            {
                return BadRequest();
            }

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClientById), new { id = client.Id }, client);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred: " + ex.ToString());
        }
    }


}
